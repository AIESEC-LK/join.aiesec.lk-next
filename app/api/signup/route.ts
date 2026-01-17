import { homeLcIds, remap } from "@/app/constants/mappings";
import { AiesecApiResponse, MemberLead } from "@/app/types/types";
import { appendToSheets } from "@/app/utils/sheet";
import { signupSchema, ValidatedFormData } from "@/app/api/utils/validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

async function verifyRecaptcha(
  token: string,
  remoteIp: string
): Promise<boolean> {
  const privateKey = process.env.GCAPTCHA_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("reCAPTCHA private key not configured");
  }

  const url = "https://www.google.com/recaptcha/api/siteverify";
  const formData = new URLSearchParams();
  formData.append("secret", privateKey);
  formData.append("response", token);
  formData.append("remoteip", remoteIp);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

async function createMemberLead(
  memberLead: MemberLead
): Promise<AiesecApiResponse> {
  const authToken = process.env.AIESEC_AUTH_TOKEN;
  if (!authToken) {
    throw new Error("AIESEC auth token not configured");
  }

  const endpoint = "https://gis-api.aiesec.org/graphql";
  const query = {
    operationName: "MemberLeadCreate",
    query:
      "mutation MemberLeadCreate($memberLead: MemberLeadInput) { memberLeadCreate(member_lead: $memberLead) { id __typename }}",
    variables: { memberLead },
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Host: "gis-api.aiesec.org",
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(query),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("AIESEC API error:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawFormData = await req.json();

    // Validate the form data using Zod schema
    let formData: ValidatedFormData;
    try {
      formData = signupSchema.parse(rawFormData);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            errors: error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Extract form fields
    const {
      first_name,
      last_name,
      dob,
      email,
      phone,
      faculty,
      batch,
      why,
      preferred_contact,
      university,
      employment_status,
      motivation,
      referral,
      "g-recaptcha-response": captchaToken,
    } = formData;

    // Verify reCAPTCHA
    const clientIp =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const isValidCaptcha = await verifyRecaptcha(captchaToken, clientIp);

    if (!isValidCaptcha) {
      return NextResponse.json(
        { errors: [{ message: "Invalid Captcha" }] },
        { status: 400 }
      );
    }

    // Get current timestamp
    const timestamp = new Date().toLocaleString("sv-SE", {
      timeZone: "Asia/Colombo",
    });

    // Prepare data for Google Sheets
    const sheetsData = [
      [
        timestamp,
        `${first_name} ${last_name}`,
        dob,
        email,
        phone,
        remap[preferred_contact] || preferred_contact,
        remap[university] || university,
        faculty,
        batch,
        why,
        remap[employment_status] || employment_status,
        remap[motivation] || motivation,
        remap[referral] || referral,
      ],
    ];

    // Prepare member lead data for AIESEC API
    const memberLead = {
      academic_level_id: 21796,
      alignment_id: parseInt(university),
      backgrounds: [],
      country_code: "94",
      date_of_birth: dob,
      email: email,
      employment_status_id: parseInt(employment_status),
      home_lc_id: parseInt(homeLcIds[university]),
      lead_name: `${first_name} ${last_name}`,
      phone: phone,
      preferred_mode_of_contact_id: parseInt(preferred_contact),
      motivation_reason_id: parseInt(motivation),
      referral_type_id: parseInt(referral),
    };

    // Create member lead via AIESEC API
    try {
      const apiResult = await createMemberLead(memberLead);

      if (apiResult.errors) {
        return NextResponse.json({ errors: apiResult.errors }, { status: 400 });
      }

      // Append to Google Sheets
      try {
        await appendToSheets(sheetsData);
      } catch (error) {
        console.error("Sheets append error:", error);
        return NextResponse.json(
          {
            errors: [
              {
                message: "Unable to save to sheets",
                actual: (error as Error).message,
              },
            ],
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        data: {
          success: true,
          id: apiResult.data?.memberLeadCreate?.id,
        },
      });
    } catch (error) {
      console.error("AIESEC API error:", error);
      return NextResponse.json(
        {
          errors: [
            {
              message: "Failed to create member lead",
              actual: (error as Error).message,
            },
          ],
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        errors: [
          {
            message: "Internal server error",
            actual: (error as Error).message,
          },
        ],
      },
      { status: 500 }
    );
  }
}

"use client";

import { useState, FormEvent, useEffect } from "react";
import InputField from "./InputField";
import { FormData } from "../types/types";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  PRIVACY_POLICY_TEXT,
  SUBMIT_TEXT,
} from "../constants/form_fields";
import { validate_uni_key } from "../utils/validations";
import { get_id_from_uni_key, get_uni_key_from_id } from "../utils/mappings";
import {
  CONTACT_METHOD_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS,
  MOTIVATION_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
  UNIVERSITY_OPTIONS,
} from "../constants/select_values";
import { get_batches, get_faculties } from "../utils/select_value_getters";
import Link from "next/link";
import { TITLE } from "../constants/site_constants";

// Declare jQuery type for TypeScript
declare global {
  interface Window {
    jQuery: {
      fn: {
        select2: (options?: {
          minimumResultsForSearch?: number;
          width?: string;
        }) => void;
      };
      (selector: string): {
        select2: (options?: {
          minimumResultsForSearch?: number;
          width?: string;
        }) => void;
      };
    };
  }
}

export default function JoinAiesecForm({
  uni_key,
}: {
  uni_key: string | undefined;
}) {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    phone: "",
    university: get_id_from_uni_key(uni_key),
    faculty: "",
    batch: "",
    why: "",
    preferred_contact: "",
    employment_status: "",
    motivation: "",
    referral: "",
    privacy_agreed: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize Select2 when component mounts
  useEffect(() => {
    const initSelect2 = () => {
      if (typeof window !== "undefined" && window.jQuery) {
        // Initialize Select2 for all select elements
        window.jQuery(".rs-select2 select").select2({
          minimumResultsForSearch: Infinity, // Disable search
          width: "100%",
        });
      }
    };

    // Wait for jQuery and Select2 to load
    const checkLibraries = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        window.jQuery &&
        typeof window.jQuery.fn.select2 === "function"
      ) {
        initSelect2();
        clearInterval(checkLibraries);
      }
    }, 100);

    return () => clearInterval(checkLibraries);
  }, []);

  if (!validate_uni_key(uni_key)) {
    if (typeof window !== "undefined" && "next" in window) {
      // For Next.js 13+ App Router, use the notFound function
      import("next/navigation").then(({ notFound }) => notFound());
    }
    return "Page Not found (404): Invalid URL";
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Form submitted successfully!");
    }, 2000);
  };

  if (uni_key == undefined && formData.university != "") {
    uni_key = get_uni_key_from_id(formData.university);
  }

  return (
    <div className="wrapper wrapper--w680">
      <div className="card card-4">
        <div
          className="card-body"
          style={{
            paddingTop: "40px",
          }}
        >
          <center>
            <h1
              className="title"
              style={{
                color: "#037ef3",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {TITLE}
            </h1>
          </center>
          {/* Loading Overlay */}
          {isLoading && (
            <div
              id="overlay"
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                position: "fixed",
                top: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                zIndex: 999,
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <div className="center">
                <div
                  className="loadingio-spinner-dual-ring-lwapedn49g"
                  style={{ width: "200px" }}
                >
                  <div className="ldio-18ldoi6nwr4">
                    <div></div>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    color: "#037ef3",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Please wait while we process your information.
                </div>
              </div>
            </div>
          )}

          <form
            id="signup_form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="row row-space">
              <div className="col-2">
                <InputField
                  label={FORM_LABELS.FIRST_NAME}
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-2">
                <InputField
                  label={FORM_LABELS.LAST_NAME}
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <InputField
                label={FORM_LABELS.DATE_OF_BIRTH}
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                required
                className="datepicker"
              />
            </div>

            <div>
              <InputField
                label={FORM_LABELS.EMAIL_ADDRESS}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <InputField
                label={FORM_LABELS.PHONE_NUMBER}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder={FORM_PLACEHOLDERS.PHONE_NUMBER}
                pattern="[0-9]{10}"
              />
            </div>

            {uni_key == undefined && (
              <InputField
                label={FORM_LABELS.UNIVERSITY_OR_INSTITUTE}
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                required
                isSelect={true}
                options={UNIVERSITY_OPTIONS}
                placeholder={FORM_PLACEHOLDERS.CHOOSE_OPTION}
              />
            )}

            <div className="row row-space">
              <div className="col-2">
                <InputField
                  label={FORM_LABELS.FACULTY}
                  name="faculty"
                  type="text"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  required
                  isSelect={true}
                  options={uni_key != undefined ? get_faculties(uni_key!) : []}
                  addSelectOther={true}
                  placeholder={FORM_PLACEHOLDERS.CHOOSE_OPTION}
                  disabled={uni_key == undefined}
                />
              </div>
              <div className="col-2">
                <InputField
                  label={FORM_LABELS.BATCH}
                  name="batch"
                  type="text"
                  value={formData.batch}
                  onChange={handleInputChange}
                  required
                  isSelect={true}
                  options={uni_key != undefined ? get_batches(uni_key!) : []}
                  addSelectOther={true}
                  placeholder={FORM_PLACEHOLDERS.CHOOSE_OPTION}
                  disabled={uni_key == undefined}
                />
              </div>
            </div>

            <div>
              <InputField
                label={FORM_LABELS.WHY_JOIN_AIESEC}
                name="why"
                type="text"
                value={formData.why}
                onChange={handleInputChange}
                required
              />
            </div>

            <InputField
              label={FORM_LABELS.CONTACT_METHOD}
              name="preferred_contact"
              value={formData.preferred_contact}
              onChange={handleInputChange}
              required
              isSelect={true}
              options={CONTACT_METHOD_OPTIONS}
              placeholder={FORM_PLACEHOLDERS.CHOOSE_OPTION}
            />

            <InputField
              label={FORM_LABELS.EMPLOYMENT_STATUS}
              name="employment_status"
              value={formData.employment_status}
              onChange={handleInputChange}
              required
              isSelect={true}
              options={EMPLOYMENT_STATUS_OPTIONS}
              placeholder={FORM_PLACEHOLDERS.CHOOSE_OPTION}
            />

            <InputField
              label={FORM_LABELS.MOTIVATION}
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              required
              isSelect={true}
              options={MOTIVATION_OPTIONS}
              placeholder={FORM_PLACEHOLDERS.CHOOSE_OPTION}
            />

            <InputField
              label={FORM_LABELS.REFERRAL_SOURCE}
              name="referral"
              value={formData.referral}
              onChange={handleInputChange}
              required
              isSelect={true}
              options={REFERRAL_SOURCE_OPTIONS}
              placeholder={FORM_PLACEHOLDERS.CHOOSE_OPTION}
            />

            <div className="input-group">
              <div className="row row-space">
                <div className="input-group">
                  <label
                    className="label"
                    style={{
                      paddingLeft: "40px",
                      fontSize: "14px",
                      textTransform: "none",
                      lineHeight: "20px",
                      marginBottom: "0",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="privacy_agreed"
                      className="checkmark input-icon"
                      checked={formData.privacy_agreed}
                      onChange={handleInputChange}
                      required
                    />
                    {PRIVACY_POLICY_TEXT.CHECKBOX_TEXT}{" "}
                    <Link
                      href={PRIVACY_POLICY_TEXT.PRIVACY_POLICY_URL}
                      target="_blank"
                      style={{ color: "#037ef3" }}
                    >
                      {PRIVACY_POLICY_TEXT.PRIVACY_POLICY_LINK}
                    </Link>{" "}
                    {PRIVACY_POLICY_TEXT.ADDITIONAL_TEXT}
                  </label>
                </div>
              </div>
            </div>

            <div
              className="g-recaptcha"
              data-sitekey="6Le5cqEqAAAAALCwTX8ShZiGVaWwmGs4XB0MXi3k"
            ></div>
            <div className="p-t-15">
              <button
                className="btn btn--radius-2 btn--gt"
                style={{ background: "#037ef3", marginTop: "20px" }}
                type="submit"
              >
                {SUBMIT_TEXT}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

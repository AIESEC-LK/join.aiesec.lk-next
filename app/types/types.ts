export interface FormData {
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  phone: string;
  university: string;
  faculty: string;
  batch: string;
  why: string;
  preferred_contact: string;
  employment_status: string;
  motivation: string;
  referral: string;
  privacy_agreed: boolean;
}

export interface ApiFormData extends FormData {
  "g-recaptcha-response": string;
}

export type FacultyOption = { value: string; label: string };

export interface AiesecApiResponse {
  data?: {
    memberLeadCreate?: {
      id: string;
      __typename: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export interface MemberLead {
  academic_level_id: number;
  alignment_id: number;
  backgrounds: string[];
  country_code: string;
  date_of_birth: string;
  email: string;
  employment_status_id: number;
  home_lc_id: number;
  lead_name: string;
  phone: string;
  preferred_mode_of_contact_id: number;
  motivation_reason_id: number;
  referral_type_id: number;
}
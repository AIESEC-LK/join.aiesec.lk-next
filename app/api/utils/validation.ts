import { z } from "zod";
import {
  UNIVERSITY_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS,
  MOTIVATION_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
} from "../../constants/select_values";

// Validation schema for the signup form
export const signupSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 16;
      }
      return age >= 16;
    }, "Must be at least 16 years old")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate <= today;
    }, "Date of birth cannot be in the future"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .refine((email) => {
      // Additional email validation - check for common patterns
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }, "Please enter a valid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  university: z
    .string()
    .min(1, "University selection is required")
    .refine(
      (value) => UNIVERSITY_OPTIONS.some((option) => option.value === value),
      "Invalid university selection"
    ),

  faculty: z
    .string()
    .min(1, "Faculty is required")
    .max(100, "Faculty must be less than 100 characters"),

  batch: z
    .string()
    .min(1, "Batch is required")
    .max(50, "Batch must be less than 50 characters"),

  why: z
    .string()
    .min(
      10,
      "Please provide at least 10 characters explaining why you want to join AIESEC"
    )
    .max(1000, "Response must be less than 1000 characters"),

  preferred_contact: z
    .string()
    .min(1, "Preferred contact method is required")
    .refine(
      (value) =>
        CONTACT_METHOD_OPTIONS.some((option) => option.value === value),
      "Invalid contact method selection"
    ),

  employment_status: z
    .string()
    .min(1, "Employment status is required")
    .refine(
      (value) =>
        EMPLOYMENT_STATUS_OPTIONS.some((option) => option.value === value),
      "Invalid employment status selection"
    ),

  motivation: z
    .string()
    .min(1, "Motivation is required")
    .refine(
      (value) => MOTIVATION_OPTIONS.some((option) => option.value === value),
      "Invalid motivation selection"
    ),

  referral: z
    .string()
    .min(1, "Referral source is required")
    .refine(
      (value) =>
        REFERRAL_SOURCE_OPTIONS.some((option) => option.value === value),
      "Invalid referral source selection"
    ),

  privacy_agreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the privacy policy"),

  "g-recaptcha-response": z
    .string()
    .min(1, "reCAPTCHA verification is required"),
});

export type ValidatedFormData = z.infer<typeof signupSchema>;

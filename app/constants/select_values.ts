import { FacultyOption } from "../types/types";

// University options
export const UNIVERSITY_OPTIONS = [
  { value: "7667", label: "University of Colombo" },
  { value: "7668", label: "University of Kelaniya" },
  { value: "7669", label: "University of Moratuwa" },
  { value: "7671", label: "University of Peradeniya" },
  { value: "7670", label: "University of Sri Jayewardenepura" },
  { value: "7672", label: "University of Ruhuna" },
  { value: "7673", label: "Sri Lanka Institute of Information Technology" },
  { value: "29287", label: "National School of Business Management" },
] as const;

// Contact method options
export const CONTACT_METHOD_OPTIONS = [
  { value: "21794", label: "Email" },
  { value: "21792", label: "WhatsApp" },
] as const;

// Employment status options
export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "21790", label: "Unemployed" },
  { value: "21789", label: "Employed" },
  { value: "21791", label: "Self-Employed" },
] as const;

// Motivation options
export const MOTIVATION_OPTIONS = [
  { value: "21977", label: "Connect with the impact of AIESEC" },
  { value: "21976", label: "Global Networking" },
  { value: "21975", label: "Leadership Experience" },
  { value: "21974", label: "Personal Development" },
] as const;

// Referral source options
export const REFERRAL_SOURCE_OPTIONS = [
  { value: "21799", label: "From a friend" },
  { value: "21809", label: "Event, Uni Session or Presentation" },
  { value: "21810", label: "Email" },
  { value: "21802", label: "Facebook" },
  { value: "21805", label: "Instagram" },
  { value: "21806", label: "LinkedIn" },
  { value: "21807", label: "Other Social Media" },
  { value: "21813", label: "Media (magazine, TV, newspaper or radio)" },
  { value: "21808", label: "Search Engine" },
  { value: "21800", label: "Information Booth on Campus" },
  { value: "21814", label: "Other" },
] as const;

export const FACULTY_OPTIONS: Record<string, FacultyOption[]> = {
  uoc: [
    { value: "Arts", label: "Faculty of Arts" },
    { value: "Law", label: "Faculty of Law" },
    {
      value: "Management and Finance",
      label: "Faculty of Management and Finance",
    },
    { value: "Medicine", label: "Faculty of Medicine" },
    { value: "Science", label: "Faculty of Science" },
    { value: "Technology", label: "Technology" },
    { value: "UCSC", label: "University of Colombo School of Computing" },
  ],
  uok: [
    { value: "Humanities", label: "Faculty of Humanities" },
    { value: "Social Sciences", label: "Faculty of Social Sciences" },
    { value: "Science", label: "Faculty of Science" },
    {
      value: "Commerce and Management Studies",
      label: "Faculty of Commerce and Management Studies",
    },
    {
      value: "Computing and Technology",
      label: "Faculty of Computing and Technology",
    },
    { value: "Medical", label: "Faculty of Medical" },
  ],
  uop: [
    { value: "Agriculture", label: "Faculty of Agriculture" },
    {
      value: "Allied Health Sciences",
      label: "Faculty of Allied Health Sciences",
    },
    { value: "Arts", label: "Faculty of Arts" },
    { value: "Dental Sciences", label: "Faculty of Dental Sciences" },
    { value: "Engineering", label: "Faculty of Engineering" },
    { value: "Management", label: "Faculty of Management" },
    { value: "Medicine", label: "Faculty of Medicine" },
    { value: "Science", label: "Faculty of Science" },
    {
      value: "Veterinary Medicine and Animal Sciences",
      label: "Faculty of Veterinary Medicine and Animal Sciences",
    },
  ],
  uom: [
    { value: "Architecture", label: "Faculty of Architecture" },
    { value: "Business", label: "Faculty of Business" },
    { value: "Engineering", label: "Faculty of Engineering" },
    { value: "IT", label: "Faculty of Information Technology" },
    { value: "ITUM", label: "Institute of Technology" },
    { value: "Medicine", label: "Faculty of Medicine" },
  ],
  usj: [
    { value: "Applied Sciences", label: "Faculty of Applied Sciences" },
    { value: "Engineering", label: "Faculty of Engineering" },
    {
      value: "Humanities and Social Sciences",
      label: "Faculty of Humanities and Social Sciences",
    },
    {
      value: "Management Studies and Commerce",
      label: "Faculty of Management Studies and Commerce",
    },
    { value: "Medical Sciences", label: "Faculty of Medical Sciences" },
    { value: "Technology", label: "Faculty of Technology" },
  ],
  rajarata: [
    { value: "Applied Sciences", label: "Faculty of Applied Sciences" },
    { value: "Architecture", label: "Faculty of Architecture" },
    { value: "Arts", label: "Faculty of Arts" },
    { value: "Management", label: "Faculty of Management" },
    { value: "Law", label: "Faculty of Law" },
    { value: "Medicine", label: "Faculty of Medicine" },
    { value: "Computings", label: "Faculty of Computing" },
    { value: "Dental Science", label: "Faculty of Dental Science" },
    {
      value: "Engineering Technology",
      label: "Faculty of Engineering Technology",
    },
    { value: "Bio Technology", label: "Faculty of Bio Technology" },
    { value: "Technology", label: "Faculty of Technology" },
    {
      value: "Social Science and Humanities",
      label: "Faculty of Social Science and Humanities",
    },
    { value: "Agriculture", label: "Faculty of Agriculture" },
  ],
  sliit: [
    { value: "Computing", label: "Faculty of Computing" },
    { value: "Engineering", label: "Faculty of Engineering" },
    {
      value: "Humanities and Sciences",
      label: "Faculty of Humanities and Sciences",
    },
    { value: "SLIIT Business School", label: "SLIIT Business School" },
  ],
  nibm: [
    { value: "Business", label: "School of Business" },
    { value: "Computing", label: "School of Computing" },
    { value: "Engineering", label: "School of Engineering" },
    { value: "Language", label: "School of Language" },
    { value: "Humanities", label: "School of Humanities" },
    { value: "Design", label: "School of Design" },
    { value: "BusinessAnalytic", label: "Business Analytic Centre" },
    { value: "ProductivityQuality", label: "Productivity and Quality Centre" },
  ],
  nsbm: [
    { value: "Business Management", label: "Faculty of Business Management" },
    { value: "Computing", label: "Faculty of Computing" },
    { value: "Engineering", label: "Faculty of Engineering" },
    { value: "Science", label: "Faculty of Science" },
  ],
};

export const BATCH_OPTIONS = [
  { value: "1st Year", label: "1st Year" },
  { value: "2nd Year", label: "2nd Year" },
  { value: "3rd Year", label: "3rd Year" },
  { value: "4th Year", label: "4th Year" },
];

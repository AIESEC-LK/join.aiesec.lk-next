import { BATCH_OPTIONS, FACULTY_OPTIONS } from "../constants/select_values";

export function get_faculties(uni_key: string) {
  return FACULTY_OPTIONS[uni_key];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function get_batches(uni_key: string) {
  return BATCH_OPTIONS;
}

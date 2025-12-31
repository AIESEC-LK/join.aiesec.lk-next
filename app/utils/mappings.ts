import { uni_key_to_id_map } from "../constants/mappings";

export function get_id_from_uni_key(uni_key: string | undefined) {
  if (uni_key == undefined) return "";
  return uni_key_to_id_map[uni_key];
}

export function get_uni_key_from_id(id: string | undefined) {
  if (id == undefined) return "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entry = Object.entries(uni_key_to_id_map).find(([key, value]) => value === id);
  return entry ? entry[0] : "";
}
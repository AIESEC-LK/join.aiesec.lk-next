import { uni_key_to_id_map } from "../constants/mappings"

export function validate_uni_key(uni_key:string | undefined){
  if (uni_key == undefined) return true

  return uni_key_to_id_map.hasOwnProperty(uni_key)
}
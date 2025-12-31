export const uni_key_to_id_map: Record<string, string> = {
  uoc: "7667",
  uok: "7668",
  uom: "7669",
  usj: "7670",
  uop: "7671",
  uor: "7672",
  sliit: "7673",
  rajarata: "13991",
  nibm: "14179",
  nsbm: "29287",
};

export const homeLcIds: { [key: string]: string } = {
  "7667": "222", // CC
  "7668": "872", // CN
  "7669": "1340", // CS
  "7671": "2204", // Kandy
  "7670": "221", // USJ
  "7672": "2175", // Ruhuna
  "7673": "2188", // SLIIT
  "7674": "2186", // NSBM
  "14179": "4535", // NIBM
  "13991": "5490", // Rajarata
};

// Field-specific mappings
export const universityRemap: { [key: string]: string } = {
  "7667": "CC",
  "7668": "CN",
  "7669": "CS",
  "7671": "Kandy",
  "7670": "USJ",
  "7672": "Ruhuna",
  "7673": "SLIIT",
  "29287": "NSBM",
  "14179": "NIBM",
  "13991": "Rajarata",
};

export const preferredContactRemap: { [key: string]: string } = {
  "21794": "Email",
  "21792": "WhatsApp",
};

export const employmentStatusRemap: { [key: string]: string } = {
  "21790": "Unemployed",
  "21789": "Employed",
  "21791": "Self-Employed",
};

export const motivationRemap: { [key: string]: string } = {
  "21977": "Connect with the Impact of AIESEC",
  "21976": "Global Networking",
  "21975": "Leadership Experience",
  "21974": "Personal Development",
};

export const referralRemap: { [key: string]: string } = {
  "21799": "From a friend",
  "21809": "Event",
  "21810": "Email",
  "21802": "Facebook",
  "21805": "Instagram",
  "21806": "LinkedIn",
  "21807": "Other Social Media",
  "21813": "Media (magazine, TV, newspaper or radio)",
  "21808": "Search Engine",
  "21800": "Information Booth on Campus",
  "21814": "Other",
};

// Combined remap for backward compatibility
export const remap: { [key: string]: string } = {
  ...universityRemap,
  ...preferredContactRemap,
  ...employmentStatusRemap,
  ...motivationRemap,
  ...referralRemap,
};

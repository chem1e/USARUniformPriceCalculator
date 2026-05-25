export const uniformOptions = [
  { value: 'ocp', label: 'OCP', price: 40 },
  { value: 'rolledOcp', label: 'Rolled OCP', price: 40 },
  { value: 'agsu', label: 'AGSU', price: 40 },
  { value: 'agsuShort', label: 'AGSU (Short Sleeve)', price: 40 },
  { value: 'classB', label: "Class B's", price: 35 },
  { value: 'classBShort', label: "Class B's (Short Sleeve)", price: 35 },
  { value: 'classC', label: "Class C's", price: 30 },
  { value: 'classCShort', label: "Class C's (Short Sleeve)", price: 30 },
  { value: 'tigerstripes', label: 'Tigerstripes', price: 50 },
  { value: 'tigerstripesShort', label: 'Tigerstripes (Short Sleeve)', price: 50 },
  { value: 'acs', label: 'ACS', price: 45 },
  { value: 'acsShort', label: 'ACS (Short Sleeve)', price: 45 },
]

// --- Basic items (no limits) ---
const divisionalPatch = { key: 'divisionalPatch', name: 'Divisional Patch', price: 5 }
const rankTab = { key: 'rankTab', name: 'Rank Tab', price: 3 }
const nametape = { key: 'nametape', name: 'Nametape', price: 3 }
const csib = { key: 'csib', name: 'CSIB', price: 3, type: 'skillBadge', ignoreLimit: true }
const overseasBar = { key: 'overseasBar', name: 'Overseas Bar', price: 3 }
const serviceStripe = { key: 'serviceStripe', name: 'Service Stripe', price: 3 }

// --- Group 1 (Combat) ---
const group1 = [
  { key: 'cib', name: 'Combat Infantryman Badge', price: 3, type: 'skillBadge', group: 'group1' },
  { key: 'cmb', name: 'Combat Medical Badge', price: 3, type: 'skillBadge', group: 'group1' },
  { key: 'cab', name: 'Combat Action Badge', price: 3, type: 'skillBadge', group: 'group1' },
]

// --- Group 2 (Expert) ---
const group2 = [
  { key: 'eib', name: 'Expert Infantryman Badge', price: 3, type: 'skillBadge', group: 'group2' },
  {
    key: 'efmb',
    name: 'Expert Field Medical Badge',
    price: 3,
    type: 'skillBadge',
    group: 'group2',
  },
  { key: 'esb', name: 'Expert Soldier Badge', price: 3, type: 'skillBadge', group: 'group2' },
]

// --- Group 3 (Aviation & Space) ---
const group3 = [
  { key: 'aviator', name: 'Aviator Badge', price: 3, type: 'skillBadge', group: 'group3' },
  {
    key: 'flightSurgeon',
    name: 'Flight Surgeon Badge',
    price: 3,
    type: 'skillBadge',
    group: 'group3',
  },
  { key: 'aviation', name: 'Aviation Badge', price: 3, type: 'skillBadge', group: 'group3' },
  {
    key: 'astronaut',
    name: 'Army Astronaut Device',
    price: 3,
    type: 'skillBadge',
    group: 'group3',
  },
  {
    key: 'eod',
    name: 'Explosive Ordnance Disposal Badge',
    price: 3,
    type: 'skillBadge',
    group: 'group3',
  },
  {
    key: 'spaceOps',
    name: 'Space Operations Badge',
    price: 3,
    type: 'skillBadge',
    group: 'group3',
  },
]

// --- Group 4 (Air & Special Ops) ---
const group4 = [
  { key: 'parachutist', name: 'Army Parachutist Badge', price: 3, type: 'skillBadge' },
  { key: 'pathfinder', name: 'Army Pathfinder Badge', price: 3, type: 'skillBadge' },
  { key: 'airAssault', name: 'Army Air Assault Badge', price: 3, type: 'skillBadge' },
  { key: 'freefall', name: 'Military Freefall Badge', price: 3, type: 'skillBadge' },
  { key: 'mountaineering', name: 'Mountaineering Badge', price: 3, type: 'skillBadge' },
  { key: 'specialOpsDiver', name: 'Special Operations Diver Badge', price: 3, type: 'skillBadge' },
]

// --- Identification Badges (Group 5) ---
const idBadges = [
  {
    key: 'drillSgt',
    name: 'Drill Sergeant Identification Badge',
    price: 3,
    type: 'idBadge',
    group: 'group5',
  },
  {
    key: 'instructor',
    name: 'Army Instructor Identification Badge',
    price: 3,
    type: 'idBadge',
    group: 'group5',
  },
  {
    key: 'masterGunner',
    name: 'Master Gunner Identification Badge',
    price: 3,
    type: 'idBadge',
    group: 'group5',
  },
  { key: 'recruiter', name: 'Recruiter Badge', price: 3, type: 'idBadge', group: 'group5' },
  {
    key: 'armyStaff',
    name: 'Army Staff Identification Badge',
    price: 3,
    type: 'idBadge',
    group: 'group5',
  },
  {
    key: 'jcsStaff',
    name: 'Joint Chiefs of Staff Identification Badge',
    price: 3,
    type: 'idBadge',
    group: 'group5',
  },
]

// --- Skill Tabs ---
const skillTabs = [
  { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, type: 'skillTab' },
  { key: 'specialForces', name: 'Special Forces Tab', price: 3, type: 'skillTab' },
  { key: 'ranger', name: 'Ranger Tab', price: 3, type: 'skillTab' },
  { key: 'sapper', name: 'Sapper Tab', price: 3, type: 'skillTab' },
  { key: 'jungle', name: 'Jungle Tab', price: 3, type: 'skillTab' },
  { key: 'arctic', name: 'Arctic Tab', price: 3, type: 'skillTab' },
]

// --- Foreign Devices ---
const foreign = [
  { key: 'rokJump', name: 'Republic of Korea Jump Wings', price: 3, type: 'foreign' },
  { key: 'rafParachute', name: 'Royal Air Force Parachute Wings', price: 3, type: 'foreign' },
  { key: 'rafAviator', name: 'Royal Air Force Aviator Wings', price: 3, type: 'foreign' },
  {
    key: 'philippinesAirborne',
    name: 'Armed Forces of the Philippines Airborne Badge',
    price: 3,
    type: 'foreign',
  },
  { key: 'queensDedication', name: 'Queens Dedication Medal', price: 3, type: 'foreign' },
  { key: 'combatReadiness', name: 'Combat Readiness Medal', price: 3, type: 'foreign' },
  { key: 'turkishMarksmanship', name: 'Turkish Marksmanship Medal', price: 3, type: 'foreign' },
]

// --- Ribbons (full list for AGSU / Class B / Class C) ---
const ribbons = [
  { key: 'dsc', name: 'Army Distinguished Service Cross', price: 3, type: 'ribbon' },
  { key: 'dds', name: 'Defense Distinguished Service', price: 3, type: 'ribbon' },
  { key: 'ads', name: 'Army Distinguished Service', price: 3, type: 'ribbon' },
  { key: 'silverStar', name: 'Silver Star', price: 3, type: 'ribbon' },
  { key: 'dss', name: 'Defense Superior Service', price: 3, type: 'ribbon' },
  { key: 'lom', name: 'Legion of Merit', price: 3, type: 'ribbon' },
  { key: 'dfc', name: 'Distinguished Flying Cross', price: 3, type: 'ribbon' },
  { key: 'soldiersMedal', name: 'Soldiers Medal', price: 3, type: 'ribbon' },
  { key: 'bronzeStar', name: 'Bronze Star', price: 3, type: 'ribbon' },
  { key: 'dms', name: 'Defense Meritorious Service', price: 3, type: 'ribbon' },
  { key: 'msm', name: 'Meritorious Service', price: 3, type: 'ribbon' },
  { key: 'airMedal', name: 'Air Medal', price: 3, type: 'ribbon' },
  { key: 'jsc', name: 'Joint Service Commendation', price: 3, type: 'ribbon' },
  { key: 'arcom', name: 'Army Commendation', price: 3, type: 'ribbon' },
  { key: 'jsa', name: 'Joint Service Achievement', price: 3, type: 'ribbon' },
  { key: 'aam', name: 'Army Achievement', price: 3, type: 'ribbon' },
  { key: 'pscm', name: 'Public Service Commendation Medal', price: 3, type: 'ribbon' },
  { key: 'wargames', name: 'Wargames Medal', price: 3, type: 'ribbon' },
  { key: 'goodConduct', name: 'Army Good Conduct', price: 3, type: 'ribbon' },
  { key: 'occupation', name: 'Army of Occupation Medal', price: 3, type: 'ribbon' },
  { key: 'volunteer', name: 'Outstanding Volunteer', price: 3, type: 'ribbon' },
  { key: 'ndsm', name: 'National Defense Service', price: 0, type: 'ribbon' },
  { key: 'gwotService', name: 'Global War on Terrorism Service', price: 0, type: 'ribbon' },
  { key: 'npd', name: 'NCO Professional Development', price: 3, type: 'ribbon' },
  { key: 'armyService', name: 'Army Service', price: 0, type: 'ribbon' },
  { key: 'militaryJustice', name: 'Military Justice', price: 3, type: 'ribbon' },
  { key: 'recruiting', name: 'Army Recruiting Ribbon', price: 3, type: 'ribbon' },
  { key: 'unMedal', name: 'United Nations Medal', price: 3, type: 'ribbon' },
  { key: 'antarctica', name: 'Antarctica Service', price: 3, type: 'ribbon' },
  { key: 'afem', name: 'Armed Forces Expeditionary Medal', price: 3, type: 'ribbon' },
  { key: 'swasm', name: 'Southwest Asia Service', price: 3, type: 'ribbon' },
  { key: 'kosovo', name: 'Kosovo Campaign', price: 3, type: 'ribbon' },
  { key: 'kuwait', name: 'Kuwait Liberation Medal', price: 3, type: 'ribbon' },
  { key: 'afghanistan', name: 'Afghanistan Campaign', price: 3, type: 'ribbon' },
  { key: 'iraq', name: 'Iraq Campaign', price: 3, type: 'ribbon' },
  { key: 'jsoc', name: 'Joint Special Operations Campaign', price: 3, type: 'ribbon' },
  { key: 'gwotExped', name: 'Global War on Terrorism Expeditionary', price: 3, type: 'ribbon' },
  { key: 'afsm', name: 'Armed Forces Service Medal', price: 3, type: 'ribbon' },
  { key: 'seaDuty', name: 'Army Sea Duty', price: 3, type: 'ribbon' },
  { key: 'overseas', name: 'Army Overseas Service', price: 3, type: 'ribbon' },
  { key: 'natoNon5', name: 'NATO Non-Article 5', price: 3, type: 'ribbon' },
  { key: 'nato5', name: 'NATO Article 5', price: 3, type: 'ribbon' },
]

// --- Build flat items arrays for each uniform ---
const ocpItems = [
  divisionalPatch,
  rankTab,
  nametape,
  csib,
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...idBadges,
  ...skillTabs,
  ...foreign,
]

const agsuItems = [
  divisionalPatch,
  csib,
  overseasBar,
  serviceStripe,
  ...ribbons,
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...idBadges,
  ...skillTabs,
  ...foreign,
]

const classBItems = [
  { key: 'rdi', name: 'Regimental Distinctive Insignia', price: 3 },
  ...ribbons,
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...skillTabs,
]

const classCItems = [
  { key: 'rdi', name: 'Regimental Distinctive Insignia', price: 3 },
  { key: 'unitCitation', name: 'Unit Citation', price: 3 },
  ...ribbons,
  ...skillTabs,
  ...idBadges,
  ...group1,
  ...group2,
  ...group3,
  csib,
  nametape,
  ...foreign,
]

const tigerItems = [
  divisionalPatch,
  nametape,
  ...group1,
  ...skillTabs.filter((t) => !['presidentsHundred', 'jungle', 'arctic'].includes(t.key)),
]

const acsItems = [divisionalPatch, csib, ...skillTabs]

// --- Export uniformAwards ---
export const uniformAwards = {
  ocp: {
    title: 'Standard OCP',
    allowsWatch: false,
    limits: {
      skillBadgeMax: 4,
      skillTabMax: 2,
      foreignMax: 1,
      idBadgeMax: 2,
      allowedIdBadges: ['drillSgt', 'instructor', 'recruiter', 'masterGunner'],
      group1Max: 1,
      group2Max: 1,
      group3Max: 1,
      prohibitedGroups: ['group5'],
    },
    items: ocpItems,
  },
  rolledOcp: {
    title: 'Rolled OCP',
    allowsWatch: true,
    limits: {
      skillBadgeMax: 2,
      skillTabMax: 2,
      foreignMax: 1,
      idBadgeMax: 2,
      allowedIdBadges: ['drillSgt', 'instructor', 'recruiter', 'masterGunner'],
      groups1to3Max: 1,
      prohibitedGroups: ['group5'],
    },
    items: ocpItems,
  },
  agsu: {
    title: 'AGSU',
    allowsWatch: false,
    limits: {
      skillBadgeMax: 4,
      skillTabMax: 2,
      idBadgeMax: 2,
      allowedIdBadges: [
        'drillSgt',
        'instructor',
        'masterGunner',
        'recruiter',
        'armyStaff',
        'jcsStaff',
      ],
      group1Max: 1,
      group2Max: 1,
      group3Max: 1,
    },
    items: agsuItems,
  },
  agsuShort: {
    title: 'AGSU (Short Sleeve)',
    allowsWatch: true,
    limits: {
      skillBadgeMax: 4,
      skillTabMax: 2,
      idBadgeMax: 2,
      allowedIdBadges: [
        'drillSgt',
        'instructor',
        'masterGunner',
        'recruiter',
        'armyStaff',
        'jcsStaff',
      ],
      group1Max: 1,
      group2Max: 1,
      group3Max: 1,
    },
    items: agsuItems,
  },
  classB: {
    title: "Class B's",
    allowsWatch: false,
    limits: { ribbonMax: 6, skillBadgeMax: 1, skillTabMax: 1 },
    items: classBItems,
  },
  classBShort: {
    title: "Class B's (Short Sleeve)",
    allowsWatch: true,
    limits: { ribbonMax: 6, skillBadgeMax: 1, skillTabMax: 1 },
    items: classBItems,
  },
  classC: {
    title: "Class C's",
    allowsWatch: false,
    limits: {
      skillTabMax: 1,
      idBadgeMax: 2,
      skillBadgeMax: 4,
      group1Max: 1,
      group2Max: 1,
      group3Max: 1,
    },
    items: classCItems,
  },
  classCShort: {
    title: "Class C's (Short Sleeve)",
    allowsWatch: true,
    limits: {
      skillTabMax: 1,
      idBadgeMax: 2,
      skillBadgeMax: 4,
      group1Max: 1,
      group2Max: 1,
      group3Max: 1,
    },
    items: classCItems,
  },
  tigerstripes: {
    title: 'Tiger Stripes',
    allowsWatch: false,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    items: tigerItems,
  },
  tigerstripesShort: {
    title: 'Tiger Stripes (Short Sleeve)',
    allowsWatch: true,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    items: tigerItems,
  },
  acs: {
    title: 'ACS',
    allowsWatch: false,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    items: acsItems,
  },
  acsShort: {
    title: 'ACS (Short Sleeve)',
    allowsWatch: true,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    items: acsItems,
  },
}

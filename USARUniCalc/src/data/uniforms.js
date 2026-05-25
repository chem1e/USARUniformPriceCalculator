// Uniform options
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

// Define badge groups for skill badges
export const badgeGroups = {
  group1: ['cib', 'cmb', 'cab'],
  group2: ['eib', 'efmb', 'esb'],
  group3: ['aviator', 'flightSurgeon', 'aviation', 'astronaut', 'eod', 'spaceOps'],
  group4: [
    'parachutist',
    'pathfinder',
    'airAssault',
    'freefall',
    'mountaineering',
    'specialOpsDiver',
  ],
  group5: ['drillSgt', 'instructor', 'masterGunner', 'recruiter', 'armyStaff', 'jcsStaff', 'csib'],
}

// Skill tabs
export const skillTabs = [
  'ranger',
  'specialForces',
  'sapper',
  'jungle',
  'arctic',
  'presidentsHundred',
]

// Ribbons data - Complete list as provided
const ribbons = [
  { key: 'dsc', name: 'Army Distinguished Service Cross', price: 3 },
  { key: 'dds', name: 'Defense Distinguished Service', price: 3 },
  { key: 'ads', name: 'Army Distinguished Service', price: 3 },
  { key: 'silverStar', name: 'Silver Star', price: 3 },
  { key: 'dss', name: 'Defense Superior Service', price: 3 },
  { key: 'lom', name: 'Legion of Merit', price: 3 },
  { key: 'dfc', name: 'Distinguished Flying Cross', price: 3 },
  { key: 'soldiersMedal', name: 'Soldiers Medal', price: 3 },
  { key: 'bronzeStar', name: 'Bronze Star', price: 3 },
  { key: 'dms', name: 'Defense Meritorious Service', price: 3 },
  { key: 'msm', name: 'Meritorious Service', price: 3 },
  { key: 'airMedal', name: 'Air Medal', price: 3 },
  { key: 'jsc', name: 'Joint Service Commendation', price: 3 },
  { key: 'arcom', name: 'Army Commendation', price: 3 },
  { key: 'jsa', name: 'Joint Service Achievement', price: 3 },
  { key: 'aam', name: 'Army Achievement', price: 3 },
  { key: 'pscm', name: 'Public Service Commendation Medal', price: 3 },
  { key: 'wargames', name: 'Wargames Medal', price: 3 },
  { key: 'goodConduct', name: 'Army Good Conduct', price: 3 },
  { key: 'occupation', name: 'Army of Occupation Medal', price: 3 },
  { key: 'volunteer', name: 'Outstanding Volunteer', price: 3 },
  { key: 'ndsm', name: 'National Defense Service', price: 0 },
  { key: 'gwotService', name: 'Global War on Terrorism Service', price: 0 },
  { key: 'npd', name: 'NCO Professional Development', price: 3 },
  { key: 'armyService', name: 'Army Service', price: 0 },
  { key: 'militaryJustice', name: 'Military Justice', price: 3 },
  { key: 'recruiting', name: 'Army Recruiting Ribbon', price: 3 },
  { key: 'unMedal', name: 'United Nations Medal', price: 3 },
  { key: 'antarctica', name: 'Antarctica Service', price: 3 },
  { key: 'afem', name: 'Armed Forces Expeditionary Medal', price: 3 },
  { key: 'swasm', name: 'Southwest Asia Service', price: 3 },
  { key: 'kosovo', name: 'Kosovo Campaign', price: 3 },
  { key: 'kuwait', name: 'Kuwait Liberation Medal', price: 3 },
  { key: 'afghanistan', name: 'Afghanistan Campaign', price: 3 },
  { key: 'iraq', name: 'Iraq Campaign', price: 3 },
  { key: 'jsoc', name: 'Joint Special Operations Campaign', price: 3 },
  { key: 'gwotExped', name: 'Global War on Terrorism Expeditionary', price: 3 },
  { key: 'afsm', name: 'Armed Forces Service Medal', price: 3 },
  { key: 'seaDuty', name: 'Army Sea Duty', price: 3 },
  { key: 'overseas', name: 'Army Overseas Service', price: 3 },
  { key: 'natoNon5', name: 'NATO Non-Article 5', price: 3 },
  { key: 'nato5', name: 'NATO Article 5', price: 3 },
]

// Badges for AGSU/Class C
const agsuBadges = [
  { key: 'cib', name: 'Combat Infantryman Badge', price: 3 },
  { key: 'cmb', name: 'Combat Medical Badge', price: 3 },
  { key: 'cab', name: 'Combat Action Badge', price: 3 },
  { key: 'eib', name: 'Expert Infantryman Badge', price: 3 },
  { key: 'efmb', name: 'Expert Field Medical Badge', price: 3 },
  { key: 'esb', name: 'Expert Soldier Badge', price: 3 },
  { key: 'aviator', name: 'Aviator Badge', price: 3 },
  { key: 'flightSurgeon', name: 'Flight Surgeon Badge', price: 3 },
  { key: 'aviation', name: 'Aviation Badge', price: 3 },
  { key: 'astronaut', name: 'Army Astronaut Device', price: 3 },
  { key: 'eod', name: 'Explosive Ordnance Disposal Badge', price: 3 },
  { key: 'parachutist', name: 'Army Parachutist Badge', price: 3 },
  { key: 'pathfinder', name: 'Army Pathfinder Badge', price: 3 },
  { key: 'airAssault', name: 'Army Air Assault Badge', price: 3 },
  { key: 'freefall', name: 'Military Freefall Badge', price: 3 },
  { key: 'mountaineering', name: 'Mountaineering Badge', price: 3 },
  { key: 'spaceOps', name: 'Space Operations Badge', price: 3 },
  { key: 'specialOpsDiver', name: 'Special Operations Diver Badge', price: 3 },
  { key: 'driverMechanic', name: 'Driver and Mechanic Badges', price: 3 },
  { key: 'marksmanship', name: 'Marksmanship Badges', price: 3 },
]

// Identification badges for AGSU
const agsuIdentificationBadges = [
  { key: 'drillSgt', name: 'Drill Sergeant Identification Badge', price: 3 },
  { key: 'instructor', name: 'Army Instructor Identification Badge', price: 3 },
  { key: 'masterGunner', name: 'Master Gunner Identification Badge', price: 3 },
  { key: 'recruiter', name: 'Recruiter Badge', price: 3 },
  { key: 'armyStaff', name: 'Army Staff Identification Badge', price: 3 },
  { key: 'jcsStaff', name: 'Joint Chiefs of Staff Identification Badge', price: 3 },
  { key: 'csib', name: 'Combat Service Identification Badge', price: 3 },
]

// Tabs for AGSU
const agsuTabs = [
  { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, isSkillTab: true },
  { key: 'specialForces', name: 'Special Forces Tab', price: 3, isSkillTab: true },
  { key: 'ranger', name: 'Ranger Tab', price: 3, isSkillTab: true },
  { key: 'sapper', name: 'Sapper Tab', price: 3, isSkillTab: true },
  { key: 'jungle', name: 'Jungle Tab', price: 3, isSkillTab: true },
  { key: 'arctic', name: 'Arctic Tab', price: 3, isSkillTab: true },
]

// Service stripes and foreign devices for AGSU
const agsuServiceItems = [
  { key: 'overseasBar', name: 'Overseas Bar', price: 3 },
  { key: 'serviceStripe', name: 'Service Stripe', price: 3 },
  { key: 'queensDedication', name: 'Queens Dedication Medal', price: 3 },
  { key: 'combatReadiness', name: 'Combat Readiness Medal', price: 3 },
  { key: 'turkishMarksmanship', name: 'Turkish Marksmanship Medal', price: 3 },
  { key: 'chiefsFifty', name: 'Chiefs Fifty Marksmanship Badge', price: 3 },
  { key: 'marsoc', name: 'Marine Special Operations Badge', price: 3, isForeign: true },
  { key: 'marineCombatAir', name: 'Marine Corps Combat Aircrew Badge', price: 3, isForeign: true },
  { key: 'rokJump', name: 'Republic of Korea Jump Wings', price: 3, isForeign: true },
  { key: 'rafParachute', name: 'Royal Air Force Parachute Wings', price: 3, isForeign: true },
  { key: 'rafAviator', name: 'Royal Air Force Aviator Wings', price: 3, isForeign: true },
  {
    key: 'philippinesAirborne',
    name: 'Armed Forces of the Philippines Airborne Badge',
    price: 3,
    isForeign: true,
  },
]

// Define OCP groups
const ocpGroups = [
  {
    title: 'Combat Badges (Group 1)',
    groupId: 'group1',
    items: [
      { key: 'cib', name: 'Combat Infantryman Badge', price: 3 },
      { key: 'cmb', name: 'Combat Medical Badge', price: 3 },
      { key: 'cab', name: 'Combat Action Badge', price: 3 },
    ],
  },
  {
    title: 'Expert Badges (Group 2)',
    groupId: 'group2',
    items: [
      { key: 'eib', name: 'Expert Infantryman Badge', price: 3 },
      { key: 'efmb', name: 'Expert Field Medical Badge', price: 3 },
      { key: 'esb', name: 'Expert Soldier Badge', price: 3 },
    ],
  },
  {
    title: 'Aviation & Space Badges (Group 3)',
    groupId: 'group3',
    items: [
      { key: 'aviator', name: 'Aviator Badge', price: 3 },
      { key: 'flightSurgeon', name: 'Flight Surgeon Badge', price: 3 },
      { key: 'aviation', name: 'Aviation Badge', price: 3 },
      { key: 'astronaut', name: 'Army Astronaut Device', price: 3 },
      { key: 'eod', name: 'Explosive Ordnance Disposal Badge', price: 3 },
      { key: 'spaceOps', name: 'Space Operations Badge', price: 3 },
    ],
  },
  {
    title: 'Air & Special Operations Badges (Group 4)',
    groupId: 'group4',
    items: [
      { key: 'parachutist', name: 'Army Parachutist Badge', price: 3 },
      { key: 'pathfinder', name: 'Army Pathfinder Badge', price: 3 },
      { key: 'airAssault', name: 'Army Air Assault Badge', price: 3 },
      { key: 'freefall', name: 'Military Freefall Badge', price: 3 },
      { key: 'mountaineering', name: 'Mountaineering Badge', price: 3 },
      { key: 'specialOpsDiver', name: 'Special Operations Diver Badge', price: 3 },
    ],
  },
  {
    title: 'Identification Badges (Group 5)',
    groupId: 'group5',
    items: [
      { key: 'drillSgt', name: 'Drill Sergeant Identification Badge', price: 3 },
      { key: 'instructor', name: 'Army Instructor Identification Badge', price: 3 },
      { key: 'masterGunner', name: 'Master Gunner Identification Badge', price: 3 },
      { key: 'recruiter', name: 'Recruiter Badge', price: 3 },
      { key: 'csib', name: 'Combat Service Identification Badge', price: 3 },
    ],
  },
  {
    title: 'Tabs',
    groupId: 'tabs',
    items: [
      { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, isSkillTab: true },
      { key: 'specialForces', name: 'Special Forces Tab', price: 3, isSkillTab: true },
      { key: 'ranger', name: 'Ranger Tab', price: 3, isSkillTab: true },
      { key: 'sapper', name: 'Sapper Tab', price: 3, isSkillTab: true },
      { key: 'jungle', name: 'Jungle Tab', price: 3, isSkillTab: true },
      { key: 'arctic', name: 'Arctic Tab', price: 3, isSkillTab: true },
    ],
  },
  {
    title: 'Foreign Devices',
    groupId: 'foreign',
    items: [
      { key: 'rokJump', name: 'Republic of Korea Jump Wings', price: 3, isForeign: true },
      { key: 'rafParachute', name: 'Royal Air Force Parachute Wings', price: 3, isForeign: true },
      { key: 'rafAviator', name: 'Royal Air Force Aviator Wings', price: 3, isForeign: true },
      {
        key: 'philippinesAirborne',
        name: 'Armed Forces of the Philippines Airborne Badge',
        price: 3,
        isForeign: true,
      },
    ],
  },
]

// Define ACS groups
const acsGroups = [
  {
    title: 'Tabs',
    groupId: 'tabs',
    items: [
      { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, isSkillTab: true },
      { key: 'specialForces', name: 'Special Forces Tab', price: 3, isSkillTab: true },
      { key: 'ranger', name: 'Ranger Tab', price: 3, isSkillTab: true },
      { key: 'sapper', name: 'Sapper Tab', price: 3, isSkillTab: true },
      { key: 'jungle', name: 'Jungle Tab', price: 3, isSkillTab: true },
      { key: 'arctic', name: 'Arctic Tab', price: 3, isSkillTab: true },
    ],
  },
  {
    title: 'Badges',
    groupId: 'badges',
    items: [{ key: 'csib', name: 'Combat Service Identification Badge', price: 3 }],
  },
]

// Define Tiger Stripes groups
const tigerStripesGroups = [
  {
    title: 'Tabs',
    groupId: 'tabs',
    items: [
      { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, isSkillTab: true },
      { key: 'specialForces', name: 'Special Forces Tab', price: 3, isSkillTab: true },
      { key: 'ranger', name: 'Ranger Tab', price: 3, isSkillTab: true },
      { key: 'sapper', name: 'Sapper Tab', price: 3, isSkillTab: true },
    ],
  },
  {
    title: 'Badges',
    groupId: 'badges',
    items: [
      { key: 'cib', name: 'Combat Infantryman Badge', price: 3 },
      { key: 'cmb', name: 'Combat Medical Badge', price: 3 },
      { key: 'cab', name: 'Combat Action Badge', price: 3 },
      { key: 'csib', name: 'Combat Service Identification Badge', price: 3 },
    ],
  },
]

// Define AGSU groups (full version with ribbons)
const agsuGroups = [
  {
    title: 'Ribbons',
    groupId: 'ribbons',
    items: ribbons,
  },
  {
    title: 'Badges',
    groupId: 'badges',
    items: agsuBadges,
  },
  {
    title: 'Identification Badges',
    groupId: 'group5',
    items: agsuIdentificationBadges,
  },
  {
    title: 'Tabs',
    groupId: 'tabs',
    items: agsuTabs,
  },
  {
    title: 'Service Stripes & Foreign Devices',
    groupId: 'service',
    items: agsuServiceItems,
  },
]

// Define Class B groups (with ribbons limit of 6)
const classBGroups = [
  {
    title: 'Regimental Distinctive Insignia',
    groupId: 'rdi',
    items: [{ key: 'rdi', name: 'Regimental Distinctive Insignia', price: 3 }],
  },
  {
    title: 'Ribbons (Maximum 6)',
    groupId: 'ribbons',
    items: ribbons,
  },
  {
    title: 'Tabs (Metal Replica - Maximum 1)',
    groupId: 'tabs',
    items: [
      { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, isSkillTab: true },
      { key: 'specialForces', name: 'Special Forces Tab', price: 3, isSkillTab: true },
      { key: 'ranger', name: 'Ranger Tab', price: 3, isSkillTab: true },
      { key: 'sapper', name: 'Sapper Tab', price: 3, isSkillTab: true },
    ],
  },
  {
    title: 'Skill Badges (Metal Replica - Maximum 1)',
    groupId: 'skillBadges',
    items: [
      { key: 'cib', name: 'Combat Infantryman Badge', price: 3 },
      { key: 'cmb', name: 'Combat Medical Badge', price: 3 },
      { key: 'cab', name: 'Combat Action Badge', price: 3 },
      { key: 'eib', name: 'Expert Infantryman Badge', price: 3 },
      { key: 'parachutist', name: 'Army Parachutist Badge', price: 3 },
      { key: 'airAssault', name: 'Army Air Assault Badge', price: 3 },
    ],
  },
]

// Define Class C groups (full version)
const classCGroups = [
  {
    title: 'Regimental Distinctive Insignia',
    groupId: 'rdi',
    items: [{ key: 'rdi', name: 'Regimental Distinctive Insignia', price: 3 }],
  },
  {
    title: 'Unit Citations',
    groupId: 'citations',
    items: [{ key: 'unitCitation', name: 'Unit Citation', price: 3 }],
  },
  {
    title: 'Ribbons',
    groupId: 'ribbons',
    items: ribbons,
  },
  {
    title: 'Tabs (Metal Replica - Maximum 1)',
    groupId: 'tabs',
    items: [
      { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, isSkillTab: true },
      { key: 'specialForces', name: 'Special Forces Tab', price: 3, isSkillTab: true },
      { key: 'ranger', name: 'Ranger Tab', price: 3, isSkillTab: true },
      { key: 'sapper', name: 'Sapper Tab', price: 3, isSkillTab: true },
    ],
  },
  {
    title: 'Identification Badges (Only if no CSIB)',
    groupId: 'group5',
    items: [
      { key: 'drillSgt', name: 'Drill Sergeant Identification Badge', price: 3 },
      { key: 'instructor', name: 'Army Instructor Identification Badge', price: 3 },
      { key: 'masterGunner', name: 'Master Gunner Identification Badge', price: 3 },
      { key: 'recruiter', name: 'Recruiter Badge', price: 3 },
      { key: 'armyStaff', name: 'Army Staff Identification Badge', price: 3 },
      { key: 'jcsStaff', name: 'Joint Chiefs of Staff Identification Badge', price: 3 },
    ],
  },
  {
    title: 'Skill Badges (Maximum 4 - Only 1 from Groups 1-3)',
    groupId: 'skillBadges',
    items: [
      { key: 'cib', name: 'Combat Infantryman Badge', price: 3, group1: true },
      { key: 'cmb', name: 'Combat Medical Badge', price: 3, group1: true },
      { key: 'cab', name: 'Combat Action Badge', price: 3, group1: true },
      { key: 'eib', name: 'Expert Infantryman Badge', price: 3, group2: true },
      { key: 'efmb', name: 'Expert Field Medical Badge', price: 3, group2: true },
      { key: 'esb', name: 'Expert Soldier Badge', price: 3, group2: true },
      { key: 'aviator', name: 'Aviator Badge', price: 3, group3: true },
      { key: 'parachutist', name: 'Army Parachutist Badge', price: 3 },
      { key: 'airAssault', name: 'Army Air Assault Badge', price: 3 },
    ],
  },
  {
    title: 'Combat Service Identification Badge',
    groupId: 'csib',
    items: [{ key: 'csib', name: 'Combat Service Identification Badge', price: 3 }],
  },
  {
    title: 'Nametape',
    groupId: 'nametape',
    items: [{ key: 'nametape', name: 'Nametape', price: 3 }],
  },
  {
    title: 'Foreign Devices',
    groupId: 'foreign',
    items: [
      { key: 'rokJump', name: 'Republic of Korea Jump Wings', price: 3, isForeign: true },
      { key: 'rafParachute', name: 'Royal Air Force Parachute Wings', price: 3, isForeign: true },
      { key: 'rafAviator', name: 'Royal Air Force Aviator Wings', price: 3, isForeign: true },
      {
        key: 'philippinesAirborne',
        name: 'Armed Forces of the Philippines Airborne Badge',
        price: 3,
        isForeign: true,
      },
    ],
  },
]

// Award data organized by uniform type
export const uniformAwards = {
  ocp: {
    title: 'Badges & Tabs',
    allowsWatch: false,
    limits: {
      skillTabs: { max: 2 },
      skillBadges: { max: 4, rules: 'Only allowed 1 badge from Groups 1-2 & 1 badge from Group 3' },
      identificationBadges: {
        max: 2,
        allowed: ['drillSgt', 'instructor', 'recruiter', 'masterGunner'],
      },
      foreignAwards: { max: 1 },
      prohibitedGroups: ['group5'],
    },
    groups: ocpGroups,
  },
  rolledOcp: {
    title: 'Badges & Tabs (Rolled Sleeves)',
    allowsWatch: false,
    limits: {
      skillTabs: { max: 2 },
      skillBadges: { max: 2, rules: 'Only allowed 1 badge from Groups 1-3' },
      identificationBadges: {
        max: 2,
        allowed: ['drillSgt', 'instructor', 'recruiter', 'masterGunner'],
      },
      foreignAwards: { max: 1 },
      prohibitedGroups: ['group5'],
    },
    groups: ocpGroups,
  },
  acs: {
    title: 'Tabs & Badges (ACS)',
    allowsWatch: false,
    limits: {
      skillTabs: { max: 2 },
      skillBadges: { max: 2 },
    },
    groups: acsGroups,
  },
  acsShort: {
    title: 'Tabs & Badges (ACS - Short Sleeve)',
    allowsWatch: true,
    limits: {
      skillTabs: { max: 2 },
      skillBadges: { max: 2 },
    },
    groups: acsGroups,
  },
  tigerstripes: {
    title: 'Tiger Stripes',
    allowsWatch: false,
    limits: {
      skillTabs: { max: 2 },
      skillBadges: { max: 2 },
    },
    groups: tigerStripesGroups,
  },
  tigerstripesShort: {
    title: 'Tiger Stripes (Short Sleeve)',
    allowsWatch: true,
    limits: {
      skillTabs: { max: 2 },
      skillBadges: { max: 2 },
    },
    groups: tigerStripesGroups,
  },
  agsu: {
    title: 'Ribbons, Badges & Tabs (AGSU)',
    allowsWatch: false,
    limits: {
      skillTabs: { max: 2 },
      identificationBadges: {
        max: 2,
        allowed: ['drillSgt', 'instructor', 'masterGunner', 'recruiter', 'armyStaff', 'jcsStaff'],
      },
      skillBadges: { max: 4, rules: 'Only allowed 1 badge from Groups 1-3' },
      ribbons: { max: 8 },
      serviceStripes: { max: 8 },
      overseasBars: { max: 8 },
    },
    groups: agsuGroups,
  },
  agsuShort: {
    title: 'Ribbons, Badges & Tabs (AGSU - Short Sleeve)',
    allowsWatch: true,
    limits: {
      skillTabs: { max: 2 },
      identificationBadges: {
        max: 2,
        allowed: ['drillSgt', 'instructor', 'masterGunner', 'recruiter', 'armyStaff', 'jcsStaff'],
      },
      skillBadges: { max: 4, rules: 'Only allowed 1 badge from Groups 1-3' },
      ribbons: { max: 8 },
      serviceStripes: { max: 8 },
      overseasBars: { max: 8 },
    },
    groups: agsuGroups,
  },
  classB: {
    title: "Class B's",
    allowsWatch: false,
    limits: {
      ribbons: { max: 6 },
      skillBadges: { max: 1 },
      skillTabs: { max: 1 },
    },
    groups: classBGroups,
  },
  classBShort: {
    title: "Class B's (Short Sleeve)",
    allowsWatch: true,
    limits: {
      ribbons: { max: 6 },
      skillBadges: { max: 1 },
      skillTabs: { max: 1 },
    },
    groups: classBGroups,
  },
  classC: {
    title: "Class C's",
    allowsWatch: false,
    limits: {
      skillTabs: { max: 1 },
      identificationBadges: { max: 2, requiresNoCSIB: true },
      skillBadges: { max: 4, rules: 'Only allowed 1 badge from Groups 1-3' },
      ribbons: { max: 8 },
    },
    groups: classCGroups,
  },
  classCShort: {
    title: "Class C's (Short Sleeve)",
    allowsWatch: true,
    limits: {
      skillTabs: { max: 1 },
      identificationBadges: { max: 2, requiresNoCSIB: true },
      skillBadges: { max: 4, rules: 'Only allowed 1 badge from Groups 1-3' },
      ribbons: { max: 8 },
    },
    groups: classCGroups,
  },
}

<template>
  <div class="calculator">
    <header class="header">
      <div class="header-inner">
        <div class="title-block">
          <span class="title-eyebrow">U.S. ARMY</span>
          <h1 class="title">Uniform Price<br /><em>Calculator</em></h1>
        </div>
        <div class="total-block">
          <span class="total-label">ESTIMATED TOTAL</span>
          <span class="total-amount">R${{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </header>

    <main class="main">
      <!-- Uniform Selection -->
      <section class="section">
        <div class="section-header">
          <span class="section-number">01</span>
          <h2>Uniform</h2>
        </div>
        <div class="item-row">
          <label class="item-label">Select Uniform</label>
          <div class="dropdown-control">
            <select v-model="selectedKey" @change="loadUniform" class="uniform-select">
              <option value="" disabled>Choose a uniform...</option>
              <option v-for="u in uniformOptions" :key="u.value" :value="u.value">
                {{ u.label }} - R${{ u.price.toFixed(2) }}
              </option>
            </select>
          </div>
          <span v-if="currentUniform" class="item-price"
            >R${{ currentUniform.price.toFixed(2) }}</span
          >
        </div>
        <div v-if="currentUniform" class="selected-uniform">
          <div class="selected-uniform-content">
            <span class="selected-label">Selected:</span>
            <span class="selected-name">{{ currentUniform.label }}</span>
            <button class="remove-uniform" @click="removeUniform">Remove</button>
          </div>
        </div>
      </section>

      <!-- Watch -->
      <section v-if="currentUniform && currentUniform.allowsWatch" class="section">
        <div class="section-header">
          <span class="section-number">02</span>
          <h2>Watch</h2>
        </div>
        <div class="watch-item" :class="{ selected: watch }" @click="watch = !watch">
          <span class="watch-check">{{ watch ? '✓' : '' }}</span>
          <span class="watch-name">Watch</span>
          <span class="watch-price">R$3.00</span>
        </div>
      </section>

      <!-- Awards Section -->
      <section v-if="currentUniform && currentUniform.sections" class="section">
        <div class="section-header">
          <span class="section-number">{{ currentUniform.allowsWatch ? '03' : '02' }}</span>
          <h2>Awards</h2>
          <span class="section-meta">R$3.00 each (unless noted)</span>
        </div>

        <div class="limits-info">
          <h4>Current Limits & Selections</h4>
          <ul>
            <li v-if="limits.group1to3Max !== undefined">
              Groups 1‑3 (Combat/Expert/Aviation): {{ group1to3Count }} / {{ limits.group1to3Max }}
            </li>
            <li v-if="limits.skillBadgeMax !== undefined">
              Other Skill Badges (Group 4+): {{ skillBadgeCount }} / {{ limits.skillBadgeMax }}
            </li>
            <li v-if="limits.skillTabMax !== undefined">
              Skill Tabs: {{ skillTabCount }} / {{ limits.skillTabMax }}
            </li>
            <li v-if="limits.ribbonMax !== undefined">
              Ribbons: {{ ribbonCount }} / {{ limits.ribbonMax }}
            </li>
            <li v-if="limits.idBadgeMax !== undefined">
              ID Badges: {{ idBadgeCount }} / {{ limits.idBadgeMax }}
            </li>
            <li v-if="limits.foreignMax !== undefined">
              Foreign Awards: {{ foreignCount }} / {{ limits.foreignMax }}
            </li>
            <li v-if="limits.prohibitedGroups && limits.prohibitedGroups.length">
              Prohibited: {{ limits.prohibitedGroups.join(', ') }}
            </li>
          </ul>
        </div>

        <div v-for="(section, idx) in currentUniform.sections" :key="idx" class="badge-group">
          <h3 class="badge-group-title">{{ section.title }}</h3>
          <div class="badge-grid">
            <div
              v-for="award in section.items"
              :key="award.key"
              class="badge-item"
              :class="{ selected: isSelected(award), free: award.price === 0 }"
              @click="toggleAward(award)"
            >
              <span class="badge-check">{{ isSelected(award) ? '✓' : '' }}</span>
              <span class="badge-name">{{ award.name }}</span>
              <span class="badge-cost" v-if="award.price > 0">R${{ award.price }}</span>
              <span class="badge-cost free-text" v-else>FREE</span>
            </div>
          </div>
        </div>

        <div class="badge-summary">
          <span>{{ selectedCount }} award(s) selected</span>
          <span>R${{ selectedTotal.toFixed(2) }}</span>
        </div>
      </section>

      <!-- User Information Form -->
      <section v-if="currentUniform" class="section form-section">
        <div class="section-header">
          <span class="section-number">{{ currentUniform.allowsWatch ? '04' : '03' }}</span>
          <h2>Order Information</h2>
        </div>
        <div class="form-grid">
          <div class="form-row">
            <label>Name:</label>
            <input type="text" v-model="userInfo.name" placeholder="Your name" class="form-input" />
          </div>
          <div class="form-row">
            <label>Rank:</label>
            <input type="text" v-model="userInfo.rank" placeholder="Rank" class="form-input" />
          </div>
          <div class="form-row">
            <label>Type:</label>
            <input
              type="text"
              v-model="userInfo.type"
              placeholder="e.g., Enlisted / Officer"
              class="form-input"
            />
          </div>
          <div class="form-row">
            <label>Gender:</label>
            <select v-model="userInfo.gender" class="form-input">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-row">
            <label>Division/Brigade/Company:</label>
            <input
              type="text"
              v-model="userInfo.division"
              placeholder="e.g., 1st Infantry Division, HICOM (state previous company)"
              class="form-input"
            />
          </div>
          <div class="form-row">
            <label>Nametape:</label>
            <input
              type="text"
              v-model="userInfo.nametape"
              placeholder="Your nametape text"
              class="form-input"
            />
          </div>
          <!-- Offset Checkbox – only for Class B, Class C, AGSU -->
          <div class="form-row" v-if="isOffsetApplicableUniform">
            <label>Offset (Yes/No):</label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="offsetSelected" /> Yes
            </label>
          </div>
          <div class="form-row">
            <label>Price (R$):</label>
            <input
              type="text"
              :value="totalPrice.toFixed(2)"
              readonly
              class="form-input readonly"
            />
          </div>
        </div>
        <button class="copy-btn" @click="copyTemplate">📋 Copy Order Template</button>
      </section>
    </main>

    <footer class="summary-footer">
      <div class="summary-inner">
        <div class="summary-lines">
          <div class="summary-line" v-if="currentUniform">
            <span>{{ currentUniform.label }}</span>
            <span>R${{ currentUniform.price.toFixed(2) }}</span>
          </div>
          <div class="summary-line" v-if="watch && currentUniform?.allowsWatch">
            <span>Watch</span>
            <span>R$3.00</span>
          </div>
          <div class="summary-line" v-if="selectedCount > 0">
            <span>Awards ({{ selectedCount }}×)</span>
            <span>R${{ selectedTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line total-line">
            <span>TOTAL</span>
            <span>R${{ totalPrice.toFixed(2) }}</span>
          </div>
        </div>
        <button class="reset-btn" @click="resetAll">Reset All</button>
      </div>
    </footer>
  </div>
</template>

<script>
// ======================= DATA =======================
const uniformOptions = [
  { value: 'ocp', label: 'OCP', price: 40 },
  { value: 'rolledOcp', label: 'Rolled OCP', price: 40 },
  { value: 'agsu', label: 'AGSU', price: 40 },
  { value: 'agsuShort', label: 'AGSU (Short Sleeve)', price: 40 },
  { value: 'classB', label: "Class B's", price: 40 },
  { value: 'classBShort', label: "Class B's (Short Sleeve)", price: 40 },
  { value: 'classC', label: "Class C's", price: 40 },
  { value: 'classCShort', label: "Class C's (Short Sleeve)", price: 40 },
  { value: 'tigerstripes', label: 'Tiger Stripes', price: 40 },
  { value: 'tigerstripesShort', label: 'Tiger Stripes (Short Sleeve)', price: 40 },
  { value: 'acs', label: 'ACS', price: 30 },
  { value: 'acsShort', label: 'ACS (Short Sleeve)', price: 30 },
  { value: 'blackouts', label: 'Blackouts', price: 30 },
  { value: 'customPt', label: 'Custom PT', price: 30 },
  { value: 'fleece', label: 'Fleece (Winter)', price: 30 },
  { value: 'sweater', label: 'Sweater (Winter)', price: 30 },
]

// Basic items
const csib = {
  key: 'csib',
  name: 'Combat Service Identification Badge (CSIB)',
  price: 3,
  type: 'skillBadge',
  ignoreLimit: true,
}
const overseasBar = { key: 'overseasBar', name: 'Overseas Bar', price: 3 }
const serviceStripe = { key: 'serviceStripe', name: 'Service Stripe', price: 3 }
const rdi = { key: 'rdi', name: 'Regimental Distinctive Insignia', price: 3 }
const unitCitation = { key: 'unitCitation', name: 'Unit Citation', price: 3 }
const shoulderRank = { key: 'shoulderRank', name: 'Shoulderloop Rank Tab', price: 3 }

// --- Award groups ---
const combatBadges = {
  title: 'Combat Badges (Group 1)',
  items: [
    { key: 'cib', name: 'Combat Infantryman Badge', price: 3, type: 'group123', group: 'group1' },
    { key: 'cmb', name: 'Combat Medical Badge', price: 3, type: 'group123', group: 'group1' },
    { key: 'cab', name: 'Combat Action Badge', price: 3, type: 'group123', group: 'group1' },
  ],
}

const expertBadges = {
  title: 'Expert Badges (Group 2)',
  items: [
    { key: 'eib', name: 'Expert Infantryman Badge', price: 3, type: 'group123', group: 'group2' },
    {
      key: 'efmb',
      name: 'Expert Field Medical Badge',
      price: 3,
      type: 'group123',
      group: 'group2',
    },
    { key: 'esb', name: 'Expert Soldier Badge', price: 3, type: 'group123', group: 'group2' },
  ],
}

const aviationBadges = {
  title: 'Aviation & Space Badges (Group 3)',
  items: [
    { key: 'aviator', name: 'Aviator Badge', price: 3, type: 'group123', group: 'group3' },
    {
      key: 'flightSurgeon',
      name: 'Flight Surgeon Badge',
      price: 3,
      type: 'group123',
      group: 'group3',
    },
    { key: 'aviation', name: 'Aviation Badge', price: 3, type: 'group123', group: 'group3' },
    {
      key: 'astronaut',
      name: 'Army Astronaut Device',
      price: 3,
      type: 'group123',
      group: 'group3',
    },
    {
      key: 'eod',
      name: 'Explosive Ordnance Disposal Badge',
      price: 3,
      type: 'group123',
      group: 'group3',
    },
    {
      key: 'spaceOps',
      name: 'Space Operations Badge',
      price: 3,
      type: 'group123',
      group: 'group3',
    },
  ],
}

const airBadges = {
  title: 'Air & Special Operations Badges (Group 4)',
  items: [
    { key: 'parachutist', name: 'Army Parachutist Badge', price: 3, type: 'skillBadge' },
    { key: 'pathfinder', name: 'Army Pathfinder Badge', price: 3, type: 'skillBadge' },
    { key: 'airAssault', name: 'Army Air Assault Badge', price: 3, type: 'skillBadge' },
    { key: 'freefall', name: 'Military Freefall Badge', price: 3, type: 'skillBadge' },
    { key: 'mountaineering', name: 'Mountaineering Badge', price: 3, type: 'skillBadge' },
    {
      key: 'specialOpsDiver',
      name: 'Special Operations Diver Badge',
      price: 3,
      type: 'skillBadge',
    },
  ],
}

const idBadgesGroup = {
  title: 'Identification Badges (Group 5)',
  items: [
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
  ],
}

const skillTabsGroup = {
  title: 'Skill Tabs',
  items: [
    { key: 'presidentsHundred', name: "President's Hundred Tab", price: 3, type: 'skillTab' },
    { key: 'specialForces', name: 'Special Forces Tab', price: 3, type: 'skillTab' },
    { key: 'ranger', name: 'Ranger Tab', price: 3, type: 'skillTab' },
    { key: 'sapper', name: 'Sapper Tab', price: 3, type: 'skillTab' },
    { key: 'jungle', name: 'Jungle Tab', price: 3, type: 'skillTab' },
    { key: 'arctic', name: 'Arctic Tab', price: 3, type: 'skillTab' },
  ],
}

const foreignGroup = {
  title: 'Foreign Devices',
  items: [
    { key: 'rokJump', name: 'Republic of Korea Jump Wings', price: 3, type: 'foreign' },
    { key: 'rafParachute', name: 'Royal Air Force Parachute Wings', price: 3, type: 'foreign' },
    { key: 'rafAviator', name: 'Royal Air Force Aviator Wings', price: 3, type: 'foreign' },
    {
      key: 'philippinesAirborne',
      name: 'Armed Forces of the Philippines Airborne Badge',
      price: 3,
      type: 'foreign',
    },
    { key: 'queensDedication', name: "Queen's Dedication Medal", price: 3, type: 'foreign' },
    { key: 'combatReadiness', name: 'Combat Readiness Medal', price: 3, type: 'foreign' },
    { key: 'turkishMarksmanship', name: 'Turkish Marksmanship Medal', price: 3, type: 'foreign' },
  ],
}

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

const ribbonsGroup = {
  title: 'Ribbons',
  items: ribbons,
}

// --- Uniform sections ---
const ocpSections = [
  { title: 'Uniform Items', items: [csib] },
  combatBadges,
  expertBadges,
  aviationBadges,
  airBadges,
  { title: 'Identification Badges (Group 5)', items: idBadgesGroup.items },
  skillTabsGroup,
  { title: 'Foreign Devices (Max 1)', items: foreignGroup.items },
]

const rolledOcpSections = [
  { title: 'Uniform Items', items: [csib] },
  combatBadges,
  expertBadges,
  aviationBadges,
  airBadges,
  { title: 'Identification Badges (Group 5)', items: idBadgesGroup.items },
  skillTabsGroup,
  { title: 'Foreign Devices (Max 1)', items: foreignGroup.items },
]

const acsSections = [{ title: 'Uniform Items', items: [csib] }, skillTabsGroup]

const blackoutsSections = [{ title: 'Uniform Items', items: [csib] }, skillTabsGroup]

const customPtSections = [{ title: 'Uniform Items', items: [] }]

const fleeceSections = [{ title: 'Uniform Items', items: [] }]

const tigerSections = [
  { title: 'Uniform Items', items: [] },
  combatBadges,
  { title: 'Ribbons', items: ribbons },
  {
    title: 'Skill Tabs (Max 2)',
    items: skillTabsGroup.items.filter(
      (t) => !['presidentsHundred', 'jungle', 'arctic'].includes(t.key),
    ),
  },
]

const agsuSections = [
  { title: 'Uniform Items', items: [csib, overseasBar, serviceStripe] },
  ribbonsGroup,
  combatBadges,
  expertBadges,
  aviationBadges,
  airBadges,
  { title: 'Identification Badges (Max 2, expanded list)', items: idBadgesGroup.items },
  skillTabsGroup,
  {
    title: 'Foreign Devices (ROKA Jump Wings only)',
    items: foreignGroup.items.filter((f) => f.key === 'rokJump'),
  },
]

const classBSections = [
  { title: 'Regimental Distinctive Insignia', items: [rdi] },
  { title: 'Ribbons (Max 6)', items: ribbons },
  {
    title: 'Skill Badges & Tabs (Metal Replica, Max 1 total)',
    items: [
      ...combatBadges.items,
      ...expertBadges.items,
      ...aviationBadges.items,
      ...airBadges.items,
      ...skillTabsGroup.items,
    ],
  },
]

const sweaterSections = [{ title: 'Shoulderloop Rank Tabs', items: [shoulderRank] }]

const classCSections = [
  { title: 'Regimental Distinctive Insignia', items: [rdi] },
  { title: 'Unit Citations', items: [unitCitation] },
  ribbonsGroup,
  skillTabsGroup,
  { title: 'Identification Badges (Only if no CSIB)', items: idBadgesGroup.items },
  combatBadges,
  expertBadges,
  aviationBadges,
  { title: 'CSIB', items: [csib] },
  foreignGroup,
]

// ----- Uniform configurations with limits -----
const uniformAwards = {
  ocp: {
    title: 'Standard OCP',
    allowsWatch: false,
    limits: {
      group1to3Max: 1,
      skillBadgeMax: 4,
      skillTabMax: 2,
      foreignMax: 1,
      idBadgeMax: 2,
      allowedIdBadges: ['drillSgt', 'instructor', 'recruiter', 'masterGunner'],
    },
    sections: ocpSections,
  },
  rolledOcp: {
    title: 'Rolled OCP',
    allowsWatch: true,
    limits: {
      group1to3Max: 1,
      skillBadgeMax: 2,
      skillTabMax: 2,
      foreignMax: 1,
      idBadgeMax: 2,
      allowedIdBadges: ['drillSgt', 'instructor', 'recruiter', 'masterGunner'],
    },
    sections: rolledOcpSections,
  },
  acs: {
    title: 'ACS',
    allowsWatch: false,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    sections: acsSections,
  },
  acsShort: {
    title: 'ACS (Short Sleeve)',
    allowsWatch: true,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    sections: acsSections,
  },
  blackouts: {
    title: 'Blackouts',
    allowsWatch: false,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    sections: blackoutsSections,
  },
  customPt: {
    title: 'Custom PT',
    allowsWatch: true,
    limits: {},
    sections: customPtSections,
  },
  fleece: {
    title: 'Fleece (Winter)',
    allowsWatch: false,
    limits: {},
    sections: fleeceSections,
  },
  tigerstripes: {
    title: 'Tiger Stripes',
    allowsWatch: false,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    sections: tigerSections,
  },
  tigerstripesShort: {
    title: 'Tiger Stripes (Short Sleeve)',
    allowsWatch: true,
    limits: { skillTabMax: 2, skillBadgeMax: 2 },
    sections: tigerSections,
  },
  agsu: {
    title: 'AGSU',
    allowsWatch: false,
    limits: {
      group1to3Max: 1,
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
    },
    sections: agsuSections,
  },
  agsuShort: {
    title: 'AGSU (Short Sleeve)',
    allowsWatch: true,
    limits: {
      group1to3Max: 1,
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
    },
    sections: agsuSections,
  },
  classB: {
    title: "Class B's",
    allowsWatch: false,
    limits: { ribbonMax: 6, skillBadgeMax: 1, skillTabMax: 1 },
    sections: classBSections,
  },
  classBShort: {
    title: "Class B's (Short Sleeve)",
    allowsWatch: true,
    limits: { ribbonMax: 6, skillBadgeMax: 1, skillTabMax: 1 },
    sections: classBSections,
  },
  sweater: {
    title: 'Sweater (Winter)',
    allowsWatch: false,
    limits: {},
    sections: sweaterSections,
  },
  classC: {
    title: "Class C's",
    allowsWatch: false,
    limits: {
      group1to3Max: 1,
      skillTabMax: 1,
      idBadgeMax: 2,
      skillBadgeMax: 4,
    },
    sections: classCSections,
  },
  classCShort: {
    title: "Class C's (Short Sleeve)",
    allowsWatch: true,
    limits: {
      group1to3Max: 1,
      skillTabMax: 1,
      idBadgeMax: 2,
      skillBadgeMax: 4,
    },
    sections: classCSections,
  },
}

export default {
  name: 'UniformCalculator',
  data() {
    return {
      uniformOptions,
      selectedKey: '',
      currentUniform: null,
      selected: new Map(),
      watch: false,
      offsetSelected: false,
      userInfo: {
        name: '',
        rank: '',
        type: '',
        gender: '',
        division: '',
        nametape: '',
      },
    }
  },
  computed: {
    limits() {
      return this.currentUniform?.limits || {}
    },
    selectedAwards() {
      return Array.from(this.selected.values())
    },
    selectedCount() {
      return this.selectedAwards.length
    },
    selectedTotal() {
      return this.selectedAwards.reduce((sum, a) => sum + a.price, 0)
    },
    group1to3Count() {
      return this.selectedAwards.filter((a) => a.type === 'group123').length
    },
    skillBadgeCount() {
      return this.selectedAwards.filter((a) => a.type === 'skillBadge' && !a.ignoreLimit).length
    },
    skillTabCount() {
      return this.selectedAwards.filter((a) => a.type === 'skillTab').length
    },
    ribbonCount() {
      return this.selectedAwards.filter((a) => a.type === 'ribbon').length
    },
    idBadgeCount() {
      return this.selectedAwards.filter((a) => a.type === 'idBadge').length
    },
    foreignCount() {
      return this.selectedAwards.filter((a) => a.type === 'foreign').length
    },
    isOffsetApplicableUniform() {
      const key = this.selectedKey
      return (
        key === 'classB' ||
        key === 'classBShort' ||
        key === 'classC' ||
        key === 'classCShort' ||
        key === 'agsu' ||
        key === 'agsuShort'
      )
    },
    totalPrice() {
      const uniformPrice = this.currentUniform?.price || 0
      const watchPrice = this.watch && this.currentUniform?.allowsWatch ? 3 : 0
      const offsetPrice = this.offsetSelected && this.isOffsetApplicableUniform ? 3 : 0
      return uniformPrice + watchPrice + this.selectedTotal + offsetPrice
    },
    selectedBadges() {
      return this.selectedAwards.filter(
        (a) => ['group123', 'skillBadge', 'idBadge'].includes(a.type) || a.group === 'group5',
      )
    },
    selectedRibbons() {
      return this.selectedAwards.filter((a) => a.type === 'ribbon')
    },
  },
  methods: {
    loadUniform() {
      const conf = uniformAwards[this.selectedKey]
      if (conf) {
        const opt = this.uniformOptions.find((o) => o.value === this.selectedKey)
        this.currentUniform = { ...conf, price: opt.price, label: opt.label }
        this.selected.clear()
        this.watch = false
        this.offsetSelected = false // reset offset when uniform changes
      } else {
        this.currentUniform = null
      }
    },
    removeUniform() {
      this.selectedKey = ''
      this.currentUniform = null
      this.selected.clear()
      this.watch = false
      this.offsetSelected = false
    },
    isSelected(award) {
      return this.selected.has(award.key)
    },
    canSelect(award) {
      if (this.selected.has(award.key)) return true
      const L = this.limits

      if (
        award.type === 'group123' &&
        L.group1to3Max !== undefined &&
        this.group1to3Count >= L.group1to3Max
      ) {
        alert(`Only ${L.group1to3Max} badge total from Groups 1‑3 allowed.`)
        return false
      }
      if (award.type === 'skillTab' && L.skillTabMax && this.skillTabCount >= L.skillTabMax) {
        alert(`Skill Tabs limited to ${L.skillTabMax}.`)
        return false
      }
      if (award.type === 'ribbon' && L.ribbonMax && this.ribbonCount >= L.ribbonMax) {
        alert(`Ribbons limited to ${L.ribbonMax}.`)
        return false
      }
      if (award.type === 'foreign' && L.foreignMax && this.foreignCount >= L.foreignMax) {
        alert(`Foreign awards limited to ${L.foreignMax}.`)
        return false
      }
      if (award.type === 'idBadge' && L.idBadgeMax) {
        if (L.allowedIdBadges && !L.allowedIdBadges.includes(award.key)) {
          alert(`"${award.name}" is not allowed on this uniform.`)
          return false
        }
        if (this.idBadgeCount >= L.idBadgeMax) {
          alert(`ID badges limited to ${L.idBadgeMax}.`)
          return false
        }
      }
      if (
        award.type === 'skillBadge' &&
        !award.ignoreLimit &&
        L.skillBadgeMax !== undefined &&
        this.skillBadgeCount >= L.skillBadgeMax
      ) {
        alert(`Skill badges limited to ${L.skillBadgeMax}.`)
        return false
      }
      if (L.prohibitedGroups && L.prohibitedGroups.includes(award.group)) {
        alert(`Badges from ${award.group} are prohibited on this uniform.`)
        return false
      }
      return true
    },
    toggleAward(award) {
      if (this.canSelect(award)) {
        if (this.selected.has(award.key)) {
          this.selected.delete(award.key)
        } else {
          this.selected.set(award.key, award)
        }
      }
    },
    resetAll() {
      this.selectedKey = ''
      this.currentUniform = null
      this.selected.clear()
      this.watch = false
      this.offsetSelected = false
      this.userInfo = {
        name: '',
        rank: '',
        type: '',
        gender: '',
        division: '',
        nametape: '',
      }
    },
    copyTemplate() {
      const badgeLines = this.selectedBadges.map((b) => `- ${b.name}`).join('\n')
      const ribbonLines = this.selectedRibbons.map((r) => `- ${r.name}`).join('\n')
      const offsetText = this.offsetSelected ? 'Yes' : 'No'
      const template = `**Name:** ${this.userInfo.name || 'N/A'}
**Rank:** ${this.userInfo.rank || 'N/A'}
**Type:** ${this.userInfo.type || 'N/A'}
**Gender:** ${this.userInfo.gender || 'N/A'}
**Badges:**
${badgeLines || 'None'}
**Ribbons:**
${ribbonLines || 'None'}
**Current Division/Brigade/Company:** ${this.userInfo.division || 'N/A'}
**Nametape:** ${this.userInfo.nametape || 'N/A'}
**Offset:** ${offsetText}
**Price:** R$${this.totalPrice.toFixed(2)}
**Discount Note:** N/A
**Robux Proof Sent to:** N/A`
      navigator.clipboard
        .writeText(template)
        .then(() => {
          alert('Order template copied to clipboard!')
        })
        .catch(() => {
          alert('Failed to copy. Please copy manually.')
        })
    },
  },
}
</script>

<style scoped>
/* Styles remain the same as before – no changes needed */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.calculator {
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  padding-bottom: 200px;
}

.header {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}
.title-eyebrow {
  display: block;
  font-size: 11px;
  letter-spacing: 0.25em;
  color: #ffd700;
  margin-bottom: 4px;
  font-weight: 500;
}
.title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 5vw, 42px);
  line-height: 0.95;
  letter-spacing: 0.03em;
  color: #ffffff;
}
.title em {
  font-style: normal;
  color: #ffd700;
}
.total-block {
  text-align: right;
  flex-shrink: 0;
}
.total-label {
  display: block;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #888888;
  margin-bottom: 2px;
}
.total-amount {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(26px, 4vw, 38px);
  color: #ffd700;
  letter-spacing: 0.05em;
}

.main {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  margin-top: 48px;
  border-top: 1px solid #333333;
  padding-top: 32px;
}
.section-header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 20px;
}
.section-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 13px;
  letter-spacing: 0.15em;
  color: #ffd700;
}
.section-header h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 0.08em;
  color: #ffffff;
}
.section-meta {
  margin-left: auto;
  font-size: 12px;
  color: #888888;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  background: #111111;
  border: 1px solid #333333;
  border-radius: 6px;
}
.item-label {
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: #cccccc;
}
.dropdown-control {
  flex-shrink: 0;
}
.uniform-select {
  background: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.15s;
  min-width: 200px;
}
.uniform-select:hover {
  border-color: #ffd700;
}
.uniform-select:focus {
  outline: none;
  border-color: #ffd700;
}
.item-price {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 0.05em;
  color: #ffd700;
  min-width: 80px;
  text-align: right;
}

.selected-uniform {
  margin-top: 12px;
  padding: 12px 16px;
  background: #1a1a1a;
  border: 1px solid #ffd700;
  border-radius: 6px;
}
.selected-uniform-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
.selected-label {
  font-size: 12px;
  color: #888888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.selected-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #ffd700;
}
.remove-uniform {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #333333;
  border-radius: 4px;
  color: #888888;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.15s;
}
.remove-uniform:hover {
  border-color: #ff4444;
  color: #ff4444;
}

.watch-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #111111;
  border: 1px solid #333333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
  max-width: 300px;
}
.watch-item:hover {
  border-color: #ffd700;
  background: #1a1a1a;
}
.watch-item.selected {
  border-color: #ffd700;
  background: #1a1a1a;
}
.watch-check {
  width: 18px;
  height: 18px;
  border: 1px solid #333333;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #ffd700;
  flex-shrink: 0;
  background: #000000;
}
.watch-name {
  flex: 1;
  font-size: 12.5px;
  color: #999999;
}
.watch-item.selected .watch-name {
  color: #cccccc;
}
.watch-price {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px;
  color: #ffd700;
  letter-spacing: 0.05em;
}

.limits-info {
  background: rgba(255, 215, 0, 0.1);
  border-left: 3px solid #ffd700;
  padding: 12px 16px;
  margin-bottom: 24px;
  border-radius: 4px;
}
.limits-info h4 {
  color: #ffd700;
  font-size: 12px;
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}
.limits-info ul {
  list-style: none;
  padding-left: 0;
}
.limits-info li {
  color: #aaaaaa;
  font-size: 11px;
  margin-bottom: 4px;
}

.badge-group {
  margin-bottom: 28px;
}
.badge-group-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #ffd700;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 6px;
}
.badge-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #111111;
  border: 1px solid #333333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}
.badge-item:hover {
  border-color: #ffd700;
  background: #1a1a1a;
}
.badge-item.selected {
  border-color: #ffd700;
  background: #1a1a1a;
}
.badge-check {
  width: 18px;
  height: 18px;
  border: 1px solid #333333;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #ffd700;
  flex-shrink: 0;
  background: #000000;
}
.badge-name {
  flex: 1;
  font-size: 12.5px;
  color: #999999;
  line-height: 1.3;
}
.badge-item.selected .badge-name {
  color: #cccccc;
}
.badge-cost {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px;
  color: #ffd700;
  letter-spacing: 0.05em;
}
.free-text {
  color: #4a7a8a;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
}
.badge-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #111111;
  border: 1px solid #333333;
  border-radius: 4px;
  margin-top: 8px;
  font-size: 13px;
  color: #888888;
}
.badge-summary span:last-child {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 17px;
  color: #ffd700;
}

/* Form Styles */
.form-section {
  margin-top: 48px;
}
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #111111;
  border: 1px solid #333333;
  border-radius: 6px;
  padding: 20px;
}
.form-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.form-row label {
  width: 220px;
  font-size: 13px;
  font-weight: 500;
  color: #ffd700;
}
.form-input {
  flex: 1;
  background: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
}
.form-input:focus {
  outline: none;
  border-color: #ffd700;
}
.form-input.readonly {
  background: #2a2a2a;
  color: #aaaaaa;
  cursor: not-allowed;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.checkbox-label input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.copy-btn {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #ffd700;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 16px;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 0.15s;
}
.copy-btn:hover {
  opacity: 0.8;
}

.summary-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 215, 0, 0.3);
  z-index: 200;
}
.summary-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  gap: 24px;
  align-items: center;
}
.summary-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888888;
}
.summary-line span:last-child {
  font-weight: 500;
  color: #aaaaaa;
}
.total-line {
  padding-top: 8px;
  border-top: 1px solid #333333;
  margin-top: 4px;
}
.total-line span {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 0.08em;
  color: #ffd700 !important;
}
.reset-btn {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #333333;
  border-radius: 4px;
  color: #888888;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.reset-btn:hover {
  border-color: #ffd700;
  color: #ffd700;
}

@media (max-width: 600px) {
  .summary-inner {
    flex-wrap: wrap;
  }
  .badge-grid {
    grid-template-columns: 1fr;
  }
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .total-block {
    text-align: left;
  }
  .watch-item {
    max-width: 100%;
  }
  .item-row {
    flex-wrap: wrap;
  }
  .uniform-select {
    min-width: 150px;
  }
  .form-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .form-row label {
    width: auto;
  }
}
</style>

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

      <!-- Watch (only if allowed) -->
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
      <section v-if="currentUniform && currentUniform.items" class="section">
        <div class="section-header">
          <span class="section-number">{{ currentUniform.allowsWatch ? '03' : '02' }}</span>
          <h2>Awards</h2>
          <span class="section-meta">R$3.00 each (unless noted)</span>
        </div>

        <!-- Live Limits Display -->
        <div class="limits-info">
          <h4>📋 Current Limits & Selections</h4>
          <ul>
            <li v-if="limits.skillTabMax">
              🔖 Skill Tabs: <strong>{{ skillTabCount }}</strong> / {{ limits.skillTabMax }}
            </li>
            <li v-if="limits.skillBadgeMax">
              🎖️ Skill Badges: <strong>{{ skillBadgeCount }}</strong> / {{ limits.skillBadgeMax }}
            </li>
            <li v-if="limits.ribbonMax">
              🎗️ Ribbons: <strong>{{ ribbonCount }}</strong> / {{ limits.ribbonMax }}
            </li>
            <li v-if="limits.idBadgeMax">
              🆔 ID Badges: <strong>{{ idBadgeCount }}</strong> / {{ limits.idBadgeMax }}
            </li>
            <li v-if="limits.foreignMax">
              🌍 Foreign Awards: <strong>{{ foreignCount }}</strong> / {{ limits.foreignMax }}
            </li>
            <li v-if="limits.group1Max">
              🔴 Group 1: <strong>{{ group1Count }}</strong> / {{ limits.group1Max }}
            </li>
            <li v-if="limits.group2Max">
              🟠 Group 2: <strong>{{ group2Count }}</strong> / {{ limits.group2Max }}
            </li>
            <li v-if="limits.group3Max">
              🔵 Group 3: <strong>{{ group3Count }}</strong> / {{ limits.group3Max }}
            </li>
            <li v-if="limits.groups1to3Max">
              🟣 Groups 1-3 Total: <strong>{{ groups1to3Count }}</strong> /
              {{ limits.groups1to3Max }}
            </li>
            <li v-if="limits.prohibitedGroups && limits.prohibitedGroups.length">
              ⛔ Prohibited: {{ limits.prohibitedGroups.join(', ') }}
            </li>
          </ul>
        </div>

        <!-- Award Grid -->
        <div class="badge-grid">
          <div
            v-for="award in currentUniform.items"
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

        <div class="badge-summary">
          <span>{{ selectedCount }} award(s) selected</span>
          <span>R${{ selectedTotal.toFixed(2) }}</span>
        </div>
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
// ======================= DATA (embedded, no external file) =======================
const uniformOptions = [
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

// Basic items
const divisionalPatch = { key: 'divisionalPatch', name: 'Divisional Patch', price: 5 }
const rankTab = { key: 'rankTab', name: 'Rank Tab', price: 3 }
const nametape = { key: 'nametape', name: 'Nametape', price: 3 }
const csib = { key: 'csib', name: 'CSIB', price: 3, type: 'skillBadge', ignoreLimit: true }
const overseasBar = { key: 'overseasBar', name: 'Overseas Bar', price: 3 }
const serviceStripe = { key: 'serviceStripe', name: 'Service Stripe', price: 3 }

// Group 1 (Combat)
const group1 = [
  { key: 'cib', name: 'CIB', price: 3, type: 'skillBadge', group: 'group1' },
  { key: 'cmb', name: 'CMB', price: 3, type: 'skillBadge', group: 'group1' },
  { key: 'cab', name: 'CAB', price: 3, type: 'skillBadge', group: 'group1' },
]

// Group 2 (Expert)
const group2 = [
  { key: 'eib', name: 'EIB', price: 3, type: 'skillBadge', group: 'group2' },
  { key: 'efmb', name: 'EFMB', price: 3, type: 'skillBadge', group: 'group2' },
  { key: 'esb', name: 'ESB', price: 3, type: 'skillBadge', group: 'group2' },
]

// Group 3 (Aviation & Space)
const group3 = [
  { key: 'aviator', name: 'Aviator', price: 3, type: 'skillBadge', group: 'group3' },
  { key: 'flightSurgeon', name: 'Flight Surgeon', price: 3, type: 'skillBadge', group: 'group3' },
  { key: 'aviation', name: 'Aviation', price: 3, type: 'skillBadge', group: 'group3' },
  { key: 'astronaut', name: 'Astronaut', price: 3, type: 'skillBadge', group: 'group3' },
  { key: 'eod', name: 'EOD', price: 3, type: 'skillBadge', group: 'group3' },
  { key: 'spaceOps', name: 'Space Ops', price: 3, type: 'skillBadge', group: 'group3' },
]

// Group 4 (Air & Special Ops) – no group limit
const group4 = [
  { key: 'parachutist', name: 'Parachutist', price: 3, type: 'skillBadge' },
  { key: 'pathfinder', name: 'Pathfinder', price: 3, type: 'skillBadge' },
  { key: 'airAssault', name: 'Air Assault', price: 3, type: 'skillBadge' },
  { key: 'freefall', name: 'Freefall', price: 3, type: 'skillBadge' },
  { key: 'mountaineering', name: 'Mountaineering', price: 3, type: 'skillBadge' },
  { key: 'specialOpsDiver', name: 'Spec Ops Diver', price: 3, type: 'skillBadge' },
]

// Identification Badges (Group 5)
const idBadges = [
  { key: 'drillSgt', name: 'Drill Sgt', price: 3, type: 'idBadge', group: 'group5' },
  { key: 'instructor', name: 'Instructor', price: 3, type: 'idBadge', group: 'group5' },
  { key: 'masterGunner', name: 'Master Gunner', price: 3, type: 'idBadge', group: 'group5' },
  { key: 'recruiter', name: 'Recruiter', price: 3, type: 'idBadge', group: 'group5' },
  { key: 'armyStaff', name: 'Army Staff', price: 3, type: 'idBadge', group: 'group5' },
  { key: 'jcsStaff', name: 'JCS Staff', price: 3, type: 'idBadge', group: 'group5' },
]

// Skill Tabs
const skillTabs = [
  { key: 'presidentsHundred', name: "President's Hundred", price: 3, type: 'skillTab' },
  { key: 'specialForces', name: 'Special Forces', price: 3, type: 'skillTab' },
  { key: 'ranger', name: 'Ranger', price: 3, type: 'skillTab' },
  { key: 'sapper', name: 'Sapper', price: 3, type: 'skillTab' },
  { key: 'jungle', name: 'Jungle', price: 3, type: 'skillTab' },
  { key: 'arctic', name: 'Arctic', price: 3, type: 'skillTab' },
]

// Foreign Devices
const foreign = [
  { key: 'rokJump', name: 'ROK Jump Wings', price: 3, type: 'foreign' },
  { key: 'rafParachute', name: 'RAF Parachute', price: 3, type: 'foreign' },
  { key: 'rafAviator', name: 'RAF Aviator', price: 3, type: 'foreign' },
  { key: 'philippinesAirborne', name: 'Philippines Airborne', price: 3, type: 'foreign' },
  { key: 'queensDedication', name: "Queen's Dedication", price: 3, type: 'foreign' },
  { key: 'combatReadiness', name: 'Combat Readiness', price: 3, type: 'foreign' },
  { key: 'turkishMarksmanship', name: 'Turkish Marksmanship', price: 3, type: 'foreign' },
]

// Ribbons (simplified for demo; add full list as needed)
const ribbons = [
  { key: 'dsc', name: 'DSC', price: 3, type: 'ribbon' },
  { key: 'silverStar', name: 'Silver Star', price: 3, type: 'ribbon' },
  { key: 'ndsm', name: 'NDSM', price: 0, type: 'ribbon' },
]

// ----- Flat item arrays for each uniform -----
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

// ----- Uniform configurations with limits -----
const uniformAwards = {
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

export default {
  name: 'UniformCalculator',
  data() {
    return {
      uniformOptions,
      selectedKey: '',
      currentUniform: null,
      selected: new Map(),
      watch: false,
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
    group1Count() {
      return this.selectedAwards.filter((a) => a.group === 'group1').length
    },
    group2Count() {
      return this.selectedAwards.filter((a) => a.group === 'group2').length
    },
    group3Count() {
      return this.selectedAwards.filter((a) => a.group === 'group3').length
    },
    groups1to3Count() {
      return this.group1Count + this.group2Count + this.group3Count
    },
    totalPrice() {
      const uniformPrice = this.currentUniform?.price || 0
      const watchPrice = this.watch && this.currentUniform?.allowsWatch ? 3 : 0
      return uniformPrice + watchPrice + this.selectedTotal
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
      } else {
        this.currentUniform = null
      }
    },
    removeUniform() {
      this.selectedKey = ''
      this.currentUniform = null
      this.selected.clear()
      this.watch = false
    },
    isSelected(award) {
      return this.selected.has(award.key)
    },
    canSelect(award) {
      if (this.selected.has(award.key)) return true
      const L = this.limits

      if (award.type === 'skillTab' && L.skillTabMax && this.skillTabCount >= L.skillTabMax) {
        alert(`❌ Skill Tabs limited to ${L.skillTabMax}.`)
        return false
      }
      if (award.type === 'ribbon' && L.ribbonMax && this.ribbonCount >= L.ribbonMax) {
        alert(`❌ Ribbons limited to ${L.ribbonMax}.`)
        return false
      }
      if (award.type === 'foreign' && L.foreignMax && this.foreignCount >= L.foreignMax) {
        alert(`❌ Foreign awards limited to ${L.foreignMax}.`)
        return false
      }
      if (award.type === 'idBadge' && L.idBadgeMax) {
        if (L.allowedIdBadges && !L.allowedIdBadges.includes(award.key)) {
          alert(`❌ "${award.name}" not allowed.`)
          return false
        }
        if (this.idBadgeCount >= L.idBadgeMax) {
          alert(`❌ ID badges limited to ${L.idBadgeMax}.`)
          return false
        }
      }
      if (
        award.type === 'skillBadge' &&
        !award.ignoreLimit &&
        L.skillBadgeMax &&
        this.skillBadgeCount >= L.skillBadgeMax
      ) {
        alert(`❌ Skill badges limited to ${L.skillBadgeMax}.`)
        return false
      }
      if (award.group === 'group1' && L.group1Max && this.group1Count >= L.group1Max) {
        alert(`❌ Only ${L.group1Max} from Group 1.`)
        return false
      }
      if (award.group === 'group2' && L.group2Max && this.group2Count >= L.group2Max) {
        alert(`❌ Only ${L.group2Max} from Group 2.`)
        return false
      }
      if (award.group === 'group3' && L.group3Max && this.group3Count >= L.group3Max) {
        alert(`❌ Only ${L.group3Max} from Group 3.`)
        return false
      }
      if (
        ['group1', 'group2', 'group3'].includes(award.group) &&
        L.groups1to3Max &&
        this.groups1to3Count >= L.groups1to3Max
      ) {
        alert(`❌ Only ${L.groups1to3Max} total from Groups 1‑3.`)
        return false
      }
      if (L.prohibitedGroups && L.prohibitedGroups.includes(award.group)) {
        alert(`❌ Group ${award.group} prohibited.`)
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
    },
  },
}
</script>

<style scoped>
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
}
</style>

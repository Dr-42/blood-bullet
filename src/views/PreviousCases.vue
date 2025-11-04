<template>
  <div class="previous-cases-view">
    <h1 class="page-title">Previous Cases</h1>
    <div class="case-lists">
      <div class="case-list">
        <h2>Routine Cases</h2>
        <ul>
          <li v-for="caseItem in routineCases" :key="caseItem.caseId" @click="selectCase(caseItem)">
            <a>{{ caseItem.caseId }} - {{ caseItem.date }}</a>
          </li>
        </ul>
      </div>
      <div class="case-list">
        <h2>Special Studies</h2>
        <ul>
          <li v-for="caseItem in specialCases" :key="caseItem.caseId" @click="selectCase(caseItem)">
            <a v-if="caseItem.patientDetails">{{ caseItem.patientDetails.name }} - {{ caseItem.date }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAllCases } from '../lib/storage'
import type { CaseData } from '../lib/storage'

export default {
  name: 'PreviousCases',
  data() {
    return {
      routineCases: [] as CaseData[],
      specialCases: [] as CaseData[],
    }
  },
  mounted() {
    this.loadCases()
  },
  methods: {
    loadCases() {
      const allCases = getAllCases()
      this.routineCases = allCases.filter((c) => !c.patientDetails)
      this.specialCases = allCases.filter((c) => c.patientDetails)
    },
    selectCase(caseData: CaseData) {
      const routeName = caseData.patientDetails ? 'special-studies' : 'routine'
      this.$router.push({ name: routeName, params: { caseData: JSON.stringify(caseData) } })
    },
  },
}
</script>

<style scoped>
.previous-cases-view {
  padding: 1rem;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  height: 100%;
}

.page-title {
  color: var(--accent2);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.case-lists {
  display: flex;
  gap: 2rem;
}

.case-list {
  flex: 1;
}

.case-list h2 {
  color: var(--accent2);
  margin-bottom: 1rem;
}

.case-list ul {
  list-style-type: none;
  padding: 0;
}

.case-list li {
  background-color: var(--bg-dark);
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.case-list li:hover {
  background-color: var(--accent);
}

.case-list a {
  color: var(--text-color, #e2e2e2);
  text-decoration: none;
}
</style>

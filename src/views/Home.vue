<template>
  <div class="home">
    <div class="header">
      <h1 class="title">Welcome to Blood Bullet</h1>
      <p class="subtitle">Your digital assistant for hematology case management</p>
    </div>

    <div class="quick-actions">
      <router-link to="/routine" class="action-button">
        <file-document-plus-outline-icon class="icon" />
        <span>New Routine Case</span>
      </router-link>
      <router-link to="/special-studies" class="action-button">
        <file-star-outline-icon class="icon" />
        <span>New Special Study</span>
      </router-link>
      <router-link to="/marrow-studies" class="action-button">
        <file-chart-outline-icon class="icon" />
        <span>New Marrow Study</span>
      </router-link>
      <router-link to="/previous-cases" class="action-button">
        <folder-open-outline-icon class="icon" />
        <span>View Previous Cases</span>
      </router-link>
    </div>

    <div class="main-content">
      <div class="recent-cases">
        <h2 class="section-title">Recent Cases</h2>
        <ul v-if="recentCases.length">
          <li v-for="caseItem in recentCases" :key="caseItem.caseId" @click="selectCase(caseItem)">
            <div class="case-info">
              <span class="case-name">{{ caseItem.patientDetails ? caseItem.patientDetails.name : caseItem.caseId }}</span>
              <span class="case-date">{{ caseItem.date }}</span>
            </div>
            <chevron-right-icon class="arrow-icon" />
          </li>
        </ul>
        <p v-else>No recent cases found.</p>
      </div>

      <div class="stats">
        <h2 class="section-title">Statistics</h2>
        <div class="stat-item">
          <span class="stat-value">{{ totalCases }}</span>
          <span class="stat-label">Total Cases</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ routineCasesCount }}</span>
          <span class="stat-label">Routine Cases</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ specialCasesCount }}</span>
          <span class="stat-label">Special Studies</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ marrowCasesCount }}</span>
          <span class="stat-label">Marrow Studies</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FileDocumentPlusOutlineIcon from 'vue-material-design-icons/FileDocumentPlusOutline.vue'
import FileStarOutlineIcon from 'vue-material-design-icons/FileStarOutline.vue'
import FileChartOutlineIcon from 'vue-material-design-icons/FileChartOutline.vue'
import FolderOpenOutlineIcon from 'vue-material-design-icons/FolderOpenOutline.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import { getAllCases } from '../lib/storage'
import type { CaseData } from '../lib/storage'

export default {
  name: 'Home',
  components: {
    FileDocumentPlusOutlineIcon,
    FileStarOutlineIcon,
    FileChartOutlineIcon,
    FolderOpenOutlineIcon,
    ChevronRightIcon,
  },
  data() {
    return {
      recentCases: [] as CaseData[],
      totalCases: 0,
      routineCasesCount: 0,
      specialCasesCount: 0,
      marrowCasesCount: 0,
    }
  },
  mounted() {
    this.loadDashboardData()
  },
  methods: {
    loadDashboardData() {
      const allCases = getAllCases()
      this.totalCases = allCases.length
      this.routineCasesCount = allCases.filter((c) => !c.patientDetails).length
      this.specialCasesCount = allCases.filter((c) => c.patientDetails && !c.aspirate).length
      this.marrowCasesCount = allCases.filter((c) => c.aspirate).length
      this.recentCases = allCases.slice(0, 5)
    },
    selectCase(caseData?: CaseData) {
      if (!caseData) return
      let routeName = 'routine'
      if (caseData.aspirate) {
        routeName = 'marrow-studies'
      } else if (caseData.patientDetails) {
        routeName = 'special-studies'
      }
      this.$router.push({ name: routeName, params: { caseData: JSON.stringify(caseData) } })
    },
  },
}
</script>

<style scoped>
.home {
  padding: 2rem;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--accent2);
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-color, #e2e2e2);
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.action-button {
  background-color: var(--bg-dark);
  border: 1px solid var(--accent);
  color: var(--text-color, #e2e2e2);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: var(--accent-hover);
}

.action-button .icon {
  font-size: 1.5rem;
}

.main-content {
  display: flex;
  gap: 2rem;
}

.recent-cases, .stats {
  flex: 1;
  background-color: var(--bg-dark);
  padding: 1.5rem;
  border-radius: 8px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent2);
  margin-bottom: 1rem;
}

.recent-cases ul {
  list-style-type: none;
  padding: 0;
}

.recent-cases li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg);
  border-radius: 5px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.recent-cases li:hover {
  background-color: var(--accent-hover);
}

.case-info {
  display: flex;
  flex-direction: column;
}

.case-name {
  font-weight: 600;
}

.case-date {
  font-size: 0.9rem;
  color: #aaa;
}

.arrow-icon {
  font-size: 1.5rem;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg);
  padding: 1rem;
  border-radius: 5px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: var(--accent2);
}

.stat-label {
  font-size: 1rem;
}
</style>
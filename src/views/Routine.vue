<template>
  <div class="routine">
    <error-display v-if="error" :errorText="errorText" />
    <div id="loading" v-if="loading">
      <loading-spinner />
    </div>
    <div id="content" v-else>
      <h1 class="page-title">Routine Case</h1>
      <lab-details-view v-model:labDetails="labDetails" />
      <coulter-view v-model:coulterData="coulterData" />
      <peripheral-smear-view v-model:peripheralSmearData="peripheralSmearData" />
    </div>
    <!-- Floating Action Buttons -->
    <div class="floating-buttons">
      <button class="fab" @click="saveCase()" title="Save Case">
        <content-save-all-icon />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import CoulterView from '../components/subviews/CoulterView.vue'
import LabDetailsView from '../components/subviews/LabDetailsView.vue'
import PeripheralSmearView from '../components/subviews/PeripheralSmearView.vue'
import ErrorDisplay from '../components/subviews/ErrorDisplay.vue'
import LoadingSpinner from '../components/subviews/LoadingSpinner.vue'
import ContentSaveAllIcon from 'vue-material-design-icons/ContentSaveAll.vue'

export default {
  name: 'Routine',
  components: {
    CoulterView,
    LabDetailsView,
    PeripheralSmearView,
    ErrorDisplay,
    LoadingSpinner,
    ContentSaveAllIcon,
  },
  data() {
    return {
      loading: false,
      error: false,
      errorText: '',
      labDetails: {
        caseId: '12345',
        date: new Date().toISOString().slice(0, 10),
      },
      peripheralSmearData: {
        rbc: {},
        wbc: {},
        platelet: {},
      },
      dlcData: {},
      coulterData: {
        WBC: '5.0',
        'Neu#': '2.5',
        'Lym#': '1.5',
        'Mon#': '0.5',
        'Eos#': '0.2',
        'Bas#': '0.1',
        'Neu%': '50',
        'Lym%': '30',
        'Mon%': '10',
        'Eos%': '4',
        'Bas%': '2',
        RBC: '4.50',
        HGB: '14.0',
        HCT: '42.0',
        MCV: '90.0',
        MCH: '30.0',
        MCHC: '33.0',
        'RDW-CV': '12.0',
        'RDW-SD': '40.0',
        PLT: '250',
        MPV: '10.0',
        PDW: '15.0',
        PCT: '0.25',
        'P-LCC': '50',
        'P-LCR': '0.2',
        'RET#': '0.05',
        'RET%': '1.0',
        IRF: '0.1',
        LFR: '0.05',
        MFR: '0.03',
        HFR: '0.02',
        'IMG#': '0.01',
        'IMG%': '0.05',
        IPF: '0.02',
        RHE: '0.01',
      },
    }
  },
  methods: {
    saveCase() {
      // Implement save case functionality here
      console.log('Save Case button clicked')
    },
  },
}
</script>

<style scoped>
.routine {
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  padding: 1rem;
  height: 100%;
}

.page-title {
  color: var(--accent2);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.floating-buttons {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}

.fab {
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.fab:hover {
  background-color: var(--accent-hover);
}
</style>


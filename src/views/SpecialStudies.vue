<template>
  <div class="routine">
    <error-display v-if="error" :errorText="errorText" />
    <div id="loading" v-if="loading">
      <loading-spinner />
    </div>
    <div id="content" v-else>
      <h1 class="page-title">Special Studies</h1>
      <patient-details-view v-model:patientDetails="patientDetails" />
      <lab-details-view v-model:labDetails="labDetails" />
      <clinical-details-view
        v-model:clinicalDetails="clinicalDetails"
        :isFemale="patientDetails.gender === 'female'"
      />
      <div class="previous-investigations-container">
        <div class="details-section-label">Previous Hematological Investigations</div>
        <div v-for="(investigation, index) in previousInvestigations" :key="index">
          <previous-investigations-view
            :investigation="investigation"
            @update:investigation="updateInvestigation(index, $event)"
            @remove="removeInvestigation(index)"
          />
        </div>
        <button class="add-btn" @click="addInvestigation">Add Investigation</button>
      </div>
      <coulter-view v-model:coulterData="coulterData" />
      <additional-tests-view v-model:additionalTests="additionalTests" />
      <peripheral-smear-view v-model:peripheralSmearData="peripheralSmearData" />
      <iron-studies-view
        v-if="patientDetails.testsRequested.includes('Iron Studies')"
        v-model:ironStudies="ironStudies"
      />
      <h-p-l-c-view v-if="patientDetails.testsRequested.includes('HPLC')" v-model:hplc="hplc" />
      <l-a-p-score-view
        v-if="patientDetails.testsRequested.includes('LAP Score')"
        v-model:lapScore="lapScore"
      />
      <special-stains-view
        v-if="patientDetails.testsRequested.includes('Special Stains')"
        v-model:specialStains="specialStains"
      />
      <conclusion-view v-model:conclusion="conclusion" />
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
import PatientDetailsView from '../components/subviews/PatientDetails.vue'

import ClinicalDetailsView from '../components/subviews/ClinicalDetails.vue'

import PreviousInvestigationsView from '../components/subviews/PreviousInvestigations.vue'

import IronStudiesView from '../components/subviews/IronStudies.vue'
import HPLCView from '../components/subviews/HPLC.vue'
import LAPScoreView from '../components/subviews/LAPScore.vue'
import SpecialStainsView from '../components/subviews/SpecialStains.vue'
import AdditionalTestsView from '../components/subviews/AdditionalTests.vue'
import ConclusionView from '../components/subviews/Conclusion.vue'
import type { PatientDetails, PreviousInvestigation } from '../types'

export default {
  name: 'SpecialStudies',
  components: {
    CoulterView,
    LabDetailsView,
    PeripheralSmearView,
    ErrorDisplay,
    LoadingSpinner,
    ContentSaveAllIcon,
    PatientDetailsView,
    ClinicalDetailsView,
    PreviousInvestigationsView,
    IronStudiesView,
    HPLCView,
    LAPScoreView,
    SpecialStainsView,
    AdditionalTestsView,
    ConclusionView,
  },
  data() {
    return {
      loading: false,
      error: false,
      errorText: '',
      patientDetails: {
        name: '',
        age: null,
        gender: 'male',
        crNo: '',
        contactNo: '',
        testsRequested: [] as string[],
      } as PatientDetails,
      labDetails: {
        caseId: '12345',
        date: new Date().toISOString().slice(0, 10),
      },
      clinicalDetails: {
        chiefComplaint: '',
        pica: '',
        bloodTransfusion: '',
        menstrualHistory: '',
        pastHistory: '',
        diet: 'Non-vegetarian',
        sleep: '',
        appetite: '',
        bladder: '',
        bowel: '',
        drugUse: '',
        others: '',
        bleeding: '',
        hematinics: '',
        obstetricHistory: '',
        familyHistory: '',
        pallor: false,
        icterus: false,
        clubbing: false,
        cyanosis: false,
        lymphadenopathy: false,
        edema: false,
        hepatomegaly: false,
        splenomegaly: false,
      },
      previousInvestigations: [] as PreviousInvestigation[],
      ironStudies: {
        fe: '',
        tibc: '',
        ts: '',
        sFerritin: '',
      },
      hplc: {
        hbf: '',
        hba2: '',
        others: [],
      },
      lapScore: {
        score: '',
      },
      specialStains: {
        mpo: '',
        sbb: '',
        pas: '',
        others: [],
      },
      additionalTests: {
        g6pd: 'Normal',
        esr: '',
        reticPercent: '',
      },
      conclusion: {
        impression: '',
        advice: '',
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
    addInvestigation() {
      this.previousInvestigations.push({
        date: new Date().toISOString().slice(0, 10),
        hb: '',
        tlc: '',
        plt: '',
        rbc: '',
        mcv: '',
        mch: '',
        mchc: '',
        urea: '',
        creat: '',
        na: '',
        k: '',
        sgot: '',
        sgpt: '',
        alp: '',
        dBil: '',
        tBil: '',
      })
    },
    removeInvestigation(index: number) {
      this.previousInvestigations.splice(index, 1)
    },
    updateInvestigation(index: number, investigation: any) {
      this.previousInvestigations[index] = investigation
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

.add-btn {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 1rem;
}

.add-btn:hover {
  background-color: var(--accent-hover);
}

.previous-investigations-container {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
  background-color: var(--bg-dark);
}

.details-section-box {
  margin-bottom: 2rem;
}

.details-section-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: var(--bg-dark);
  color: var(--accent2);
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}
</style>

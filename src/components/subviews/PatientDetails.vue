<template>
  <div class="details-section-box">
    <div class="details-section-label">Patient Details</div>
    <div class="details-grid">
      <div class="details-item">
        <label class="property-name">Name:</label>
        <input
          type="text"
          class="details-input"
          :value="patientDetails.name"
          @input="update('name', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item">
        <label class="property-name">Age:</label>
        <input
          type="number"
          class="details-input"
          :value="patientDetails.age"
          @input="update('age', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item">
        <label class="property-name">Gender:</label>
        <select
          class="details-input"
          :value="patientDetails.gender"
          @change="update('gender', ($event.target as HTMLSelectElement).value)"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="details-item">
        <label class="property-name">CR No.:</label>
        <input
          type="text"
          class="details-input"
          :value="patientDetails.crNo"
          @input="update('crNo', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item">
        <label class="property-name">Contact No.:</label>
        <input
          type="text"
          class="details-input"
          :value="patientDetails.contactNo"
          @input="update('contactNo', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="tests-requested">
      <div class="property-name">Tests Requested:</div>
      <div class="test-options">
        <div
          v-for="test in availableTests"
          :key="test"
          class="test-option"
          :class="{ selected: patientDetails.testsRequested.includes(test) }"
          @click="toggleTest(test)"
        >
          {{ test }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { PatientDetails } from '../../types'

export default defineComponent({
  name: 'PatientDetailsView',
  props: {
    patientDetails: {
      type: Object as PropType<PatientDetails>,
      required: true,
    },
  },
  emits: ['update:patientDetails'],
  data() {
    return {
      availableTests: ['Iron Studies', 'HPLC', 'LAP Score', 'Special Stains'],
    }
  },
  methods: {
    update(key: keyof PatientDetails, value: any) {
      this.$emit('update:patientDetails', { ...this.patientDetails, [key]: value })
    },
    toggleTest(test: string) {
      const tests = this.patientDetails.testsRequested.slice()
      const index = tests.indexOf(test)
      if (index > -1) {
        tests.splice(index, 1)
      } else {
        tests.push(test)
      }
      this.update('testsRequested', tests)
    },
  },
})
</script>

<style scoped>
.details-section-box {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
  background-color: var(--bg-dark);
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

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.details-item {
  background-color: var(--bg-dark);
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.2s ease;
}

.property-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent2);
  margin-bottom: 0.5rem;
  display: block;
}

.details-input {
  width: 100%;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--bg);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.details-input:focus {
  outline: none;
  border-color: var(--accent-hover);
}

.tests-requested {
  margin-top: 1.5rem;
}

.test-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.test-option {
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--accent);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.test-option.selected {
  background-color: var(--accent);
  color: white;
}

.test-option:active {
  background-color: var(--accent-hover);
}

@media (hover: hover) {
  .test-option:hover {
    background-color: var(--accent-hover);
  }
}
</style>

<template>
  <div class="details-section-box">
    <div class="details-section-label">Clinical Details</div>
    <div class="details-grid">
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">Chief Complaint:</div>
        <input
          type="text"
          class="details-input"
          :value="clinicalDetails.chiefComplaint"
          @input="$emit('update:clinicalDetails', { ...clinicalDetails, chiefComplaint: ($event.target as HTMLInputElement).value })"
        />
      </div>
    </div>
    <div class="details-section-box">
        <div class="details-section-label">Histories</div>
        <div class="details-grid">
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Pica:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.pica"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, pica: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
                <div class="property-name">Blood Transfusion:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.bloodTransfusion"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, bloodTransfusion: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div v-if="isFemale" class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Menstrual History:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.menstrualHistory"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, menstrualHistory: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
                <div class="property-name">Past History:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.pastHistory"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, pastHistory: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Bleeding:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.bleeding"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, bleeding: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
                <div class="property-name">Hematinics:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.hematinics"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, hematinics: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div v-if="isFemale" class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Obstetric History:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.obstetricHistory"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, obstetricHistory: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
                <div class="property-name">Family History:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.familyHistory"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, familyHistory: ($event.target as HTMLInputElement).value })"
                />
            </div>
        </div>
    </div>
    <div class="details-section-box">
        <div class="details-section-label">Personal History</div>
        <div class="details-grid">
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Diet:</div>
                <select
                class="details-input"
                :value="clinicalDetails.diet"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, diet: ($event.target as HTMLSelectElement).value })"
                >
                <option>Vegetarian</option>
                <option>Non-vegetarian</option>
                <option>Eggetarian</option>
                <option>Vegan</option>
                </select>
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
                <div class="property-name">Sleep:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.sleep"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, sleep: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Appetite:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.appetite"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, appetite: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
                <div class="property-name">Bladder:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.bladder"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, bladder: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Bowel:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.bowel"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, bowel: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
                <div class="property-name">Drug Use:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.drugUse"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, drugUse: ($event.target as HTMLInputElement).value })"
                />
            </div>
            <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
                <div class="property-name">Others:</div>
                <input
                type="text"
                class="details-input"
                :value="clinicalDetails.others"
                @input="$emit('update:clinicalDetails', { ...clinicalDetails, others: ($event.target as HTMLInputElement).value })"
                />
            </div>
        </div>
    </div>
    <div class="details-section-box">
        <div class="details-section-label">General Physical Exam</div>
        <div class="test-options">
            <div
            v-for="exam in availableGPE"
            :key="exam"
            class="test-option"
            :class="{ selected: clinicalDetails[exam.toLowerCase()] }"
            @click="toggleGPE(exam.toLowerCase())"
            >
            {{ exam }}
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClinicalDetailsView',
  props: {
    clinicalDetails: {
      type: Object as () => any,
      required: true,
    },
    isFemale: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:clinicalDetails'],
  data() {
    return {
      availableGPE: [
        'Pallor',
        'Icterus',
        'Clubbing',
        'Cyanosis',
        'Lymphadenopathy',
        'Edema',
        'Hepatomegaly',
        'Splenomegaly',
      ],
    }
  },
  methods: {
    toggleGPE(exam: string) {
      this.$emit('update:clinicalDetails', {
        ...this.clinicalDetails,
        [exam]: !this.clinicalDetails[exam],
      })
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
  border-left: 5px solid;
  transition: transform 0.2s ease;
}

.details-item:hover {
  transform: translateY(-3px);
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

<template>
  <div class="coulter-section-box">
    <div class="coulter-section-label">Coulter View</div>
    <div class="coulter-grid">
      <div
        v-for="(property, index) in coulterProperties"
        :key="property"
        class="coulter-item"
        :style="{ borderLeftColor: getBorderColor(index) }"
      >
        <div class="property-name">{{ property }}</div>
        <input
          type="text"
          class="coulter-input"
          :value="coulterData[property]"
          @input="formatAndEmit(property, ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoulterView',
  props: {
    coulterData: {
      type: Object as () => Record<string, string>,
      required: true,
    },
  },
  emits: ['update:coulterData'],
  data() {
    return {
      coulterProperties: [
        'WBC',
        'Neu#',
        'Lym#',
        'Mon#',
        'Eos#',
        'Bas#',
        'Neu%',
        'Lym%',
        'Mon%',
        'Eos%',
        'Bas%',
        'RBC',
        'HGB',
        'HCT',
        'MCV',
        'MCH',
        'MCHC',
        'RDW-CV',
        'RDW-SD',
        'PLT',
        'MPV',
        'PDW',
        'PCT',
        'P-LCC',
        'P-LCR',
        'RET#',
        'RET%',
        'IRF',
        'LFR',
        'MFR',
        'HFR',
        'IMG#',
        'IMG%',
        'IPF',
        'RHE',
      ],
      paletteColors: ['--accent', '--accent2', '--accent-hover', '--disabled-color'],
    }
  },
  methods: {
    getBorderColor(index: number) {
      return `var(${this.paletteColors[index % this.paletteColors.length]})`
    },
    formatAndEmit(property: string, value: string) {
      let formattedValue: string = value.trim();

      if (formattedValue === '') {
        // Allow empty string
        this.$emit('update:coulterData', { ...this.coulterData, [property]: formattedValue });
        return;
      }

      const num = parseFloat(formattedValue);
      if (!isNaN(num)) {
        formattedValue = num.toFixed(3);
      } else {
        // If not a valid number, revert to previous valid value or empty string
        formattedValue = this.coulterData[property] || '';
      }

      this.$emit('update:coulterData', { ...this.coulterData, [property]: formattedValue });
    },
  },
})
</script>

<style scoped>
.coulter-section-box {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-top: 2rem;
  background-color: var(--bg-dark);
}

.coulter-section-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: var(--bg-dark);
  color: var(--accent2);
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.coulter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.coulter-item {
  background-color: var(--bg-dark);
  border-radius: 8px;
  padding: 1rem;
  border-left: 5px solid;
  transition: transform 0.2s ease;
}

.coulter-item:hover {
  transform: translateY(-3px);
}

.property-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent2);
  margin-bottom: 0.5rem;
  display: block;
}

.coulter-input {
  width: 100%;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--bg);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.coulter-input:focus {
  outline: none;
  border-color: var(--accent-hover);
}
</style>

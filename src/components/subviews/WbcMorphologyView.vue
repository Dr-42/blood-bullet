<template>
  <div class="morphology-section-box">
    <div class="morphology-section-label">WBC Morphology</div>
    <div class="morphology-grid">
      <div
        v-for="(property, index) in wbcProperties"
        :key="property"
        class="morphology-item"
        :style="{ borderLeftColor: getBorderColor(index) }"
      >
        <div class="property-name">{{ property }}</div>
        <input
          type="text"
          class="morphology-input"
          :value="wbcMorphology[property]"
          @input="
            $emit('update:wbcMorphology', {
              ...wbcMorphology,
              [property]: ($event.target as HTMLInputElement).value,
            })
          "
        />
      </div>
      <div>
        <dlc-counter v-model:dlcData="dlcData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DlcCounter from '../../components/subviews/DlcCounter.vue'

export default defineComponent({
  name: 'WbcMorphologyView',
  components: {
    DlcCounter,
  },
  props: {
    wbcMorphology: {
      type: Object as () => Record<string, string>,
      required: true,
    },
  },
  emits: ['update:wbcMorphology'],
  data() {
    return {
      wbcProperties: ['Notes'],
      paletteColors: ['--accent', '--accent2', '--accent-hover', '--disabled-color'],
      dlcData: {},
    }
  },
  methods: {
    getBorderColor(index: number) {
      return `var(${this.paletteColors[index % this.paletteColors.length]})`
    },
  },
})
</script>

<style scoped>
.morphology-section-box {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
  background-color: var(--bg-dark);
}

.morphology-section-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: var(--bg-dark);
  color: var(--accent2);
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.morphology-grid {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.morphology-item {
  background-color: var(--bg-dark);
  border-radius: 8px;
  padding: 1rem;
  border-left: 5px solid;
  transition: transform 0.2s ease;
}

.morphology-item:hover {
  transform: translateY(-3px);
}

.property-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent2);
  margin-bottom: 0.5rem;
  display: block;
}

.morphology-input {
  width: 100%;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--bg);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.morphology-input:focus {
  outline: none;
  border-color: var(--accent-hover);
}
</style>

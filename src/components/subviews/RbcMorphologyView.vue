<template>
  <div class="morphology-section-box">
    <div class="morphology-section-label">RBC Morphology</div>
    <div class="morphology-grid">
      <div
        v-for="(property, index) in rbcProperties"
        :key="property"
        class="morphology-item"
        :class="{ 'full-width-item': property === 'Additional Notes' }"
        :style="{ borderLeftColor: getBorderColor(index) }"
      >
        <div class="property-name">{{ property }}</div>
        <input
          type="text"
          class="morphology-input"
          :value="rbcMorphology[property]"
          @input="
            $emit('update:rbcMorphology', {
              ...rbcMorphology,
              [property]: ($event.target as HTMLInputElement).value,
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbcMorphologyView',
  props: {
    rbcMorphology: {
      type: Object as () => Record<string, string>,
      required: true,
    },
  },
  emits: ['update:rbcMorphology'],
  data() {
    return {
      rbcProperties: ['Degree', 'Aniso', 'Poikilo', 'Polys', 'Notes'],
      paletteColors: ['--accent', '--accent2', '--accent-hover', '--disabled-color'],
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
}

.morphology-item {
  background-color: var(--bg-dark);
  border-radius: 8px;
  padding: 1rem;
  border-left: 5px solid;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.full-width-item {
  grid-column: span 2;
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

@media (max-width: 600px) {
  .morphology-grid {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    break-inside: avoid;
  }
}
</style>

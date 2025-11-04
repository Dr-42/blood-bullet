<template>
  <div class="details-section-box">
    <div class="details-section-label">Additional Tests</div>
    <div class="details-grid">
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">G6PD:</div>
        <select
          class="details-input"
          :value="additionalTests.g6pd"
          @input="update('g6pd', ($event.target as HTMLSelectElement).value)"
        >
          <option>Normal</option>
          <option>Positive</option>
          <option>QNS</option>
        </select>
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">ESR:</div>
        <input
          type="number"
          class="details-input"
          :value="additionalTests.esr"
          @input="update('esr', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">Retic%</div>
        <input
          type="number"
          class="details-input"
          :value="additionalTests.reticPercent"
          @input="update('reticPercent', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdditionalTestsView',
  props: {
    additionalTests: {
      type: Object as () => any,
      required: true,
    },
  },
  emits: ['update:additionalTests'],
  methods: {
    update(key: string, value: any) {
      this.$emit('update:additionalTests', { ...this.additionalTests, [key]: value })
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
</style>

<template>
  <div class="details-section-box">
    <div class="details-grid">
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">Date:</div>
        <input
          type="date"
          class="details-input"
          :value="investigation.date"
          @input="update('date', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">Hb:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.hb"
          @input="update('hb', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">TLC:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.tlc"
          @input="update('tlc', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">Plt:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.plt"
          @input="update('plt', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">RBC:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.rbc"
          @input="update('rbc', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">MCV:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.mcv"
          @input="update('mcv', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">MCH:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.mch"
          @input="update('mch', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">MCHC:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.mchc"
          @input="update('mchc', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">Urea:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.urea"
          @input="update('urea', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">Creat:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.creat"
          @input="update('creat', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">Na+:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.na"
          @input="update('na', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">K+:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.k"
          @input="update('k', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">SGOT:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.sgot"
          @input="update('sgot', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">SGPT:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.sgpt"
          @input="update('sgpt', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">ALP:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.alp"
          @input="update('alp', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">D. Bil:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.dBil"
          @input="update('dBil', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">T. Bil:</div>
        <input
          type="text"
          class="details-input"
          :value="investigation.tBil"
          @input="update('tBil', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <button class="remove-btn" @click="$emit('remove')">Remove</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PreviousInvestigationsView',
  props: {
    investigation: {
      type: Object as () => any,
      required: true,
    },
  },
  emits: ['update:investigation', 'remove'],
  methods: {
    update(key: string, value: any) {
      this.$emit('update:investigation', { ...this.investigation, [key]: value })
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

.remove-btn {
  background-color: var(--accent2);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}
</style>

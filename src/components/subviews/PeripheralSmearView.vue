<template>
  <div class="peripheral-smear-section-box">
    <div class="peripheral-smear-section-label">Peripheral Smear Examination</div>
    <div class="peripheral-smear-grid">
      <rbc-morphology-view
        v-model:rbcMorphology="peripheralSmearData.rbc"
      />
      <wbc-morphology-view
        v-model:wbcMorphology="peripheralSmearData.wbc"
      />
      <platelet-morphology-view
        v-model:plateletMorphology="peripheralSmearData.platelet"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RbcMorphologyView from './RbcMorphologyView.vue'
import WbcMorphologyView from './WbcMorphologyView.vue'
import PlateletMorphologyView from './PlateletMorphologyView.vue'

export default defineComponent({
  name: 'PeripheralSmearView',
  components: {
    RbcMorphologyView,
    WbcMorphologyView,
    PlateletMorphologyView,
  },
  props: {
    peripheralSmearData: {
      type: Object as () => {
        rbc: Record<string, string>
        wbc: Record<string, string>
        platelet: Record<string, string>
      },
      required: true,
    },
  },
  emits: ['update:peripheralSmearData'],
})
</script>

<style scoped>
.peripheral-smear-section-box {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
  background-color: var(--bg-dark);
}

.peripheral-smear-section-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: var(--bg-dark);
  color: var(--accent2);
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.peripheral-smear-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
</style>

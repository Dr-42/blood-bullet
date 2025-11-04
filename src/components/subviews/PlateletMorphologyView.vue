<template>
  <div class="morphology-section-box">
    <div class="morphology-section-label">Platelet Morphology</div>
    <div class="morphology-grid">
      <div
        v-for="(property, index) in plateletProperties"
        :key="property"
        class="morphology-item"
        :style="{ borderLeftColor: getBorderColor(index) }"
      >
        <div class="property-name">{{ property }}</div>
        <input
          type="text"
          class="morphology-input"
          :value="plateletMorphology[property]"
          @input="
            $emit('update:plateletMorphology', {
              ...plateletMorphology,
              [property]: ($event.target as HTMLInputElement).value,
            })
          "
        />
      </div>
    </div>
    <button class="manual-count-btn" @click="() => openManualCountModal()">Manual Count</button>
    <div v-if="manualCount > 0" class="manual-count-display">
      <div class="property-name">Manual Count:</div>
      <div class="count-value">{{ manualCount }}</div>
      <button class="btn-recount" @click="() => openManualCountModal('recount')">Recount</button>
      <button class="btn-replace" @click="() => openManualCountModal('replace')">Replace</button>
    </div>
    <manual-count-modal
      v-if="showManualCountModal"
      :defaultFactor="15000"
      @close="showManualCountModal = false"
      @save="saveManualCount"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ManualCountModal from '../../components/modals/ManualCountModal.vue'

export default defineComponent({
  name: 'PlateletMorphologyView',
  components: {
    ManualCountModal,
  },
  props: {
    plateletMorphology: {
      type: Object as () => Record<string, string>,
      required: true,
    },
  },
  emits: ['update:plateletMorphology'],
  data() {
    return {
      plateletProperties: ['Notes'],
      paletteColors: ['--accent', '--accent2', '--accent-hover', '--disabled-color'],
      showManualCountModal: false,
      manualCount: 0,
      manualCountMode: 'initial',
    }
  },
  methods: {
    getBorderColor(index: number) {
      return `var(${this.paletteColors[index % this.paletteColors.length]})`
    },
    openManualCountModal(mode: string = 'initial') {
      this.manualCountMode = mode
      this.showManualCountModal = true
    },
    saveManualCount(count: number) {
      if (this.manualCountMode === 'recount') {
        const newNotes = `${this.plateletMorphology.Notes}\nRecount: ${count}`
        this.$emit('update:plateletMorphology', {
          ...this.plateletMorphology,
          Notes: newNotes,
        })
      } else {
        this.manualCount = count
        this.$emit('update:plateletMorphology', {
          ...this.plateletMorphology,
          'Manual Count': count.toString(),
        })
      }
      this.showManualCountModal = false
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

.manual-count-btn {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.manual-count-btn:hover {
  background-color: var(--accent-hover);
}

.manual-count-display {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.count-value {
  font-weight: bold;
}

.btn-recount, .btn-replace {
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-recount {
  background-color: var(--accent2);
  color: white;
}

.btn-replace {
  background-color: var(--accent);
  color: white;
}
</style>

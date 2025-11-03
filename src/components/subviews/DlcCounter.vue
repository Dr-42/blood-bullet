<template>
  <div class="dlc-section-box">
    <div class="dlc-section-label">DLC Counter</div>
    <div class="dlc-controls">
      <div class="control-item">
        <label for="dlc-target">Target:</label>
        <input type="number" id="dlc-target" v-model.number="targetCount" class="dlc-input" />
      </div>
      <div class="control-item">
        <label class="switch">
          <input type="checkbox" v-model="isDecreaseMode" />
          <span class="slider round"></span>
        </label>
        <span>{{ isDecreaseMode ? 'Decrease' : 'Increase' }}</span>
      </div>
      <button @click="resetCounts" class="reset-button">Reset</button>
      <div class="total-display">Total: {{ totalCount }} / {{ targetCount }}</div>
    </div>

    <div class="nrbc-section">
      <div class="dlc-cell nrbc-cell" @click="handleCellClick(nRbcType.name)">
        <div class="cell-icon" :style="getIconStyle(nRbcType.atlas_key)"></div>
        <div class="cell-name">{{ nRbcType.name }}</div>
        <div class="cell-count">{{ dlcData[nRbcType.name] || 0 }}</div>
      </div>
    </div>

    <hr class="separator" />

    <div class="dlc-grid">
      <div v-for="cell in wbcTypes" :key="cell.name" class="dlc-cell" @click="handleCellClick(cell.name)">
        <div class="cell-icon" :style="getIconStyle(cell.atlas_key)"></div>
        <div class="cell-name">{{ cell.name }}</div>
        <div class="cell-count">{{ dlcData[cell.name] || 0 }}</div>
      </div>
    </div>

    <div v-if="totalCount === targetCount" class="dlc-summary">
      <div class="summary-label">DLC Summary:</div>
      <div class="summary-string" v-html="dlcString"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import atlasData from '../../../public/images/at_guide.json'
import bloodCellsImg from '/images/blood_cells.png'

interface CellType {
  name: string
  atlas_key: string
}

export default defineComponent({
  name: 'DlcCounter',
  props: {
    dlcData: {
      type: Object as () => Record<string, number>,
      required: true,
    },
  },
  emits: ['update:dlcData'],
  data() {
    const cellTypes: CellType[] = [
      { name: 'Neutrophil', atlas_key: 'neutrophil' },
      { name: 'Lymphocyte', atlas_key: 'lymphocyte' },
      { name: 'Monocyte', atlas_key: 'monocyte' },
      { name: 'Eosinophil', atlas_key: 'eosinophil' },
      { name: 'Basophil', atlas_key: 'basophil' },
      { name: 'Band Form', atlas_key: 'band' },
      { name: 'Metamyelocyte', atlas_key: 'metamyelocyte' },
      { name: 'Atypical', atlas_key: 'myeloblast' }, // Placeholder
      { name: 'nRBC', atlas_key: 'erythroid' },
    ]

    return {
      targetCount: 100,
      isDecreaseMode: false,
      nRbcType: cellTypes.find(c => c.name === 'nRBC')!,
      wbcTypes: cellTypes.filter(c => c.name !== 'nRBC'),
      atlas: atlasData,
    }
  },
  computed: {
    totalCount(): number {
      return Object.entries(this.dlcData)
        .filter(([key]) => key !== 'nRBC')
        .reduce((sum, [, count]) => sum + count, 0)
    },
    dlcString(): string {
      if (this.totalCount !== this.targetCount) return ''

      const normalized = this.getNormalizedCounts()
      const nrbcCount = this.dlcData.nRBC || 0

      const parts = {
        N: normalized.Neutrophil || 0,
        L: normalized.Lymphocyte || 0,
        M: normalized.Monocyte || 0,
        E: normalized.Eosinophil || 0,
        B: normalized.Basophil || 0,
        Band: normalized['Band Form'] || 0,
        Meta: normalized.Metamyelocyte || 0,
        Aty: normalized.Atypical || 0,
      }

      let dlcStr = Object.entries(parts)
        .filter(([, count]) => count > 0)
        .map(([key, count]) => `${key}<sub>${count}</sub>`)
        .join('')

      if (nrbcCount > 0) {
        dlcStr += ` nRBCs ${nrbcCount}/${this.targetCount} WBCs`
      }

      return dlcStr
    },
  },
  methods: {
    resetCounts() {
      const resetData = Object.fromEntries(Object.keys(this.dlcData).map(key => [key, 0]));
      this.$emit('update:dlcData', resetData);
    },
    handleCellClick(cell: string) {
      const currentCount = this.dlcData[cell] || 0
      let newCount = currentCount

      if (this.isDecreaseMode) {
        if (currentCount > 0) {
          newCount = currentCount - 1
        }
      } else {
        if (cell === 'nRBC' || this.totalCount < this.targetCount) {
          newCount = currentCount + 1
        }
      }

      this.$emit('update:dlcData', { ...this.dlcData, [cell]: newCount })
    },
    getIconStyle(atlasKey: string) {
      const frame = this.atlas.frames[atlasKey as keyof typeof this.atlas.frames]
      if (!frame) return {}
      const scale = 80 / frame.width // 80 is the cell-icon width/height
      return {
        backgroundImage: `url(${bloodCellsImg})`,
        backgroundPosition: `-${frame.x * scale}px -${frame.y * scale}px`,
        backgroundSize: `${this.atlas.image_width * scale}px ${this.atlas.image_height * scale}px`,
      }
    },
    getNormalizedCounts(): Record<string, number> {
      const wbcCounts = Object.entries(this.dlcData)
        .filter(([key]) => key !== 'nRBC')
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as Record<string, number>)

      const totalWbc = Object.values(wbcCounts).reduce((s, c) => s + c, 0)
      if (totalWbc === 0) return {}

      const percentages = Object.entries(wbcCounts).map(([key, count]) => ({
        key,
        percent: (count / totalWbc) * 100,
      }))

      const rounded = percentages.map((p) => ({
        ...p,
        floor: Math.floor(p.percent),
        remainder: p.percent - Math.floor(p.percent),
      }))

      let sumOfFloors = rounded.reduce((s, r) => s + r.floor, 0)
      rounded.sort((a, b) => b.remainder - a.remainder)

      let i = 0
      while (sumOfFloors < 100) {
        rounded[i % rounded.length]!.floor++
        sumOfFloors++
        i++
      }

      return rounded.reduce((acc, r) => ({ ...acc, [r.key]: r.floor }), {})
    },
  },
})
</script>

<style scoped>
.dlc-section-box {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
  background-color: var(--bg-dark);
}

.dlc-section-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: var(--bg-dark);
  color: var(--accent2);
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.dlc-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dlc-input {
  width: 80px;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 0.5rem;
}

.reset-button {
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.reset-button:hover {
  background-color: var(--accent-hover);
}

.total-display {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--accent2);
}

.nrbc-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.nrbc-cell {
  width: 120px;
}

.separator {
  border: none;
  border-top: 1px solid var(--accent);
  margin: 1rem 0;
}

.dlc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.dlc-cell {
  background-color: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  border: 1px solid var(--bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dlc-cell:hover {
  transform: translateY(-3px);
  background-color: var(--accent-hover);
}

.cell-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
  image-rendering: pixelated;
}

.cell-name {
  font-weight: 500;
}

.cell-count {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent2);
  margin-top: 0.5rem;
  display: block;
}

.dlc-summary {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--accent);
}

.summary-label {
  font-weight: 600;
  color: var(--accent2);
  margin-bottom: 0.5rem;
}

.summary-string {
  font-size: 1.1rem;
  font-family: monospace;
}

/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--accent);
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #ccc;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.slider.round { border-radius: 28px; }
.slider.round:before { border-radius: 50%; }
</style>

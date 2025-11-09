<template>
  <div class="myelogram-section-box">
    <div class="myelogram-section-label">Myelogram</div>
    <div class="myelogram-controls">
      <div class="control-item">
        <label for="myelogram-target">Target:</label>
        <input
          type="number"
          id="myelogram-target"
          v-model.number="targetCount"
          class="myelogram-input"
        />
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
    <div class="myelogram-grid">
      <div
        v-for="cell in wbcTypes"
        :key="cell.name"
        class="myelogram-cell"
        @pointerdown="handleCellClick(cell.name)"
      >
        <div class="cell-icon" :style="getIconStyle(cell.atlas_key)"></div>
        <div class="cell-name">{{ cell.name }}</div>
        <div class="cell-count">{{ myelogramData[cell.name] || 0 }}</div>
      </div>
    </div>

    <div v-if="totalCount === targetCount" class="myelogram-summary">
      <div class="summary-item">
        <div class="summary-label">M:E Ratio:</div>
        <div class="summary-value">{{ meRatio }}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Differential Count:</div>
        <div class="summary-string" v-html="differentialString"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import atlasData from '../../../public/images/at_guide.json'
import type { CellType } from '../../types'

const cellTypes: CellType[] = [
  {
    name: 'Erythroid',
    atlas_key: 'erythroid',
    granulocyte: false,
    vibrate_pattern: [100, 100, 50],
  },
  {
    name: 'Myeloblast',
    atlas_key: 'myeloblast',
    granulocyte: false,
    vibrate_pattern: [300, 100, 250],
  },
  {
    name: 'Promyelocyte',
    atlas_key: 'promyelocyte',
    granulocyte: false,
    vibrate_pattern: [200, 100, 50],
  },
  {
    name: 'Myelocyte',
    atlas_key: 'myelocyte',
    granulocyte: false,
    vibrate_pattern: [100, 150, 50],
  },
  {
    name: 'Metamyelocyte',
    atlas_key: 'metamyelocyte',
    granulocyte: true,
    vibrate_pattern: [400, 150, 50],
  },
  {
    name: 'Band Form',
    atlas_key: 'band',
    granulocyte: true,
    vibrate_pattern: [100, 100, 100],
  },
  {
    name: 'Neutrophil',
    atlas_key: 'neutrophil',
    granulocyte: true,
    vibrate_pattern: [150, 0, 0],
  },
  {
    name: 'Lymphocyte',
    atlas_key: 'lymphocyte',
    granulocyte: false,
    vibrate_pattern: [150, 150, 50],
  },
  {
    name: 'Monocyte',
    atlas_key: 'monocyte',
    granulocyte: false,
    vibrate_pattern: [150, 50, 150],
  },
  {
    name: 'Eosinophil',
    atlas_key: 'eosinophil',
    granulocyte: true,
    vibrate_pattern: [350, 50, 50],
  },
  {
    name: 'Basophil',
    atlas_key: 'basophil',
    granulocyte: true,
    vibrate_pattern: [450],
  },
  {
    name: 'Plasma Cell',
    atlas_key: 'plasma_cell',
    granulocyte: false,
    vibrate_pattern: [100, 100, 100],
  },
  {
    name: 'Atypical',
    atlas_key: 'myeloblast',
    granulocyte: false,
    vibrate_pattern: [400, 100, 200],
  },
]

export default defineComponent({
  name: 'Myelogram',
  props: {
    myelogramData: {
      type: Object as () => Record<string, number>,
      required: true,
    },
  },
  emits: ['update:myelogramData'],
  data() {
    return {
      targetCount: 100,
      isDecreaseMode: false,
      nRbcType: cellTypes.find((c) => c.name === 'nRBC')!,
      wbcTypes: cellTypes.filter((c) => c.name !== 'nRBC'),
      atlas: atlasData,
      granulocyteSound: null as HTMLAudioElement | null,
      agranulocyteSound: null as HTMLAudioElement | null,
    }
  },
  mounted() {
    this.granulocyteSound = new Audio('sounds/granulocyte.wav')
    this.agranulocyteSound = new Audio('sounds/agranulocyte.wav')
  },
  computed: {
    totalCount(): number {
      return Object.entries(this.myelogramData)
        .filter(([key]) => key !== 'nRBC')
        .reduce((sum, [, count]) => sum + count, 0)
    },
    myeloidSeries(): string[] {
      return [
        'Myeloblast',
        'Promyelocyte',
        'Myelocyte',
        'Metamyelocyte',
        'Band Form',
        'Neutrophil',
        'Eosinophil',
        'Basophil',
      ]
    },
    erythroidSeries(): string[] {
      return ['Erythroid']
    },
    myeloidCount(): number {
      return this.myeloidSeries.reduce((sum, cell) => sum + (this.myelogramData[cell] || 0), 0)
    },
    erythroidCount(): number {
      return this.erythroidSeries.reduce((sum, cell) => sum + (this.myelogramData[cell] || 0), 0)
    },
    meRatio(): string {
      if (this.erythroidCount > 0) {
        return (this.myeloidCount / this.erythroidCount).toFixed(2)
      }
      return 'N/A'
    },
    differentialString(): string {
      if (this.totalCount !== this.targetCount) return ''

      const normalized = this.getNormalizedCounts()
      const nrbcCount = this.myelogramData.nRBC || 0

      const parts = {
        Ery: normalized.Erythroid || 0,
        Blast: normalized.Myeloblast || 0,
        Pro: normalized.Promyelocyte || 0,
        Myelo: normalized.Myelocyte || 0,
        MetaMyelo: normalized.Metamyelocyte || 0,
        Band: normalized['Band Form'] || 0,
        N: normalized.Neutrophil || 0,
        L: normalized.Lymphocyte || 0,
        M: normalized.Monocyte || 0,
        E: normalized.Eosinophil || 0,
        B: normalized.Basophil || 0,
        Plasma: normalized['Plasma Cell'] || 0,
        Atypical: normalized.Atypical || 0,
      }

      let diffStr = Object.entries(parts)
        .filter(([, count]) => count > 0)
        .map(([key, count]) => `${key}<sub>${count}</sub>`)
        .join('')

      if (nrbcCount > 0) {
        diffStr += ` nRBCs ${nrbcCount}/${this.targetCount} WBCs`
      }

      return diffStr
    },
  },
  methods: {
    resetCounts() {
      const resetData = Object.fromEntries(Object.keys(this.myelogramData).map((key) => [key, 0]))
      this.$emit('update:myelogramData', resetData)
    },
    handleCellClick(cellName: string) {
      const currentCount = this.myelogramData[cellName] || 0
      let newCount = currentCount

      if (this.isDecreaseMode) {
        if (currentCount > 0) {
          newCount = currentCount - 1
        }
      } else if (cellName === 'nRBC' || this.totalCount < this.targetCount) {
        newCount = currentCount + 1
      }

      if (newCount !== currentCount) {
        this.$emit('update:myelogramData', { ...this.myelogramData, [cellName]: newCount })

        if (!this.isDecreaseMode) {
          const cellInfo = this.getCellInfo(cellName)
          if (!cellInfo) return

          this.playSound(cellInfo)
          this.vibrate(cellInfo)
        }
      }
    },
    getCellInfo(cellName: string) {
      return cellTypes.find((c) => c.name === cellName)
    },
    playSound(cellInfo: CellType) {
      if (cellInfo.name === 'nRBC') return

      const sound = cellInfo.granulocyte ? this.granulocyteSound : this.agranulocyteSound
      if (sound) {
        sound.currentTime = 0
        sound.play()
      }
    },
    vibrate(cellInfo: CellType) {
      if ('vibrate' in navigator) {
        if (this.totalCount === this.targetCount) {
          navigator.vibrate([100, 50, 100, 50, 200])
        } else if (cellInfo.vibrate_pattern) {
          navigator.vibrate(cellInfo.vibrate_pattern)
        }
      }
    },
    getIconStyle(atlasKey: string) {
      const frame = this.atlas.frames[atlasKey as keyof typeof this.atlas.frames]
      if (!frame) return {}
      const scale = 80 / frame.width // 80 is the cell-icon width/height
      return {
        backgroundImage: 'url(images/blood_cells.png)',
        backgroundPosition: `-${frame.x * scale}px -${frame.y * scale}px`,
        backgroundSize: `${this.atlas.image_width * scale}px ${this.atlas.image_height * scale}px`,
      }
    },
    getNormalizedCounts(): Record<string, number> {
      const wbcCounts = Object.entries(this.myelogramData)
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
.myelogram-section-box {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
  background-color: var(--bg-dark);
}

.myelogram-section-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: var(--bg-dark);
  color: var(--accent2);
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.myelogram-controls {
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

.myelogram-input {
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

.myelogram-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.myelogram-cell {
  background-color: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  border: 1px solid var(--bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.myelogram-cell:hover {
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

.myelogram-summary {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--accent);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.summary-item {
  text-align: center;
}

.summary-label {
  font-weight: 600;
  color: var(--accent2);
  margin-bottom: 0.5rem;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent2);
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
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #ccc;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.slider.round {
  border-radius: 28px;
}
.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 600px) {
  .myelogram-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }

  .cell-icon {
    width: 80px;
    height: 80px;
  }

  .myelogram-cell {
    padding: 0.1rem;
    font-size: 0.7rem;
  }
}
</style>

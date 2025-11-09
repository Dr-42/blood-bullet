<template>
  <div class="details-section-box">
    <div class="details-section-label">Aspirate Studies</div>
    <div class="grid-container">
      <div class="form-group">
        <label for="adequacy">Adequacy</label>
        <select id="adequacy" :value="aspirate.adequacy" @input="update('adequacy', $event)">
          <option>Adequate</option>
          <option>Inadequate</option>
        </select>
      </div>
      <div class="form-group">
        <label for="particulate">Particulate</label>
        <select id="particulate" :value="aspirate.particulate" @input="update('particulate', $event)">
          <option>Particulate</option>
          <option>Diluted</option>
        </select>
      </div>
    </div>

    <div class="subsection-label">Hematopoietic Lineages</div>
    <div class="grid-container">
      <div class="form-group">
        <label for="erythroid">Erythroid Lineage</label>
        <input
          type="text"
          id="erythroid"
          :value="aspirate.lineages.erythroid"
          @input="updateLineage('erythroid', $event)"
        />
      </div>
      <div class="form-group">
        <label for="myeloid">Myeloid Lineage</label>
        <input
          type="text"
          id="myeloid"
          :value="aspirate.lineages.myeloid"
          @input="updateLineage('myeloid', $event)"
        />
      </div>
      <div class="form-group">
        <label for="megakaryocytic">Megakaryocytic Lineage</label>
        <input
          type="text"
          id="megakaryocytic"
          :value="aspirate.lineages.megakaryocytic"
          @input="updateLineage('megakaryocytic', $event)"
        />
      </div>
    </div>

    <myelogram-view v-model:myelogramData="aspirate.myelogram" />

    <div class="form-group">
      <label for="additional-notes">Additional Notes</label>
      <textarea
        id="additional-notes"
        :value="aspirate.additionalNotes"
        @input="update('additionalNotes', $event)"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import MyelogramView from './Myelogram.vue'
import type { Aspirate } from '../../types'

export default defineComponent({
  name: 'AspirateView',
  components: {
    MyelogramView,
  },
  props: {
    aspirate: {
      type: Object as PropType<Aspirate>,
      required: true,
    },
  },
  emits: ['update:aspirate'],
  methods: {
    update(key: keyof Aspirate, event: Event) {
      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      this.$emit('update:aspirate', { ...this.aspirate, [key]: target.value })
    },
    updateLineage(lineage: 'erythroid' | 'myeloid' | 'megakaryocytic', event: Event) {
      const target = event.target as HTMLInputElement
      const value = target.value
      this.$emit('update:aspirate', {
        ...this.aspirate,
        lineages: {
          ...this.aspirate.lineages,
          [lineage]: value,
        },
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

.subsection-label {
  font-weight: 600;
  color: var(--accent2);
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

input,
select,
textarea {
  background-color: var(--bg);
  color: var(--text-color);
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
}

textarea {
  min-height: 80px;
  resize: vertical;
}
</style>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <h2>Manual Count</h2>
      <div class="form-grid">
        <div v-for="i in 10" :key="i" class="form-group">
          <label :for="`field-${i}`">Field {{ i }}</label>
          <input
            type="number"
            :id="`field-${i}`"
            v-model.number="counts[i - 1]"
            min="0"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="factor">Factor</label>
        <input type="number" id="factor" v-model.number="factor" min="0" />
      </div>
      <div class="total-count">
        <strong>Total:</strong> {{ totalCount }}
      </div>
      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
        <button type="button" class="submit-btn" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManualCountModal',
  props: {
    defaultFactor: {
      type: Number,
      required: true,
    },
  },
  emits: ['close', 'save'],
  data() {
    return {
      counts: Array(10).fill(0),
      factor: this.defaultFactor,
    }
  },
  computed: {
    totalCount(): number {
      const sum = this.counts.reduce((acc, count) => acc + count, 0)
      return (sum / 10) * this.factor
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    save() {
      this.$emit('save', this.totalCount)
    },
  },
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal {
  color: #e2e2e2;
  background-color: var(--bg);
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  margin: 2.5%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: var(--bg-dark);
  color: white;
  font-size: 16px;
}

.total-count {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1rem;
}

.cancel-btn, .submit-btn {
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: var(--accent2);
  color: white;
}

.submit-btn {
  background-color: var(--accent);
  color: white;
}
</style>

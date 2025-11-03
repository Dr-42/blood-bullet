<template>
  <div class="details-section-box">
    <div class="details-section-label">Special Stains</div>
    <div class="details-grid">
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">MPO:</div>
        <input
          type="text"
          class="details-input"
          :value="specialStains.mpo"
          @input="update('mpo', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">SBB:</div>
        <input
          type="text"
          class="details-input"
          :value="specialStains.sbb"
          @input="update('sbb', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="details-item" :style="{ borderLeftColor: 'var(--accent)' }">
        <div class="property-name">PAS:</div>
        <input
          type="text"
          class="details-input"
          :value="specialStains.pas"
          @input="update('pas', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <div v-for="(stain, index) in specialStains.others" :key="index" class="details-item" :style="{ borderLeftColor: 'var(--accent2)' }">
        <div class="property-name">{{ stain.name }}:</div>
        <input
          type="text"
          class="details-input"
          :value="stain.value"
          @input="updateOther(index, 'value', ($event.target as HTMLInputElement).value)"
        />
        <button class="remove-btn" @click="removeOther(index)">Remove</button>
      </div>
    </div>
    <div class="add-other-container">
      <input
        type="text"
        class="details-input"
        v-model="newStainName"
        placeholder="Enter new stain name"
      />
      <button class="add-btn" @click="addOther">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SpecialStainsView',
  props: {
    specialStains: {
      type: Object as () => any,
      required: true,
    },
  },
  emits: ['update:specialStains'],
  data() {
    return {
      newStainName: '',
    }
  },
  methods: {
    update(key: string, value: any) {
      this.$emit('update:specialStains', { ...this.specialStains, [key]: value })
    },
    addOther() {
      if (this.newStainName.trim() !== '') {
        const others = [...this.specialStains.others, { name: this.newStainName, value: '' }]
        this.$emit('update:specialStains', { ...this.specialStains, others })
        this.newStainName = ''
      }
    },
    removeOther(index: number) {
      const others = [...this.specialStains.others]
      others.splice(index, 1)
      this.$emit('update:specialStains', { ...this.specialStains, others })
    },
    updateOther(index: number, key: string, value: any) {
      const others = [...this.specialStains.others]
      others[index] = { ...others[index], [key]: value }
      this.$emit('update:specialStains', { ...this.specialStains, others })
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

.add-other-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.add-btn, .remove-btn {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover, .remove-btn:hover {
  background-color: var(--accent-hover);
}
</style>

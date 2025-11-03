<template>
  <div class="error">
    <div class="error-content">
      {{ errorString }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorDisplay',
  props: {
    errorText: String,
  },
  computed: {
    errorString(): string {
      //Check if ServerError key is present
      if (this.errorText) {
        return `Server Error: ${this.errorText}`
      } else {
        return 'An unknown error has occurred.'
      }
    },
  },
})
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: rgba(30, 0, 0, 0.5);
  z-index: 1000;
}

.error-content {
  padding: 10px;
  width: 80%;
  background-color: #aa0011;
  color: #ffbbbb;
  font-size: 12px;
  border-radius: 5px;
}
</style>

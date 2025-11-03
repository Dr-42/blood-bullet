<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2 class="modal-title">OCR Result</h2>
      <textarea class="ocr-text" readonly>{{ ocrText }}</textarea>
      <div class="modal-actions">
        <button class="action-btn" @click="copyToClipboard">Copy to Clipboard</button>
        <button class="close-btn" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'OcrResultModal',
  emits: ['close'],
  props: {
    ocrText: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.ocrText).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard.');
      });
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal {
  background: var(--bg);
  color: #e2e2e2;
  border-radius: 10px;
  padding: 20px;
  margin: 2.5%;
  width: 90%;
  max-width: 600px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 1.5em;
  margin-bottom: 15px;
  text-align: center;
}

.ocr-text {
  width: 100%;
  height: 300px;
  background-color: var(--bg-dark);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--accent);
  border-radius: 5px;
  padding: 10px;
  font-family: monospace;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.action-btn, .close-btn {
  background: var(--accent);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-btn:hover, .close-btn:hover {
  background: var(--accent-hover);
}
</style>

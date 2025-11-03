<template>
  <div class="coulter-section-box">
    <div v-if="ocrLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <div>Processing...</div>
    </div>
    <div class="coulter-section-label">Coulter Results</div>
    <button class="scan-button" @click="openFilePicker">Scan Report</button>
    <input
      type="file"
      ref="fileInput"
      @change="handleImageUpload"
      accept="image/*"
      style="display: none"
    />
    <div class="coulter-grid">
      <div
        v-for="(property, index) in coulterProperties"
        :key="property"
        class="coulter-item"
        :style="{ borderLeftColor: getBorderColor(index) }"
      >
        <div class="property-name">{{ property }}</div>
        <input
          type="number"
          class="coulter-input"
          :value="coulterData[property]"
          @input="formatAndEmit(property, ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tesseract from 'tesseract.js'

export default defineComponent({
  name: 'CoulterView',
  props: {
    coulterData: {
      type: Object as () => Record<string, string>,
      required: true,
    },
  },
  emits: ['update:coulterData'],
  data() {
    return {
      ocrLoading: false,
      coulterProperties: [
        'WBC',
        'Neu#',
        'Lym#',
        'Mon#',
        'Eos#',
        'Bas#',
        'Neu%',
        'Lym%',
        'Mon%',
        'Eos%',
        'Bas%',
        'RBC',
        'HGB',
        'HCT',
        'MCV',
        'MCH',
        'MCHC',
        'RDW-CV',
        'RDW-SD',
        'PLT',
        'MPV',
        'PDW',
        'PCT',
        'P-LCC',
        'P-LCR',
        'RET#',
        'RET%',
        'IRF',
        'LFR',
        'MFR',
        'HFR',
        'IMG#',
        'IMG%',
        'IPF',
        'RHE',
      ],
      paletteColors: ['--accent', '--accent2', '--accent-hover', '--disabled-color'],
    }
  },
  methods: {
    getBorderColor(index: number) {
      return `var(${this.paletteColors[index % this.paletteColors.length]})`
    },
    formatAndEmit(property: string, value: string) {
      let formattedValue: string = value.trim()

      if (formattedValue === '') {
        this.$emit('update:coulterData', { ...this.coulterData, [property]: formattedValue })
        return
      }

      const num = parseFloat(formattedValue)
      if (!isNaN(num)) {
        formattedValue = num
      } else {
        formattedValue = this.coulterData[property] || ''
      }

      this.$emit('update:coulterData', { ...this.coulterData, [property]: formattedValue })
    },
    openFilePicker() {
      ;(this.$refs.fileInput as HTMLInputElement).click()
    },
    handleImageUpload(event: Event) {
      const input = event.target as HTMLInputElement
      if (input.files && input.files[0]) {
        const file = input.files[0]
        this.ocrLoading = true

        Tesseract.recognize(file, 'eng', {
          logger: (m) => console.log(m),
        })
          .then(({ data: { text } }) => {
            this.callGeminiApi(text)
          })
          .catch((err) => {
            this.ocrLoading = false
            console.error(err)
            alert('OCR failed. Please try again.')
          })
      }
    },
    async callGeminiApi(ocrText: string) {
      const apiKey = localStorage.getItem('geminiApiKey')
      if (!apiKey) {
        alert('Gemini API Key not found. Please set it in the settings.')
        this.ocrLoading = false
        return
      }

      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`

      const prompt = `
        Given the following text from a Coulter report, parse it and extract the values for the hematology parameters.
        The output should be a valid JSON object. The keys of the JSON should be the parameter names and fit the following data structure:
        {
          "WBC": "", "Neu#": "", "Lym#": "", "Mon#": "", "Eos#": "", "Bas#": "", "Neu%": "", "Lym%": "", "Mon%": "", "Eos%": "", "Bas%": "", "RBC": "", "HGB": "", "HCT": "", "MCV": "", "MCH": "", "MCHC": "", "RDW-CV": "", "RDW-SD": "", "PLT": "", "MPV": "", "PDW": "", "PCT": "", "P-LCC": "", "P-LCR": "", "RET#": "", "RET%": "", "IRF": "", "LFR": "", "MFR": "", "HFR": "", "IMG#": "", "IMG%": "", "IPF": "", "RHE": ""
        }
        The values should be the numeric values as strings.
        If a value is not found for a parameter, the value should be -1. Give special emphasis on decimals and percentages. The accuracy of the values is critical.
        Here is the text:
        ---
        ${ocrText}
        ---
      `

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const responseData = await response.json()
        const jsonString = responseData.candidates[0].content.parts[0].text
          .replace(/\`\`\`json|\`\`\`/g, '')
          .trim()
        const parsedData = JSON.parse(jsonString)

        const updatedCoulterData = { ...this.coulterData, ...parsedData }
        this.$emit('update:coulterData', updatedCoulterData)
      } catch (error) {
        console.error('Error calling Gemini API:', error)
        alert('Failed to parse the report using Gemini API. Please check the console for details.')
      } finally {
        this.ocrLoading = false
      }
    },
  },
})
</script>

<style scoped>
.coulter-section-box {
  position: relative;
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-top: 2rem;
  background-color: var(--bg-dark);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  color: white;
  border-radius: 10px;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--accent);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.coulter-section-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: var(--bg-dark);
  color: var(--accent2);
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.scan-button {
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s ease;
}

.scan-button:hover {
  background-color: var(--accent-hover);
}

.coulter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.coulter-item {
  background-color: var(--bg-dark);
  border-radius: 8px;
  padding: 1rem;
  border-left: 5px solid;
  transition: transform 0.2s ease;
}

.coulter-item:hover {
  transform: translateY(-3px);
}

.property-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent2);
  margin-bottom: 0.5rem;
  display: block;
}

.coulter-input {
  width: 100%;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  border: 1px solid var(--bg);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.coulter-input:focus {
  outline: none;
  border-color: var(--accent-hover);
}

@media (max-width: 600px) {
  .coulter-grid {
    grid-template-columns: repeat(3, minmax(60px, 1fr));
  }
}
</style>

<template>
  <div class="tools-view">
    <component :is="toolComponent" v-bind="toolProps" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import DlcCounter from '../components/subviews/DlcCounter.vue'
import Myelogram from '../components/subviews/Myelogram.vue'
import WbcMorphologyView from '../components/subviews/WbcMorphologyView.vue'
import PlateletMorphologyView from '../components/subviews/PlateletMorphologyView.vue'

export default defineComponent({
  name: 'ToolsView',
  components: {
    DlcCounter,
    Myelogram,
    WbcMorphologyView,
    PlateletMorphologyView,
  },
  setup() {
    const route = useRoute()

    const dlcData = ref({})
    const myelogramData = ref({})
    const wbcMorphology = ref({ Notes: '' })
    const plateletMorphology = ref({ Notes: '' })

    const toolComponent = computed(() => {
      switch (route.params.toolName) {
        case 'dlc':
          return 'DlcCounter'
        case 'myelogram':
          return 'Myelogram'
        case 'manual-wbc-count':
          return 'WbcMorphologyView'
        case 'manual-platelet-count':
          return 'PlateletMorphologyView'
        default:
          return null
      }
    })

    const toolProps = computed(() => {
      switch (route.params.toolName) {
        case 'dlc':
          return { dlcData: dlcData.value, 'onUpdate:dlcData': (data: any) => dlcData.value = data }
        case 'myelogram':
          return { myelogramData: myelogramData.value, 'onUpdate:myelogramData': (data: any) => myelogramData.value = data }
        case 'manual-wbc-count':
          return { wbcMorphology: wbcMorphology.value, 'onUpdate:wbcMorphology': (data: any) => wbcMorphology.value = data }
        case 'manual-platelet-count':
          return { plateletMorphology: plateletMorphology.value, 'onUpdate:plateletMorphology': (data: any) => plateletMorphology.value = data }
        default:
          return {}
      }
    })

    return {
      toolComponent,
      toolProps,
    }
  },
})
</script>

<style scoped>
.tools-view {
  padding: 2rem;
  background-color: var(--bg);
  color: var(--text-color, #e2e2e2);
  height: 100%;
}
</style>

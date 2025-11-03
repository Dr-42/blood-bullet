<template>
  <div class="home">
    <error-display v-if="error" :errorText="errorText" />
    <div id="loading" v-if="loading">
      <loading-spinner />
    </div>
    <div id="content" v-else>
      <h1>Welcome to the Home Page</h1>
    </div>
    <!-- Floating Action Buttons -->
    <div class="floating-buttons">
      <button class="fab" @click="saveCase()" title="Save Case">
        <content-save-all-icon />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import ErrorDisplay from '../components/subviews/ErrorDisplay.vue'
import LoadingSpinner from '../components/subviews/LoadingSpinner.vue'

import ContentSaveAllIcon from 'vue-material-design-icons/ContentSaveAll.vue'

export default {
  components: {
    ErrorDisplay,
    LoadingSpinner,
    ContentSaveAllIcon,
  },

  data() {
    return {
      loading: false,
      error: false,
      errorText: '',
    }
  },
  methods: {
    saveCase() {
      // Implement save case functionality here
      console.log('Save Case button clicked')
    },
  },
}
</script>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--bg);
  margin: 0;
  height: calc(100vh - 50px);
  color: var(--accent2);
  padding: 0;
}
.floating-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 15;
}

.fab {
  background-color: var(--accent);
  color: white;
  border: 2px solid var(--accent2);
  border-radius: 25%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px var(--bg-dark);
  cursor: pointer;
  outline: none;
}

.fab:hover {
  background-color: var(--accent-hover);
}

.fab svg {
  width: 24px;
  height: 24px;
}

/* Vertical orientation */
@media (orientation: portrait) {
  #content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 50px);
  }

  #loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - (50px + 10vh));
    background-color: var(--bg);
    z-index: 3;
  }
}

/* Horizontal orientation */
@media (orientation: landscape) {
  #content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  #loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - (50px + 10vh));
    background-color: var(--bg);
    z-index: 3;
  }
}
</style>

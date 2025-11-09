<template>
  <aside class="aside" :class="{ open: isOpen }">
    <div>
      <div class="title">Blood Bullet</div>
      <ul class="nav-links">
        <li @click="closeMenu">
          <router-link to="/"> <home-icon class="aside-icon" /> Home </router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/routine">
            <file-document-icon class="aside-icon" /> Routine
          </router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/special-studies">
            <file-document-icon class="aside-icon" /> Special Studies
          </router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/marrow-studies">
            <file-document-icon class="aside-icon" /> Marrow Studies
          </router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/previous-cases">
            <folder-open-icon class="aside-icon" /> Previous Cases
          </router-link>
        </li>
      </ul>
    </div>
    <div>
      <div class="title">Tools</div>
      <ul class="nav-links">
        <li @click="closeMenu">
          <router-link to="/tools/dlc"> <file-document-icon class="aside-icon" /> DLC </router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/tools/myelogram"> <file-document-icon class="aside-icon" /> Myelogram </router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/tools/manual-wbc-count"> <file-document-icon class="aside-icon" /> Manual WBC Count </router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/tools/manual-platelet-count"> <file-document-icon class="aside-icon" /> Manual Platelet Count </router-link>
        </li>
      </ul>
    </div>
    <ul class="footer-links">
      <li @click="openModal('about')">
        <a href="javascript:void(0)"> <info-icon class="aside-icon" /> About </a>
      </li>
      <li @click="openModal('license')">
        <a href="javascript:void(0)"> <license-icon class="aside-icon" /> License </a>
      </li>
    </ul>

    <info-modal
      v-if="modalContent"
      :title="modalContent.title"
      :content="modalContent.body"
      @close="modalContent = null"
    />
  </aside>
</template>

<script lang="ts">
import HomeIcon from 'vue-material-design-icons/Home.vue'
import InfoIcon from 'vue-material-design-icons/Information.vue'
import LicenseIcon from 'vue-material-design-icons/Certificate.vue'
import FileDocumentIcon from 'vue-material-design-icons/FileDocument.vue'
import FolderOpenIcon from 'vue-material-design-icons/FolderOpen.vue'

import InfoModal from '../modals/InfoModal.vue'

type ModalContent = {
  title: string
  body: string
}

export default {
  name: 'AsideMenu',
  components: {
    InfoModal,

    HomeIcon,
    InfoIcon,
    LicenseIcon,
    FileDocumentIcon,
    FolderOpenIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      modalContent: null as ModalContent | null,
    }
  },
  methods: {
    closeMenu() {
      this.$emit('closeAside')
    },
    openModal(type: string) {
      const contentMap: Record<string, { title: string; body: string }> = {
        about: {
          title: 'About',
          body: 'Blood Bullet is an open-source application designed for blood analysis case recording',
        },
        license: {
          title: 'License',
          body: 'This application is licensed under the BSD-2-Clause license.',
        },
      }
      if (type in contentMap) {
        this.modalContent = contentMap[type]!
      } else {
        this.modalContent = {
          title: 'Error',
          body: 'Content not found.',
        }
      }
    },
  },
}
</script>

<style scoped>
.aside {
  background-color: var(--bg);
  color: white;
  width: 200px;
  position: fixed;
  top: 0;
  left: -200px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  transition: left 0.3s ease;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  background-color: var(--accent);
  color: #e2e2e2;
  padding: 20px 0;
}

.aside.open {
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
}

.aside-icon {
  margin-right: 10px;
  margin-left: 5px;
  color: #e2e2e2;
}

.nav-links,
.footer-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li,
.footer-links li {
  margin: 10px 0;
}

.nav-links a,
.footer-links a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-links a svg,
.footer-links a svg {
  margin-right: 10px;
}
</style>

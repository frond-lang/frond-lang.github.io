<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Github, Menu } from 'lucide-vue-next'
const logoUrl = 'https://github.com/frond-lang/assets/blob/main/logo.png?raw=true'

const navOpen = ref(false)

function toggleNav() {
  navOpen.value = !navOpen.value
}

function closeNav() {
  navOpen.value = false
}

function handleScroll() {
  closeNav()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="frond-nav">
    <div class="frond-container frond-nav-inner">
      <RouterLink to="/" class="frond-brand" @click="closeNav">
        <img :src="logoUrl" alt="Frond logo" height="28" />
        <span>Frond</span>
      </RouterLink>
      <div class="frond-nav-links" :class="{ open: navOpen }">
        <RouterLink to="/#features" @click="closeNav">Features</RouterLink>
        <RouterLink to="/#quick-start" @click="closeNav">Quick Start</RouterLink>
        <RouterLink to="/tutorial" @click="closeNav">Tutorial</RouterLink>
        <RouterLink to="/#tour" @click="closeNav">Tour</RouterLink>
        <RouterLink to="/#cli" @click="closeNav">CLI</RouterLink>
      </div>
      <div class="frond-nav-actions">
        <a
          href="https://github.com/frond-lang/Frond"
          class="frond-nav-github"
          aria-label="GitHub repository"
          target="_blank"
          rel="noopener"
        >
          <Github class="frond-nav-icon" />
        </a>
        <button
          class="frond-nav-hamburger"
          aria-label="Toggle navigation menu"
          type="button"
          @click="toggleNav"
        >
          <Menu class="frond-nav-icon" />
        </button>
      </div>
    </div>
  </nav>
</template>

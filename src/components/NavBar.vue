<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Github, Menu } from 'lucide-vue-next'
const logoUrl = 'https://github.com/kuzo-lang/assets/blob/main/logo.png?raw=true'

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
  <nav class="kuzo-nav">
    <div class="kuzo-container kuzo-nav-inner">
      <RouterLink to="/" class="kuzo-brand" @click="closeNav">
        <img :src="logoUrl" alt="Kuzo logo" height="28" />
        <span>Kuzo</span>
      </RouterLink>
      <div class="kuzo-nav-links" :class="{ open: navOpen }">
        <RouterLink to="/#features" @click="closeNav">Features</RouterLink>
        <RouterLink to="/#quick-start" @click="closeNav">Quick Start</RouterLink>
        <RouterLink to="/tutorial" @click="closeNav">Tutorial</RouterLink>
        <RouterLink to="/#tour" @click="closeNav">Tour</RouterLink>
        <RouterLink to="/#cli" @click="closeNav">CLI</RouterLink>
      </div>
      <div class="kuzo-nav-actions">
        <a
          href="https://github.com/kuzo-lang/Kuzo"
          class="kuzo-nav-github"
          aria-label="GitHub repository"
          target="_blank"
          rel="noopener"
        >
          <Github class="kuzo-nav-icon" />
        </a>
        <button
          class="kuzo-nav-hamburger"
          aria-label="Toggle navigation menu"
          type="button"
          @click="toggleNav"
        >
          <Menu class="kuzo-nav-icon" />
        </button>
      </div>
    </div>
  </nav>
</template>

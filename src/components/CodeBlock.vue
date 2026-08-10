<script setup lang="ts">
import { computed } from 'vue'
import { highlightKuzo } from '@/utils/highlight'

const props = defineProps<{
  code: string
  label?: string
}>()

const highlighted = computed(() => highlightKuzo(props.code))
</script>

<template>
  <div>
    <p v-if="label" class="kuzo-code-label">{{ label }}</p>
    <div class="kuzo-code-block">
      <pre><code v-html="highlighted"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { highlightFrond } from '@/utils/highlight'

const props = defineProps<{
  code: string
  label?: string
}>()

const highlighted = computed(() => highlightFrond(props.code))
</script>

<template>
  <div>
    <p v-if="label" class="frond-code-label">{{ label }}</p>
    <div class="frond-code-block">
      <pre><code v-html="highlighted"></code></pre>
    </div>
  </div>
</template>

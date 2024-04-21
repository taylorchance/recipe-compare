<script setup lang="ts">
import { parse } from 'tinyduration'

const props = defineProps<{
  duration: string
}>()

const durationObj = parse(props.duration)

const formatDuration = (duration) => {
  let formattedDuration = ''
  for (const [unit, value] of Object.entries(duration)) {
    if (value) {
      formattedDuration += `${value} ${unit}, `
    }
  }
  return formattedDuration.replace(/, $/, '')
}

const formattedDuration = formatDuration(durationObj)
</script>

<template>
  <p class="mt-2" style="white-space: nowrap;">
    <span class="icon">
      <i class="fa-regular fa-clock"></i>
    </span>
    {{ formattedDuration }}
  </p>
</template>
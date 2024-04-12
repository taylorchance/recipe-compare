<script setup lang="ts">
const props = defineProps<{
  parsed: IParsedIngedient;
  multiplier: number;
}>()

const { matches } = props.parsed
const wrapped = (string: string) => {
  const cleanString = string.replace(')', '')

  if (matches) {
    console.log('matches', matches[0])

    const regex = new RegExp(`\\b(${matches.join('|')})\\b`, 'gi')
    return cleanString.replace(regex, '<span>$1</span>')
  }
  return cleanString
}
</script>

<template>
  <p v-if="parsed" class="ingredient">
    <span v-if="parsed.quantity" class="quantity">
      {{ Math.round(parsed.quantity * multiplier * 100) / 100 }}
    </span>

    <span v-if="parsed.unit" class="unit">
      {{ parsed.unit }}
    </span>

    <span v-html="wrapped(parsed.ingredient)" class="ingredient"></span>
  </p>
</template>

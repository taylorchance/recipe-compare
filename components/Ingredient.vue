<script setup lang="ts">
const props = defineProps<{
  parsed: IParsedIngedient;
  multiplier: number;
}>()

const unit = ref<string>(props.parsed.unit)
const quantity = ref<number>(props.parsed.quantity)
const minQuantity = ref<number>(props.parsed.minQuantity)
const maxQuantity = ref<number>(props.parsed.maxQuantity)

const { ingredient, matches, partials } = props.parsed

const wrapped = (string: string) => {
  let cleanString = string.replace(')', '')
  if (matches) {
    const regex = new RegExp(`\\b(${matches.join('|')})\\b`, 'gi')
    cleanString = cleanString.replace(regex, '<span class="is-success">$1</span>')
  }
  if (partials) {
    const regex = new RegExp(`\\b(${partials.join('|')})\\b`, 'gi')
    cleanString = cleanString.replace(regex, '<span class="is-warning">$1</span>')
  }
  return cleanString
}
</script>

<template>
  <p class="ingredient">
    <span v-if="minQuantity < maxQuantity" class="quantity">
      {{ Math.round(minQuantity * multiplier * 100) / 100 }} to {{ Math.round(maxQuantity * multiplier * 100) / 100 }}
    </span>

    <span v-else-if="quantity" class="quantity">
      {{ Math.round(quantity * multiplier * 100) / 100 }}
    </span>

    <span v-if="unit" class="unit">
      {{ unit }}
    </span>

    <span v-html="wrapped(ingredient)" class="ingredient"></span>
  </p>
</template>

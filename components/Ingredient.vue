<script setup lang="ts">
const props = defineProps<{
  parsed: IParsedIngedient;
  multiplier: number;
  conversionTable: null | { [key: string]: string };
}>()

const { unit, quantity, minQuantity, maxQuantity, ingredient, matches, partials } = props.parsed

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

const getAmount = (amount: number): number => {
  let unitConversionAmount = amount
  if (props.conversionTable && props.conversionTable[unit] && props.conversionTable[props.parsed.unit] !== props.parsed.unit) {
    const { getConvertedAmount, getDensity } = useUnits()
    const density = getDensity(props.parsed.ingredient)
    unitConversionAmount = getConvertedAmount(amount, props.parsed.unit, props.conversionTable[props.parsed.unit], density)
  }
  return Math.round(unitConversionAmount * props.multiplier * 100) / 100
}

const getUnit = (unit: string): string => {
  if (props.conversionTable && props.conversionTable[unit] && props.conversionTable[unit] !== unit) {
    return props.conversionTable[unit]
  }
  return unit
}
</script>

<template>
  <p class="ingredient">
    <span v-if="minQuantity < maxQuantity" class="quantity">
      {{ getAmount(minQuantity) }} to {{ getAmount(maxQuantity) }}
    </span>
    <span v-else-if="quantity" class="quantity">
      {{ getAmount(quantity) }}
    </span>

    <span v-if="unit" class="unit">
      {{ getUnit(unit) }}
    </span>

    <span v-html="wrapped(ingredient)" class="ingredient"></span>
  </p>
</template>

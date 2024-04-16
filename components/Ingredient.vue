<script setup lang="ts">
const props = defineProps<{
  parsed: IParsedIngedient;
  multiplier: number;
  isMetric: boolean;
}>()

const unit = ref<string>(props.parsed.unit)
const quantity = ref<number>(props.parsed.quantity)
const minQuantity = ref<number>(props.parsed.minQuantity)
const maxQuantity = ref<number>(props.parsed.maxQuantity)

const { ingredient, matches } = props.parsed

const wrapped = (string: string) => {
  let cleanString = string.replace(')', '')
  if (matches) {
    const regex = new RegExp(`\\b(${matches.join('|')})\\b`, 'gi')
    return cleanString.replace(regex, '<span>$1</span>')
  }
  return cleanString
}

const poundsArr = ['lb', 'lbs', 'pound', 'pounds']
const cupsArr = ['cup', 'cups']

watch(() => props.isMetric, (isMetric) => {
  if (isMetric) {
    if (poundsArr.includes(unit.value)) {
      unit.value = 'g'
      quantity.value = quantity.value * 454
    }
    if (cupsArr.includes(unit.value)) {
      // const densityMatch = findMatches(ingredient, mappedFoodDensities)
      // console.log('densityMatch', densityMatch)
      
      // const density = foodDensities.find(food => food.name === densityMatch)

      const density = getDensity(ingredient)
      console.log('density', density)
      // density.unit = 'tits'
      // density.quantity = 555

      unit.value = density.unit
      quantity.value = quantity.value * density.density
      minQuantity.value = minQuantity.value * density.density
      maxQuantity.value = maxQuantity.value * density.density
    }
  } else {
    unit.value = props.parsed.unit
    quantity.value = props.parsed.quantity
    minQuantity.value = props.parsed.minQuantity
    maxQuantity.value = props.parsed.maxQuantity
  }
}, { immediate: true })
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

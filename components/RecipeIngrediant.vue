<script setup lang="ts">
import { parse } from 'ingredients-parser'

const props = defineProps<{
  ingredient: string,
  multiplier: number
}>()

const isChecked = ref(false)
const ingredientObj = parse(props.ingredient)

const extractedFraction = (string) => {
  const fractionRegex = /[\u00BC-\u00BE\u2150-\u215E]/
  const fractionMatch = string.match(fractionRegex)
  
  if (fractionMatch) {
    const fractionSymbol = fractionMatch[0]
    const fractions = { '½': 0.5, '⅓': 1/3, '⅔': 2/3, '¼': 0.25, '¾': 0.75, '⅕': 0.2, '⅖': 0.4, '⅗': 0.6, '⅘': 0.8, '⅙': 1/6, '⅚': 5/6, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875 }
    const decimalValue = fractions[fractionSymbol]
    const ingredient = string.replace(fractionRegex, '').trim()
    
    return { decimalValue, ingredient }
  } else {
    return { decimalValue: NaN, ingredient: string.trim() }
  }
}

const evaluateFraction = (fraction) => {
  if (fraction.includes(' ')) {
    const [whole, fractionPart] = fraction.split(' ')
    const [numerator, denominator] = fractionPart.split('/').map(Number)
    return Number(whole) + numerator / denominator
  } else if (fraction.includes('/')) {
    const [numerator, denominator] = fraction.split('/').map(Number)
    return numerator / denominator
  }
  return fraction
}

const amount = computed<number>(() => {
  let num
  if (!ingredientObj.amount) {
    const formattedIngrediant = extractedFraction(props.ingredient)
    ingredientObj.ingredient = formattedIngrediant.ingredient
    if (formattedIngrediant.decimalValue) {
      num = formattedIngrediant.decimalValue
    }
  } else {
    num = Number(ingredientObj.amount)
    if (isNaN(num)) {
      num = evaluateFraction(ingredientObj.amount)
    }
  }

  const multiplied = num * props.multiplier
  return Math.round(multiplied * 100) / 100
})
</script>

<template>
  <div class="ingredient" @click="isChecked = !isChecked">    
    <span class="icon is-size-5 mr-2 has-text-black">
      <i :class="`fa-regular fa-square${isChecked ? '-check' : ''}`"></i>
    </span>
    <span v-if="amount" class="has-text-weight-medium">{{ amount }}&nbsp;</span>
    <span v-else-if="ingredientObj.amount" class="has-text-weight-medium">{{ ingredientObj.amount }}&nbsp;</span>
    <span v-if="ingredientObj.unit">{{ ingredientObj.unit }}&nbsp;</span>
    <span>{{ ingredientObj.ingredient }}</span>
  </div> 
</template>

<style scoped>
.ingredient {
  padding: .75rem 0;
  cursor: pointer;
}

.ingredient + .ingredient {
  border-top: 1px solid var(--border);
}
</style>
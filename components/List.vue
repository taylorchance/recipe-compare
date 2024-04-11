<script setup lang="ts">
const props = defineProps<{
  list: string[];
}>()

import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

console.log('original', props.list)

const parsedIngredients = props.list.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})

console.log('parsedIngredients', parsedIngredients)

</script>

<template>
  <div>

    <Parse
      v-for="ingredient in parsedIngredients"
      :key="ingredient.ingredient"
      :parsed="ingredient"
    />
    
  </div>
</template>
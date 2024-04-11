<script setup lang="ts">
const props = defineProps<{
  list: string[];
}>()

import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const parsedIngredients = props.list.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})
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
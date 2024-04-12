<script setup lang="ts">
import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const route = useRoute()
const url1 = computed(() => route.query.url1 as string)
const url2 = computed(() => route.query.url2 as string)


// const { data: recipe1, pending, error } = await useAsyncData(
const { data: recipe1 } = await useAsyncData(
  'recipe1',
  () => $fetch('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: url1.value
    }
  })
)

const { data: recipe2 } = await useAsyncData(
  'recipe2',
  () => $fetch('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: url2.value
    }
  })
)

console.log('recipe1', recipe1.value)

const parsedIngredients1 = recipe1.value.recipeIngredient.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})

const parsedIngredients2 = recipe2.value.recipeIngredient.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})

// console.log('parsedIngredients1', parsedIngredients1)
// console.log('parsedIngredients2', parsedIngredients2)
</script>

<template>
  <section class="section">

    <Reorder :ingredients1="parsedIngredients1" :ingredients2="parsedIngredients2" />

  </section>
</template>

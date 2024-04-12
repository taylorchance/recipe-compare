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

const ingredients1 = recipe1.value.recipeIngredient.map(ingredient => 
  parseIngredient(ingredient, 'en')
)
console.log('ingredients1', ingredients1)

const ingredients2 = recipe2.value.recipeIngredient.map(ingredient => 
  parseIngredient(ingredient, 'en')
)

const findMatches = (arr1, arr2) => {
  let ignoreWords = ['chopped', 'red', 'white', ')', '(']

  arr1.forEach(item1 => {
    const wordsArray1 = item1.ingredient.toLowerCase().split(" ")
    arr2.forEach(item2 => {
      const wordsArray2 = item2.ingredient.toLowerCase().split(" ")
      // const intersection = wordsArray2.filter(word => wordsArray1.includes(word))
      const intersection = wordsArray2.filter(word => wordsArray1.includes(word) && !ignoreWords.includes(word))

      intersection.forEach(word => ignoreWords.push(word))

      if (intersection.length) {
        item1.matches = intersection
        item2.matches = intersection
      }
    })
  })

  return [arr1, arr2]
}

const [matchedIngredients1, matchedIngredients2] = findMatches(ingredients1, ingredients2)
</script>

<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <SortIngredients :recipe="recipe1" :ingredients="matchedIngredients1">
        </SortIngredients>
      </div>
      <div class="column">
        <SortIngredients :recipe="recipe2" :ingredients="matchedIngredients2">
        </SortIngredients>
      </div>
    </div>

  </section>
</template>
<script setup lang="ts">
const props = defineProps<{
  url: string,
  base: string[]
}>()

console.log('secondUrl', props.url)

const { data: recipe, pending, error } = await useAsyncData(
  'recipe2',
  () => $fetch('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: props.url
    }
  })
)

console.log('secondRecipe', recipe.value)
</script>

<template>
  <p v-for="ingredient in recipe.recipeIngredient" :key="ingredient" class="ingredient">
    {{ ingredient }}
  </p>
</template>

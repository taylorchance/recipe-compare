<script setup lang="ts">
const props = defineProps<{
  recipe: object;
  ingredients: object[];
}>()

const sortedList = props.ingredients.sort((a, b) => {
  const aMatchCount = !a.matches ? 0 : a.matches.reduce((total, string) => total + string.length, 0)
  const bMatchCount = !b.matches ? 0 : b.matches.reduce((total, string) => total + string.length, 0)
  return bMatchCount - aMatchCount
})

const multiplier = ref<number>(1)
</script>

<template>
  <h1 class="subtitle mb-0">
    {{ recipe.name }}
  </h1>

  <a :href="`https://recipe-scraper-pink.vercel.app/recipe?url=${recipe.url}`" target="_blank" class="help">
    View on Recipe Scraper
  </a>

  <div class="level my-3">
    <Duration :duration="recipe.totalTime" />
    <Servings
      v-if="recipe.recipeYield"
      :servings="recipe.recipeYield"
      @updateMultiplier="multiplier = $event"
    />
  </div>
  <Ingredient
    v-for="ingredient in sortedList"
    :key="ingredient.ingredient"
    :parsed="ingredient"
    :multiplier="multiplier"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  recipe: IRecipe;
}>()

console.log('recipe', props.recipe)

const multiplier = ref<number>(1)
</script>

<template>
  <div>
    <h1 class="subtitle mb-0">
      {{ recipe.name }}
    </h1>

    <a :href="`https://recipe-scraper-pink.vercel.app/recipe?url=${recipe.url}`" target="_blank" class="help">
      View on Recipe Scraper
    </a>

    <div class="level is-mobile my-3">
      <Duration
        v-if="recipe.totalTime"
        :duration="recipe.totalTime"
      />
      <Servings
        v-if="recipe.recipeYield"
        :servings="recipe.recipeYield"
        @updateMultiplier="multiplier = $event"
      />
    </div>
    <Ingredient
      v-for="ingredient in recipe.ingredients"
      :key="ingredient.ingredient"
      :parsed="ingredient"
      :multiplier="multiplier"
    />
  </div>
</template>
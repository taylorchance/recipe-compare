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
</script>

<template>
  <div class="level mb-0">
    <!-- <slot></slot> -->
    <Duration :duration="recipe.totalTime" />

    <!-- <Servings /> -->
  </div>
  <Ingredient
    v-for="ingredient in sortedList"
    :key="ingredient.ingredient"
    :parsed="ingredient"
  />
</template>
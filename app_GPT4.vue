<script setup>
const array1 = [
  { ingredient: "vegetable oil" },
  { ingredient: "white sugar" },
  { ingredient: "dried bay leaves" },
  { ingredient: "garlic cloves" },
  { ingredient: "ground beef chuck" },
  { ingredient: "dry white wine" }
]

const array2 = [
  { ingredient: "olive oil" },
  { ingredient: "beef bouillon cubes" },
  { ingredient: "Salt and pepper" },
  { ingredient: "garlic cloves" },
  { ingredient: "dry red wine" }
]
</script>

<template>
  
  <h1 class="title has-text-centered mb-3">Original:</h1>
  <div class="columns">
    <div class="column">
      <p v-for="ingredient in array1" :key="ingredient" class="ingredient">
        {{ ingredient.ingredient }}
      </p>
    </div>
    <div class="column">
      <p v-for="ingredient in array2" :key="ingredient" class="ingredient">
        {{ ingredient.ingredient }}
      </p>
    </div>
  </div>

  <Reorder
    :array1="array1"
    :array2="array2"
  />
</template>
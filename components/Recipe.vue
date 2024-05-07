<script setup lang="ts">
const props = defineProps<{
  recipe: IRecipe;
}>()

console.log('recipe', props.recipe)

const multiplier = ref<number>(1)

const showUnitsModal = ref<boolean>(false)
const conversionTable = ref<null | { [key: string]: string }>(null)

const textIncrement = inject('textIncrement')
</script>

<template>
  <div>
    <h1 class="title is-size-4 mb-2">
      {{ recipe.name }}
    </h1>

    <a :href="`https://recipe-scraper-pink.vercel.app/recipe?url=${recipe.url}`" class="button is-size-7 is-ghost p-0 mb-3" target="_blank">
      <!-- <span>View on Fetch Recipes</span> -->
      <span>View full instructions</span>
      <span class="icon">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </span>
    </a>

    <div class="columns">
      <div class="column pb-0 is-flex-grow-0">
        <Duration
          v-if="recipe.totalTime"
          :duration="recipe.totalTime"
        />
      </div>
      <div class="column pb-0">
        <Servings
          v-if="recipe.recipeYield"
          :servings="recipe.recipeYield"
          @updateMultiplier="multiplier = $event"
        />
      </div>
      <div class="column">
        <button class="button is-fullwidth" style="height: 42px; box-shadow: none;" @click="showUnitsModal = true">
          Convert Units
        </button>
      </div>
    </div>


    conversionTable? {{ conversionTable }}


    <Ingredient
      v-for="ingredient in recipe.ingredients"
      :key="ingredient.ingredient"
      :parsed="ingredient"
      :multiplier="multiplier"
      :style="{ fontSize: `calc(${textIncrement}rem)` }"
    />

    <UnitsModal
      v-if="showUnitsModal"
      :ingredients="recipe.ingredients"
      :conversionTable="conversionTable"
      @updateUnits="conversionTable = $event, showUnitsModal = false"
      @close="showUnitsModal = false"
    />
  </div>
</template>
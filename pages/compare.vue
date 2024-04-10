<script setup lang="ts">
const route = useRoute()
const url1 = computed(() => route.query.url1 as string)
const url2 = computed(() => route.query.url2 as string)

console.log('url1', url1.value)
console.log('url2', url2.value)

const { data: baseRecipe, pending, error } = await useAsyncData(
  'recipe1',
  () => $fetch('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: url1.value
    }
  })
)

console.log('baseRecipe', baseRecipe.value)
</script>

<template>
  <section class="section">

    <h1 class="title">
      Compare
    </h1>

    <div class="columns">
      <div v-if="baseRecipe" class="column is-6">
          
          <p v-for="ingredient in baseRecipe.recipeIngredient" :key="ingredient" class="ingredient">
            {{ ingredient }}
          </p>

      </div>

      <div class="column is-6">
        <Second
          v-if="baseRecipe"
          :url="url2"
          :base="baseRecipe.recipeIngredient"
        />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const url1 = computed(() => route.query.url1 as string)
const url2 = computed(() => route.query.url2 as string)

const { data, pending, error } = await useAsyncData(
  'data',
  () => $fetch('/recipes', {
    params: {
      url1: url1.value,
      url2: url2.value
    }
  })
)
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile" style="gap: 4rem;">
        <div v-for="recipe in data" :key="recipe.url" class="column">
          <Recipe :recipe="recipe" />
        </div>
      </div>
    </div>
  </section>
</template>
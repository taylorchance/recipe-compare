<script setup lang="ts">
const route = useRoute()
const url1 = computed(() => route.query.url1 as string)
const url2 = computed(() => route.query.url2 as string)
const isPending = inject('isPending')

const { data, pending, error } = await useAsyncData(
  'data',
  () => $fetch('/recipes', {
    params: {
      url1: url1.value,
      url2: url2.value
    }
  })
)

isPending.value = false
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile">
        <div v-for="recipe in data" :key="recipe.url" class="column">
          <Recipe :recipe="recipe" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.column {
  padding-inline: 4vw;
}

.column:first-child {
  border-right: 1px solid var(--bulma-border);
}
</style>
<script setup lang="ts">
const props = defineProps<{
  ingredients1: object[],
  ingredients2: object[]
}>()

const reorder = (arr1, arr2) => {
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

  return [
    arr1,
    arr2
  ]
}

const [reorderedIngredients1, reorderedIngredients2] = reorder(props.ingredients1, props.ingredients2)

</script>

<template>
  <h1 class="title has-text-centered mb-3">Reordered:</h1>
  <div class="columns">
    <div class="column">
      <List :list="reorderedIngredients1" />
    </div>
    <div class="column">
      <List :list="reorderedIngredients2" />
    </div>
  </div>
</template>
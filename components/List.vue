<script setup lang="ts">
const props = defineProps<{
  list: object[];
}>()

const sortedList = props.list.sort((a, b) => {
  const aMatchCount = !a.matches ? 0 : a.matches.reduce((total, string) => total + string.length, 0)
  const bMatchCount = !b.matches ? 0 : b.matches.reduce((total, string) => total + string.length, 0)
  return bMatchCount - aMatchCount
})
</script>

<template>
  <Parse
    v-for="ingredient in sortedList"
    :key="ingredient.ingredient"
    :parsed="ingredient"
  />
</template>
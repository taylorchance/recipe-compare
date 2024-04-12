<script setup lang="ts">
const props = defineProps<{
  array1: string[],
  array12: string[]
}>()

import { stringSimilarity } from 'string-similarity-js'

const reorderArrays = (array1, array2) => {
  // return [[], []]
  const reorderedArray1 = [];
  const reorderedArray2 = [];

  array1.forEach(item1 => {

    console.log('array1', array1)

    const match1 = array2.find(item2 => {
      const similarity = stringSimilarity(item1.ingredient.toLowerCase(), item2.ingredient.toLowerCase());
      return similarity >= 0.4;
    });
    if (match1) {
      // reorderedArray1.unshift({ ingredient: item1.ingredient });
      reorderedArray1.unshift(item1)
    } else {
      reorderedArray1.push(item1);
    }
  });

  array2.forEach(item2 => {
    const match2 = array1.find(item1 => {
      const similarity = stringSimilarity(item2.ingredient.toLowerCase(), item1.ingredient.toLowerCase());
      return similarity >= 0.4;
    });
    if (match2) {
      reorderedArray2.unshift({ ingredient: item2.ingredient });
      // reorderedArray1.unshift(item2)
    } else {
      reorderedArray2.push(item2);
    }
  });

  return [reorderedArray1, reorderedArray2];
};

const [reorderedArray1, reorderedArray2] = reorderArrays(props.array1, props.array2)
console.log('reorderedArray1', reorderedArray1)
console.log('reorderedArray2', reorderedArray2)
</script>

<template>
  <h1 class="title has-text-centered mb-3">Reordered:</h1>
  <div class="columns">
    <div class="column">
      <Parse
        v-for="ingredient in reorderedArray1"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      />
    </div>
    <div class="column">
      <Parse
        v-for="ingredient in reorderedArray2"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  parsed: object
}>()

const { matches } = props.parsed

const wrappedIngrediant = (ingredient) => {
  // console.log('matches', matches)

  // console.log('ingredient', ingredient)
  // console.log('matches.join('|')', matches.join('|'))
  // return ingredient

  if (matches) {
    const regex = new RegExp(`\\b(${matches.join('|')})\\b`, 'gi');
    return ingredient.replace(regex, '<span>$1</span>');
  }
  return ingredient
}
</script>

<template>
  <p v-if="parsed" class="ingredient">
    <span v-if="parsed.quantity" class="quantity">
      {{ parsed.quantity }}
    </span>

    <span v-if="parsed.unit" class="unit">
      {{ parsed.unit }}
    </span>

    <span v-html="wrappedIngrediant(parsed.ingredient)" class="ingredient"></span>

  </p>
</template>

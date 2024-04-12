<script setup lang="ts">
const props = defineProps<{
  parsed: object
}>()

const { matches } = props.parsed

const wrappedIngrediant = (ingredient) => {
  console.log('ingredient', ingredient)
  if (matches) {
    const regex = new RegExp(`\\b(${matches.join('|')})\\b`, 'gi');
    return ingredient.replace(regex, '<span>$1</span>');
    // return matches + ingredient
  }
  return ingredient
}
</script>

<template>
  <!-- <p class="ingredient">{{ ingredient }}</p> -->
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

<style>
p.ingredient {
  padding: .75rem 0;
}

p.ingredient + p.ingredient {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.quantity, .unit {
  font-weight: 600;
  margin-right: 4px;
}

span.ingredient span {
  font-style: italic;
  color: green;
}
</style>
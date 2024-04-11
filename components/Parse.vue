<script setup lang="ts">
const props = defineProps<{
  parsed: object
}>()

console.log('parse', props.parsed)
</script>

<template>
  <!-- <p class="ingredient">{{ ingredient }}</p> -->
  <p v-if="parsed" class="ingredient">
    <span v-if="parsed.quantity" class="quantity">
      {{ parsed.quantity }}
    </span>
    <span class="unit">{{ parsed.unit }}</span>
    <span>{{ parsed.ingredient }}</span>

    <!-- <span v-if="parsed.match" class="ingredient" v-html="parsed.match"></span> -->

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
  margin-right: 2px;
}

span.ingredient span {
  font-style: italic;
  color: green;
}
</style>
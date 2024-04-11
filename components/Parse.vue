<script setup lang="ts">
const props = defineProps<{
  parsed: object
}>()
</script>

<template>
  <!-- <p class="ingredient">{{ ingredient }}</p> -->
  <p v-if="parsed" class="ingredient">
    <span v-if="parsed.quantity">{{ parsed.quantity }}</span>
    {{ parsed.unit }}
    {{ parsed.ingredient }}
  </p>
</template>
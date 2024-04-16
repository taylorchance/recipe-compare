<script setup lang="ts">
import { parse } from 'ingredients-parser'

const props = defineProps<{
  servings: string | Array<string>
}>()

const emit = defineEmits(['updateMultiplier'])

const amount = ref<number>(0)
const originalAmount = ref<number>(0)

if (typeof props.servings === 'number') {
  amount.value = props.servings
  originalAmount.value = props.servings
} else {
  const servingsObj = parse(typeof props.servings === 'string' ? props.servings : props.servings[0])
  amount.value = Number(servingsObj.amount)
  originalAmount.value = Number(servingsObj.amount)
}

watch(amount, (newAmount) => {
  const change = newAmount - originalAmount.value
  emit('updateMultiplier', 1 + (change / originalAmount.value))
})
</script>

<template>
  <div class="field has-addons mr-4 mb-0">
    <div class="control">
      <button class="button" @click="amount--">
        <span class="icon">
          <i class="fa-solid fa-minus"></i>
        </span>
      </button>
    </div>
    <div class="control">
      <p class="is-size-5 my-1">{{ amount }} servings</p>
    </div>
    <div class="control">
      <button class="button" @click="amount++">
        <span class="icon">
          <i class="fa-solid fa-plus"></i>
        </span>
      </button>
    </div>
  </div>
</template>
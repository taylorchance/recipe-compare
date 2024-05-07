<script setup lang="ts">
const props = defineProps<{
  ingredients: IParsedIngedient[];
  conversionTable: null | { [key: string]: string };
}>()
const emit = defineEmits(['updateUnits', 'close'])

let uniqueUnits: string[] = []

props.ingredients.forEach(ingredient => {
  if (ingredient.unit && !uniqueUnits.includes(ingredient.unit)) {
    uniqueUnits.push(ingredient.unit)
  } 
})

const allUnits: string[] = [
  'teaspoon',
  'tablespoon',
  'floz',
  'cup',
  'pint',
  'quart',
  'gallon',
  'milliliter',
  'liter',
  'ounce',
  'pound',
  'gram',
  'kilogram',
]

const conversionTable: { [key: string]: string } = props.conversionTable ? props.conversionTable : reactive(
  uniqueUnits.reduce((obj: { [key: string]: string }, item: string) => {
    obj[item] = item
    return obj
  }, {})
)

const handleSubmit = () => {
  emit('updateUnits', conversionTable)
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="emit('close')"></div>
    <div class="modal-content">
      <div class="box">
        <h3 class="title">
          Convert Units
        </h3>

        <table class="table is-fullwidth">
          <thead>
            <th>Unit</th>
            <th>Convert to</th>
          </thead>
          <tbody>
            <template v-for="unit in uniqueUnits" :key="unit">
              <tr v-if="allUnits.includes(unit)">
                <td>
                  {{ unit }}
                </td>
                <td>
                  <div class="select is-fullwidth has-text-centered">
                    <select v-model="conversionTable[unit]">
                      <option
                        v-for="option in allUnits"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="buttons mt-3">
          <button class="button is-black" @click="handleSubmit()">
            Convert
          </button>
          <button class="button is-ghost" @click="emit('close')">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table td {
  vertical-align: middle;
}
</style>
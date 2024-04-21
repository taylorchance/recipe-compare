<script setup lang="ts">
const { currentRoute } = useRouter()

const textIncrement = inject('textIncrement')
const isDarkMode = inject('isDarkMode')
</script>

<template>
  <div class="level is-mobile">
    <div v-if=" currentRoute.name === 'compare'" class="field toggle has-addons mb-0">
      <div class="control">
        <button class="button" @click="textIncrement = textIncrement - .2">
          <span class="icon">
            <i class="fa-solid fa-minus"></i>
          </span>
        </button>
      </div>
      <div class="control">
        <p class="my-2 has-text-weight-bold">A</p>
      </div>
      <div class="control">
        <button class="button" @click="textIncrement = textIncrement + .2">
          <span class="icon">
            <i class="fa-solid fa-plus"></i>
          </span>
        </button>
      </div>
    </div>

    <button class="button" @click="isDarkMode = !isDarkMode">
      <span class="icon">
        <i :class="`fa-solid fa-${!isDarkMode ? 'sun' : 'moon'}`"></i>
      </span>
    </button>
  </div>
</template>

<style scoped>
.level {
  position: fixed;
  right: 1rem;
  bottom: 1.5rem;
  margin: 0;
  z-index: 99;
}
</style>
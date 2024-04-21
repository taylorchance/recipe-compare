<script setup lang="ts">
const isPending = ref<boolean>(false)
provide('isPending', isPending)

const isDarkMode = ref<boolean>(true)
provide('isDarkMode', isDarkMode)

const textIncrement = ref<number>(1)
provide('textIncrement', textIncrement)

watch(isDarkMode, () => {
  const root = document.getElementsByTagName('html')[0]
  root.classList.toggle('theme-dark')
})
</script>

<template>
  <div>
    <NuxtPage />

    <DarkMode />

    <div v-if="isPending" class="loader-wrapper">
      <div class="loader is-loading"></div>
    </div>
  </div>
</template>

<style>
.button.is-ghost, .button.is-ghost:hover {
  color: var(--bulma-text);
}

.loader-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.loader {
  width: 4em;
  height: 4em;
  border-width: 4px;
  border-left-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
}

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
  color: rgb(22, 70, 48);
  background-color: rgb(239, 250, 245);
  padding: 2px 3px;
}

.field {
  border: 1px solid var(--bulma-border);
  border-radius: .5rem;
  white-space: nowrap;
  touch-action: manipulation;
  margin-bottom: 0;
  background-color: var(--bulma-scheme-main);
}

.field .button {
  color: #000000;
  background: none;
  box-shadow: none;
  border: 0;
  height: 100%;
  width: 40px;
  padding: 0;
  max-height: 40px;
  cursor: pointer;
}

.icon {
  color: var(--bulma-text);
}

.input {
  background: var(--bulma-background);
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: var(--bulma-text);
}

:root.theme-dark .button.is-black {
  --bulma-button-background-l: 85%;
  --bulma-button-color-l: var(--bulma-white-invert-l);
}
</style>
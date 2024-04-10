<script setup lang="ts">
const url1 = ref<string>('')
const url2 = ref<string>('')

const handleSubmit = () => {
  navigateTo({
    path: '/compare',
    query: {
      url1: url1.value,
      url2: url2.value,
    }
  })
}
</script>

<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
    </div>

    <div class="hero-body">
      <div class="container">

        <h1 class="title">
          Recipe Compare
        </h1>

        <p>Enter 2 recipe URLs to compare</p>


        <div class="field">
          <input class="input" placeholder="Base URL" v-model="url1" />
        </div>

        <div class="field">
          <input class="input" placeholder="Compare URL" v-model="url2" />
        </div>

        <button class="button" @click="handleSubmit()">
          Compare
        </button>

      </div>
    </div>
  </section>
</template>

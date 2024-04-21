<script setup lang="ts">
const url1 = ref<string>('')
const url2 = ref<string>('')
const showModal = ref<boolean>(false)
const isPending = inject('isPending')

const IsUrl = (string: string) => {
  return /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(string)
}

const handleSubmit = async () => {
  if (!IsUrl(url1.value)) {
    showModal.value = true
    url1.value = ''
    return
  }

  if (!IsUrl(url2.value)) {
    showModal.value = true
    url2.value = ''
    return
  }

  isPending.value = true
  await navigateTo({
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
    <!-- <div class="hero-head"></div> -->
  
    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered is-vcentered">
          <div class="column is-6">
            <h1 class="title mb-3">
              Recipe Compare
              <!-- Recipe Face-off -->
            </h1>
            <h2 class="subtitle mb-3">
              Which ingredients do you prefer?
            </h2>
            <p>
              Ever wondered how two similar recipes stack up ingredient-wise? Dive into our recipe face-off and see for yourself!
            </p>
            <!-- <p>Enter 2 recipe URLs to compare</p> -->
          </div>
          <div class="column is-6 is-4-widescreen">
            <div class="field">
              <input class="input" placeholder="Paste first recipe URL here" v-model="url1" />
            </div>
            <div class="field">
              <input class="input" placeholder="Paste second recipe URL here" v-model="url2" />
            </div>
            <button class="button is-black is-fullwidth" @click="handleSubmit()">
              Compare recipes
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <div v-if="showModal" class="modal is-active">
    <div class="modal-background" @click="showModal = false"></div>
    <div class="modal-content">
      <div class="box">
        <h3 class="title is-4">
          Thats not a valid URL
        </h3>

        <button class="button mt-3" @click="showModal = false">
          Got it
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  dates: { type: String, default: '' },
  location: { type: String, default: '' },
})
</script>

<template>
  <section class="px-5 py-12 text-center" aria-label="Conference introduction">
    <h1 class="my-8 font-heading text-4xl font-medium tracking-tight text-violet-700 sm:text-5xl lg:text-6xl dark:text-violet-400">
      {{ name }}
    </h1>
    <p v-if="tagline" class="text-lg text-gray-600 dark:text-gray-400">{{ tagline }}</p>
    <div class="mt-4 flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
      <span v-if="dates">{{ dates }}</span>
      <span v-if="location">{{ location }}</span>
    </div>
  </section>
</template>

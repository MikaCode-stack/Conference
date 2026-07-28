<script setup>
import heroImage from '../assets/hero.jpeg'

defineProps({
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  dates: { type: String, default: '' },
  location: { type: String, default: '' },
})
</script>

<template>
  <section
    class="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-5 py-20 text-white sm:py-28"
    aria-label="Conference introduction"
  >
    <div
      class="absolute inset-0 -z-10 bg-gray-900 bg-cover bg-center"
      :style="{ backgroundImage: `url(${heroImage})` }"
    ></div>
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90"></div>

    <div class="mx-auto max-w-[1126px]">
      <h1 class="font-heading text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
        {{ name }}
      </h1>
      <p v-if="tagline" class="mt-4 text-lg text-white/90">{{ tagline }}</p>
      <div class="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
        <span v-if="dates">{{ dates }}</span>
        <span v-if="location">{{ location }}</span>
      </div>
    </div>
  </section>
</template>

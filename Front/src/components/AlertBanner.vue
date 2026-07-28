<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  variant: { type: String, default: 'live' }, // 'live' | 'reminder'
  message: { type: String, required: true },
})
defineEmits(['dismiss'])
</script>

<template>
  <div
    v-if="visible"
    class="flex items-center gap-3 border-b border-gray-200 px-5 py-3 dark:border-gray-800"
    :class="
      variant === 'live'
        ? 'bg-red-600/10 dark:bg-red-400/10'
        : 'bg-gray-100 dark:bg-gray-800'
    "
    role="status"
    aria-live="polite"
  >
    <span
      class="rounded bg-red-600 px-2 py-0.5 text-xs font-semibold text-white dark:bg-red-400 dark:text-gray-950"
    >
      {{ variant === 'live' ? 'Live' : 'Reminder' }}
    </span>
    <p class="flex-1 text-sm text-gray-950 dark:text-gray-100">{{ message }}</p>
    <button
      type="button"
      class="text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-100"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      &times;
    </button>
  </div>
</template>

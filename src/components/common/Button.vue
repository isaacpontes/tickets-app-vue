<script setup>
defineProps({
  color: { type: String, default: 'primary' },
  size: { type: String, default: 'md' }
})
</script>

<template>
  <button :class="`btn btn-${size} btn-${color}`">
    <slot></slot>
  </button>
</template>
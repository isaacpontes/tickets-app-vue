<script setup>
defineProps(['isActive', 'to'])
</script>

<template>
  <a
    :class="`nav-link ${isActive && 'active'}`"
    :aria-current="isActive && 'page'" :href="to"
  >
    <slot></slot>
  </a>
</template>
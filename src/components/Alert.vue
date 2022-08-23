<script setup>
defineProps(['show', 'message', 'color'])
</script>

<template>
  <div v-if="show" :class="`alert alert-${color}`" role="alert">
    {{ message }}
  </div>
</template>
<script setup>
defineProps(['isChecked'])
</script>

<template>
  <span v-if="isChecked">
    <i class="bi bi-check-circle-fill text-success"></i>
  </span>
  <span v-else>
    <i class="bi bi-x-circle-fill text-danger"></i>
  </span>
</template>
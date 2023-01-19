<script setup>
import Button from './Button.vue';

defineProps(['confirmButtonText'])
</script>

<template>
  <div class="modal-footer">
    <Button type="button" color="secondary" data-bs-dismiss="modal">Fechar</Button>
    <Button>{{ confirmButtonText }}</Button>
  </div>
</template>
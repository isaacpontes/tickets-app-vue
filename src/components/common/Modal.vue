<script setup>
import { Modal as BsModal } from 'bootstrap';

defineProps(['id'])
</script>

<template>
  <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps(['shown', 'total', 'label'])
defineEmits(['limitChange'])

const resultsCountMessage = computed(() => {
  return `Exibindo ${props.shown} de ${props.total} ${props.label ?? 'registros'}.`
})
</script>

<template>
  <div class="row mb-3">
    <div class="col col-md-6 py-1">
      {{ resultsCountMessage }}
    </div>
    <div class="col col-md-4 text-end">
      Quantidade por página
    </div>
    <div class="col col-md-2">
      <select
        class="form-select form-select-sm"
        @change="(ev) => $emit('limitChange', parseFloat(ev.target.value))"
      >
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="80">80</option>
        <option value="100">100</option>
        <option value="9999">Todos</option>
      </select>
    </div>
  </div>
</template>
<script setup>
defineProps(['currentPage', 'currentLimit', 'total'])
defineEmits(['pageIncrement', 'pageDecrement', 'pageChange'])
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li :class="`page-item ${currentPage === 1 && 'disabled'}`">
        <button class="page-link" @click="$emit('pageDecrement')">Anterior</button>
      </li>
      <li class="page-item" v-for="n in Math.floor(1 + total / currentLimit)">
        <button
          :class="`page-link ${currentPage === n && 'disabled'}`"
          @click="$emit('pageChange', n)"
        >
          {{ n }}
        </button>
      </li>
      <li :class="`page-item ${currentPage * currentLimit >= total && 'disabled'}`">
        <button class="page-link" @click="$emit('pageIncrement')">Próxima</button>
      </li>
    </ul>
  </nav>
</template>
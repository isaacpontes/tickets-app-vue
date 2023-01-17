<script setup>
defineProps(['currentPage', 'currentLimit', 'total', 'handlePreviousPage', 'handleNextPage', 'handleChangePageTo'])
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li :class="`page-item ${currentPage === 1 && 'disabled'}`">
        <button class="page-link" @click="handlePreviousPage()">Anterior</button>
      </li>
      <li class="page-item" v-for="n in Math.floor(1 + total / currentLimit)">
        <button
          :class="`page-link ${currentPage === n && 'disabled'}`"
          @click="handleChangePageTo(n)"
        >
          {{ n }}
        </button>
      </li>
      <li :class="`page-item ${currentPage * currentLimit >= total && 'disabled'}`">
        <button class="page-link" @click="handleNextPage()">Próxima</button>
      </li>
    </ul>
  </nav>
</template>
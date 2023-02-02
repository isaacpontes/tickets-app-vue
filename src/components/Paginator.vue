<script setup>
defineProps(['currentPage', 'currentLimit', 'total'])
defineEmits(['pageIncrement', 'pageDecrement', 'pageChange'])

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li :class="`page-item ${currentPage === 1 && 'disabled'}`">
        <button class="page-link" @click="$emit('pageDecrement')">Anterior</button>
      </li>
      <li
        class="page-item"
        v-if="Math.floor(1 + total / currentLimit) <= 10"
        v-for="n in Math.floor(1 + total / currentLimit)"
      >
        <button
          :class="`page-link ${currentPage === n && 'disabled'}`"
          @click="$emit('pageChange', n)"
        >
          {{ n }}
        </button>
      </li>
      <li
        class="page-item"
        v-if="Math.floor(1 + total / currentLimit) > 10"
        v-for="n in range(currentPage - 3, currentPage + 3)"
      >
        <button
          v-if="n > 0 && n < Math.floor(1 + total / currentLimit)"
          :class="`page-link ${currentPage === n && 'disabled'}`"
          @click="$emit('pageChange', n)"
        >
          {{ n }}
        </button>
      </li>
      <li class="page-item" v-if="Math.floor(1 + total / currentLimit) > 10 && currentPage < Math.floor(1 + total / currentLimit) - 4">
        <button class="page-link disabled">...</button>
      </li>
      <li class="page-item" v-if="Math.floor(1 + total / currentLimit) > 10">
        <button :class="`page-link ${currentPage === Math.floor(1 + total / currentLimit) && 'disabled'}`"
          @click="$emit('pageChange', Math.floor(1 + total / currentLimit))">
          {{ Math.floor(1 + total / currentLimit) }}
        </button>
      </li>
      <li :class="`page-item ${currentPage * currentLimit >= total && 'disabled'}`">
        <button class="page-link" @click="$emit('pageIncrement')">Próxima</button>
      </li>
    </ul>
  </nav>
</template>
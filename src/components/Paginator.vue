<script setup>
import { range } from '../utils/range';

defineProps(['currentPage', 'currentLimit', 'total'])
defineEmits(['pageIncrement', 'pageDecrement', 'pageChange'])
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <!-- Previous Link -->
      <li :class="`page-item ${currentPage === 1 && 'disabled'}`">
        <button class="page-link" @click="$emit('pageDecrement')">Anterior</button>
      </li>
      <!-- First Page -->
      <!-- <li class="page-item" v-if="Math.floor(1 + total / currentLimit) > 10">
        <button :class="`page-link ${currentPage === Math.floor(1 + total / currentLimit) && 'disabled'}`"
          @click="$emit('pageChange', Math.floor(1 + total / currentLimit))">
          {{ Math.floor(1 + total / currentLimit) }}
        </button>
      </li> -->
      <!-- "..." placeholder -->
      <li class="page-item" v-if="Math.floor(1 + total / currentLimit) > 10 && currentPage > 5">
        <button class="page-link disabled">...</button>
      </li>
      <!-- All pages (only if <= 10) -->
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
      <!-- 4 previous and 4 next pages (if more than 10) -->
      <li
        class="page-item"
        v-if="Math.floor(1 + total / currentLimit) > 10"
        v-for="n in range(currentPage - 4, currentPage + 4)"
      >
        <button
          v-if="n > 0 && n < Math.floor(1 + total / currentLimit)"
          :class="`page-link ${currentPage === n && 'disabled'}`"
          @click="$emit('pageChange', n)"
        >
          {{ n }}
        </button>
      </li>
      <!-- "..." placeholder -->
      <li class="page-item" v-if="Math.floor(1 + total / currentLimit) > 10 && currentPage < Math.floor(1 + total / currentLimit) - 5">
        <button class="page-link disabled">...</button>
      </li>
      <!-- Last Page -->
      <!-- <li class="page-item" v-if="Math.floor(1 + total / currentLimit) > 10">
        <button :class="`page-link ${currentPage === Math.floor(1 + total / currentLimit) && 'disabled'}`"
          @click="$emit('pageChange', Math.floor(1 + total / currentLimit))">
          {{ Math.floor(1 + total / currentLimit) }}
        </button>
      </li> -->
      <!-- Next Link -->
      <li :class="`page-item ${currentPage * currentLimit >= total && 'disabled'}`">
        <button class="page-link" @click="$emit('pageIncrement')">Próxima</button>
      </li>
    </ul>
  </nav>
</template>
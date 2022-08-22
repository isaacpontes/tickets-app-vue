<script setup>
import { computed, ref } from 'vue'
import SidebarLink from './SidebarLink.vue';

const sidebarOpen = ref(true)

function toggleNavbar() {
  sidebarOpen.value = !sidebarOpen.value
}

const sidebarClassNames = computed(() => (sidebarOpen.value
  ? 'd-flex flex-column flex-shrink-0 shadow-sm p-3'
  : 'd-flex flex-column flex-shrink-0 shadow-sm p-0'
))

const sidebarTitleClassNames = computed(() => (sidebarOpen.value
  ? 'd-flex align-items-center mb-md-0 fs-4 mb-3'
  : 'd-flex align-items-center mb-md-0 fs-4 border-bottom'
))

</script>

<template>
  <aside :class="sidebarClassNames" :style="sidebarOpen ? 'width: 18rem;' : 'width: 4.5rem;'">
    <div :class="sidebarTitleClassNames">
      <button :class="sidebarOpen ? 'border-0 bg-transparent' : 'border-0 bg-transparent p-3 w-100'"
        @click="toggleNavbar">
        <i class="bi bi-list"></i>
      </button>
      <span v-if="sidebarOpen" class="ms-2">Sistema de Tickets</span>
    </div>
    <hr v-if="sidebarOpen">
    <ul class="nav nav-pills flex-column mb-auto">
      <sidebar-link text="Início" path="/" icon="house" :sidebar-open="sidebarOpen" />
      <sidebar-link text="Cadastrados" path="/subscribers" icon="people" :sidebar-open="sidebarOpen" />
      <sidebar-link text="Mesas" path="/boards" icon="inbox" :sidebar-open="sidebarOpen" />
      <sidebar-link text="Estoques" path="/inventories" icon="archive" :sidebar-open="sidebarOpen" />
      <sidebar-link text="Locais" path="/locations" icon="geo-alt" :sidebar-open="sidebarOpen" />
    </ul>
    <hr>

    <!-- <a href="#" class="nav-link link-danger text-decoration-none">
        <i class="bi bi-power pe-none me-2"></i>
        <span v-if="sidebarOpen">Sair</span>
      </a> -->
  </aside>
</template>

<style scoped>
aside {
  transition: .2s;
  white-space: nowrap;
}
</style>
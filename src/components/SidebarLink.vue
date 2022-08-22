<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps(['text', 'path', 'icon', 'sidebarOpen'])

const currentPath = computed(() => {
  const route = useRoute()
  return route.path
})

const navlinkClassNames = computed(() => (props.sidebarOpen
  ? 'nav-link'
  : 'nav-link py-3 border-bottom rounded-0 text-center'
))
</script>

<template>
  <li class="nav-item">
    <router-link :to="path" :class="`${navlinkClassNames} ${(currentPath === path && ' active')}`">
      <i :class="`bi bi-${icon} pe-none`"></i>
      <span v-if="sidebarOpen" class="ms-2">{{ text }}</span>
    </router-link>
  </li>
</template>
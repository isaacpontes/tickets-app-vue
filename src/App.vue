<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <main class="d-flex min-vh-100">
    <sidebar />
    <div class="container py-4 px-3 mx-auto">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
</style>

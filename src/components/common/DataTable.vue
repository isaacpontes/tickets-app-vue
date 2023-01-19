<script setup>
defineProps(["columnHeaders"])
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" v-for="header in columnHeaders">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>
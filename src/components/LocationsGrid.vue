<script setup>
defineProps(['locations'])
</script>

<template>
  <section class="row mt-4">
    <div class="col col-lg-6 col-xl-4 mb-4" v-for="location in locations">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-0">
            {{ location.name }}
          </h5>
        </div>
      </div>
    </div>
  </section>
</template>
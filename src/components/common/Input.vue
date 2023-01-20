<script setup>
defineProps({
  type: { type: String, default: "text" },
  modelValue: [String, Number]
})
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :type="type"
    class="form-control"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>
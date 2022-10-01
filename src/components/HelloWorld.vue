<script setup lang="ts">
const props = defineProps<{ message: string }>();

const sayHello = (name: string) => {
  alert(`Hello ${name}!`);
};
</script>

<template>
  <pre>Data: {{ props.message }}</pre>
  <button @click="sayHello('Isak')">Click Me!</button>
</template>

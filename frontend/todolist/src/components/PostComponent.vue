<script setup>
import { ref } from "vue";
const items = ref([
  {
    title: "THis is 1",
  },
  {
    title: "This is 2",
  },
]);
console.log(items.value[0]);

</script>
<template>
  <div>
    <div v-for="(item, i) in items" :key="i">
      <li>{{ item.title }}</li>
    </div>
  </div>
</template>

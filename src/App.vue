<script setup>
import { onMounted } from "vue-demi";

onMounted(() => {
  const appDiv = document.getElementById("q-app");
  setTimeout(() => {
    appDiv.classList.remove("hide");
  }, 500);
});
</script>

<template>
  <router-view />
</template>

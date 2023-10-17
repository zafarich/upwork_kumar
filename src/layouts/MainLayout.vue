<script setup>
import TheHeader from "components/common/TheHeader.vue";
</script>

<template>
  <q-layout>
    <TheHeader @toggle-left-drawer="() => leftDrawer.toggleDrawer()" />
    <q-page-container>
      <router-view class="main-page" />
    </q-page-container>
  </q-layout>
</template>

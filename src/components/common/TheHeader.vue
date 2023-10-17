<script setup>
import BaseImg from "components/UI/BaseImg.vue";
import UserSettingsDropdown from "components/partials/user/UserSettingsDropdown.vue";
</script>

<template>
  <q-header class="main-header">
    <div class="q-page-container">
      <UserSettingsDropdown class="ml-auto" />
    </div>
  </q-header>
</template>

<style lang="scss" scoped>
.main-header {
  .logo-wrap {
    transition: 0.22s ease-in-out;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    height: 73px;
    display: flex;
    align-items: center;
    padding: 16px;
    padding-left: 22px;
    padding-right: 0;
    position: absolute;
    left: 0;
    .title {
      font-weight: 600;
      font-size: 23px;
      line-height: 27px;
    }
    .toggle-btn {
      position: absolute;
      box-shadow: 0px 0px 10px $shadow-color;
      right: -16px;
      background-color: $white;
      &.rotate {
        :deep(.q-icon) {
          rotate: 180deg;
        }
      }
    }
  }
}
</style>

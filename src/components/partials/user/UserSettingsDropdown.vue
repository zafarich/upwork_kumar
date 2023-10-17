<script setup>
import { useAttrs } from "vue-demi";
import LeaveIcon from "components/icons/LeaveIcon.vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const attrs = useAttrs();
const router = useRouter();

function logout() {
  authStore.logout();
  return router.push({ name: "login" });
}
</script>

<template>
  <div class="user-settings">
    <q-icon name="person" class="arrow-icon mr-1" size="42px" color="grey-5" />
    <div>{{ authStore?.user?.name }}</div>
    <q-icon
      name="keyboard_arrow_down"
      class="arrow-icon ml-1"
      size="22px"
      color="grey-5"
    />
    <q-menu
      fit
      class="user-settings--menu"
      content-class="base-menu-dots"
      v-bind="attrs"
      :offset="[0, 20]"
      anchor="bottom end"
      self="top end"
    >
      <q-list style="white-space: nowrap">
        <q-item v-close-popup class="item" clickable @click="logout">
          <q-item-section class="item--section">
            <LeaveIcon class="icon logout" />
            <span class="title"> Logout </span>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<style lang="scss" scoped>
.user-settings {
  display: flex;
  align-items: center;
  cursor: pointer;
  .user-logo {
    border-radius: 6px;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #000;
    white-space: nowrap;
  }
  .description {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: $grey-6;
  }
}
</style>
<style lang="scss">
.user-settings--menu {
  .item {
    &--section {
      flex-direction: initial;
      justify-content: flex-start;
      align-items: center;
      .icon {
        margin-right: 10px;
        stroke: $grey-6;
        &.logout {
          stroke: $red;
        }
      }
    }
    &.q-router-link--exact-active {
      .title {
        color: $dark;
      }
      .icon {
        stroke: $primary;
      }
    }
  }
}
</style>

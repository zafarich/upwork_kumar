<script setup>
import { onMounted, onBeforeUnmount } from "vue-demi";

onMounted(() => {
  document.body.classList.add("auth-page");
});
onBeforeUnmount(() => {
  document.body.classList.remove("auth-page");
});
</script>

<template>
  <q-layout class="auth-layout">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;

  :deep(.q-page-container) {
    max-width: 100%;
    .login-page,
    .register-page,
    .forgot-password-page {
      display: flex;
      justify-content: center;
      height: 100%;
      .header {
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        text-align: center;
        margin-bottom: 40px;
      }
      .login-form,
      .register-form,
      .forgot-password-form {
        width: 440px;
        .form--title {
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
        }
      }
      .card {
        box-shadow: 0 0 13px 6px #eee;
        border-radius: 6px;
        padding: 30px 0;
        max-width: 700px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .q-input {
        margin-bottom: 20px;
      }
      .q-field__prepend {
        padding-right: 5px;
      }
      .q-field {
        .q-field__control,
        .q-field__marginal {
          height: 52px;
        }
      }
      .footer {
        &-middle {
          text-align: center;
          margin-bottom: 20px;
          .login-btn,
          .register-btn {
            font-weight: bold;
            font-size: 16px;
            line-height: 26px;
            border-radius: 8px;
          }
        }
        &-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          .q-btn,
          span {
            font-weight: 500;
            font-size: 16px;
            line-height: 26px;
          }
          .q-btn {
            margin-left: 5px;
          }
        }
      }
    }
    .lang-switcher {
      margin-left: auto;
    }
    .otp-wrapper {
      text-align: center;
      .phone_number {
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
      }
      .desc {
        font-size: 14px;
        line-height: 24px;
        margin-top: 5px;
        margin-bottom: 40px;
      }
    }
  }
}
</style>

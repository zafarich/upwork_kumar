<script setup>
import BaseInput from "components/UI/BaseInput.vue";
import validate from "src/utils/validate";
import { ref, computed, reactive, nextTick } from "vue-demi";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { getServerError, sleep, trimBetween } from "src/utils/helpers";
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();
const $q = useQuasar();
const router = useRouter();

const loginError = ref(false);

const formRef = ref(null);
const form = ref({
  username: "",
  password: "",
  repeat_password: "",
});

const isPwd = ref(true);

async function tryLogin() {
  resetValidation();
  await sleep(10);
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(5000);

  $q.loading.show();

  try {
    const res = await authStore.login(form.value);
    const token = res?.access;
    if (token) {
      router.push({
        name: "dashboard",
      });
    }
  } catch (error) {
    console.log("error", error);
    loginError.value = getServerError(error, "errorMessage");
    await nextTick();
    await formRef.value.validate();
    resetValidation(5000);
  } finally {
    $q.loading.hide();
  }
}

let resetTimeout = 0;
function resetValidation(timeout = 0) {
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    loginError.value = false;
    formRef.value.resetValidation();
  }, timeout);
}
</script>

<template>
  <div class="login-page">
    <div class="card">
      <header class="header">Register</header>

      <q-form ref="formRef" class="login-form" @submit.prevent="tryLogin">
        <div class="form--title">Username</div>

        <BaseInput
          v-model="form.username"
          standout="standout-bg-gray"
          name="current-phone-number"
          placeholder="Enter username"
          :rules="[validate.required]"
          no-error-icon
          @update:model-value="resetValidation"
          @keyup.enter="tryLogin"
        >
        </BaseInput>
        <div class="form--title">Password</div>
        <BaseInput
          :model-value="form.password"
          standout="standout-bg-gray"
          placeholder="Enter password"
          name="current-pasword"
          :type="isPwd ? 'password' : 'text'"
          :rules="[validate.required]"
          no-error-icon
          append
          @keyup.enter="tryLogin"
          @update:model-value="
            (v) => {
              form.password = trimBetween(v);
              resetValidation();
            }
          "
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </BaseInput>

        <div class="form--title">Repeat password</div>
        <BaseInput
          :model-value="form.repeat_password"
          standout="standout-bg-gray"
          placeholder="Repeat"
          name="current-pasword"
          :type="isPwd ? 'password' : 'text'"
          :rules="[validate.required]"
          no-error-icon
          append
          @keyup.enter="tryLogin"
          @update:model-value="
            (v) => {
              form.password = trimBetween(v);
              resetValidation();
            }
          "
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </BaseInput>
        <footer class="footer">
          <div class="footer-middle">
            <q-btn
              color="primary"
              class="login-btn"
              label="Login"
              no-caps
              @click="tryLogin"
            />
          </div>

          <div class="flex justify-center mt-4">
            <div class="flex">
              I alerady signup
              <router-link class="ml-2" :to="{ name: 'login' }"
                >Sign in</router-link
              >
            </div>
          </div>
        </footer>
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  .login-card-mobile {
    width: 100%;
  }
  .phone_number {
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
  }
  .form {
    padding: 0 15px;
    width: 100%;
    input {
      border-radius: 8px;
    }
  }

  .forgot_password {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    &:hover {
      // color: $grey-4;
    }
  }
  .footer {
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
    }
    &-middle {
      margin-top: 60px;
      .login-btn {
        padding: 12px 77px;
      }
    }
  }
}
</style>
<style lang="scss">
.login-page {
  .footer {
    &-top {
      [aria-checked="false"] {
        .q-checkbox__bg {
          border-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style>

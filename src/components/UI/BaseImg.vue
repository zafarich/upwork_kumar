<script setup>
import { computed, useAttrs } from "vue-demi";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
});

const attrs = useAttrs();

const imgUrl = computed(() => {
  return props.src || "/product-placeholder.png";
});
</script>

<template>
  <q-img
    :src="imgUrl"
    class="base-img"
    v-bind="attrs"
    :draggable="false"
    fit="contain"
    spinner-size="18px"
  >
    <template v-slot:error>
      <q-img
        src="/product-placeholder.png"
        alt="error-placeholder"
        :width="attrs.width || '30px'"
        :height="attrs.height || '30px'"
        spinner-size="18px"
        :draggable="false"
        fit="contain"
      />
    </template>
  </q-img>
</template>

<style lang="scss" scoped>
.base-img {
  :deep(.q-img__content) {
    // text-align: center;
    > div {
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 6px;
    }
  }
}
</style>

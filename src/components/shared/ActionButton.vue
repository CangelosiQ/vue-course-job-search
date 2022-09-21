<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  name: "ActionButton",
  props: {
    text: {
      type: String,
      require: true,
      default: "click me",
    },
    type: {
      type: String,
      require: true,
      default: "primary",
      validator(value) {
        return ["primary", "secondary"].includes(value);
      },
    },
  },
  setup(props) {
    const buttonClass = computed(() => {
      return {
        [props.type]: true,
      };
    });
    return { buttonClass };
  },
};
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium;
}

.primary {
  @apply rounded text-white border-0 bg-brand-blue-1 hover:shadow-blue;
}

.secondary {
  @apply text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>

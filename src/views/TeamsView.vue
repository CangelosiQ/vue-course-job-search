<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>

    <template #subtitle>
      <h2 class="w-full my-4 text-base font-light">
        It's awesome working here. Why don't you come join us?
      </h2>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from "@/components/shared/HeaderContainer.vue";

export default {
  name: "TeamsView",
  components: {
    HeaderContainer,
  },
};
</script>

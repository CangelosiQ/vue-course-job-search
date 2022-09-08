<template>
  <div class="about">
    <h1>JobResultsView</h1>
    <button @click="goToHome">Go to Hom Page</button>
  </div>
</template>

<script>
export default {
  name: "JobResultsView",
  methods: {
    goToHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

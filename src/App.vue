<template>
  <div>
    <main-nav />
    <hero />
  </div>
</template>

<script>
import MainNav from "@/components/navigation/MainNav.vue";
import Hero from "@/components/jobSearch/Hero.vue";
export default {
  name: "App",
  components: {
    MainNav,
    Hero,
  },
};
</script>

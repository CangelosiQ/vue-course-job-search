<template>
  <div>
    <main-nav />
    <router-view />
    ZRO @ 2022 <a href="https://careers.google.com/">original</a>
  </div>
</template>

<script>
import MainNav from "@/components/navigation/MainNav.vue";
export default {
  name: "App",
  components: {
    MainNav,
  },
};
</script>

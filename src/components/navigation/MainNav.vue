<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link to="/" class="flex items-center h-full text-xl"
          >ZRO Careers
        </router-link>
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <router-link
                class="flex items-center h-full py-2.5"
                :to="{ name: menuItem.url }"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <profile-image v-if="isLoggedIn" data-test="profile-image" />
          <action-button
            v-else
            data-test="login-button"
            type="primary"
            text="Sign In"
            @click="LOGIN_USER()"
          />
        </div>
      </div>
      <div>
        <subnav v-if="isLoggedIn" data-test="subnav" />
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ActionButton from "@/components/shared/ActionButton.vue";
import ProfileImage from "@/components/navigation/ProfileImage.vue";
import Subnav from "@/components/navigation/Subnav.vue";
import { LOGIN_USER } from "@/store";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    Subnav,
  },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: "home" },
        { text: "Location", url: "home" },
        { text: "Life at ZRO Corp", url: "home" },
        { text: "How we hire", url: "home" },
        { text: "Students", url: "home" },
        { text: "Jobs", url: "jobs" },
      ],
    };
  },
  computed: {
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapMutations([LOGIN_USER]),
  },
};
</script>

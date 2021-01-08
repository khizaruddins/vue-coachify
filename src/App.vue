<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import TheHeader from "./components/layouts/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },

  created() {
    this.$store.dispatch("autoLogin");
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters["didAutoLogout"];
    },
  },
  watch: {
    didAutoLogout(currValue, oldValue) {
      if (currValue && currValue != oldValue) {
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-leave-from,
.route-leave-to {
  opacity: 1;
  transform: translateY(0px);
}

.route-enter-active {
  transition: all 0.4s ease-out;
}

.route-leave-active {
  transition: all 0.4s ease-in;
}
</style>

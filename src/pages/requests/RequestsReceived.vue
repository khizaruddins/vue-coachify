<template>
  <section>
    <base-dialog v-if="error" :show="error" @close="handleErrorClose">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-else-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <base-card v-else>
      <header>
        <h2>Requests received</h2>
      </header>
      <ul v-if="hasRequests">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        >
          Email {{ request.email }}
        </request-item>
      </ul>

      <h3 v-else>You haven't received requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from "./../../components/requests/RequestItem.vue";
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("requests/fetchRequests");
        this.isLoading = false;
      } catch (error) {
        this.error = error || "Something went wrong!!";
      }
    },
    handleErrorClose() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

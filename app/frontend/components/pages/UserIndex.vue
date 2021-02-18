<template>
  <div>
    <p>ログインしています</p>
    <div
      v-for="user in users"
      :key="user.id"
    >
      <p>{{ user }}</p>
    </div>
    <button
      v-if="!!authUser"
      @click="handleLogout"
    >
      ログアウト
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('users', ['users', 'authUser']),
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'logoutUser']),
    handleLogout() {
      this.logoutUser()
    },
  },
};
</script>

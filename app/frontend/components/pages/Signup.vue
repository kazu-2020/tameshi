<template>
  <div>
    <div>
      <label for="user[email]">メールアドレス</label>
      <input
        id="user[email]"
        v-model="user.email"
        type="email"
      >
    </div>
    <div>
      <label for="user[password]">パスワード</label>
      <input
        id="user[password]"
        v-model="user.password"
        type="password"
      >
    </div>
    <div>
      <label for="user[password_confirmation]">確認用</label>
      <input
        id="user[password_confirmation]"
        v-model="user.password_confirmation"
        type="password"
      >
    </div>
    <button @click="handleCreateUser">
      新規登録
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  methods: {
    ...mapActions('users', ['createUser']),
    handleCreateUser() {
      this.createUser(this.user)
    },
  },
};
</script>

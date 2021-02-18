<template>
  <div>
    <p>ログイン画面</p>
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
    <button @click="handleLoginUser">
      ログインする
    </button>
    <router-link :to="{ name: 'Signup' }">
      新規作成画面
    </router-link>
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
      },
    };
  },
  methods: {
    ...mapActions('users', ['loginUser']),
    handleLoginUser() {
      this.loginUser(this.user)
    }
  },
};
</script>

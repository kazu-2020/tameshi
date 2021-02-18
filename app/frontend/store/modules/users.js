import axios from '../../plugins/axios';
import router from '../../router/index';

const state = {
  authUser: null,
  users: [],
};

const getters = {
  authUser: (state) => state.authUser,
  users: (state) => state.users,
};

const mutations = {
  setAuthUser(state, user) {
    state.authUser = user;
  },
  fetchUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  createUser(context, user) {
    axios.post('users', { user: user })
      .then(() => router.push('/login'))
      .catch((error) => alert(error.response.data))
  },
  fetchUsers({ commit }) {
    axios.get('users').then((res) => commit('fetchUsers', res.data));
  },
  loginUser({ commit }, user) {
    // api::sessions#createにリクエスト送ります。
    axios.post('sessions', { session: user })
    // 認証に成功した場合
      .then((res) => {
        // mutationsを通して、authUserの状態を更新しています。
        commit('setAuthUser', res.data)
        // 「/users」にページを切り替えています。
        router.push({ name: 'UserIndex' })
      })
    // 認証に失敗した場合は、alertを表示します。
      .catch(() => alert('ログインに失敗しました'))
  },
  logoutUser({ commit }) {
    // api::sessions#destroyにリクエストを送ります。
    axios.delete('sessions')
      .then(() => {
        // stateにあるauthUserを廃棄します。
        commit('setAuthUser', null);
        // ログインページに切り替わります。
        router.push({ name: 'Login' });
      })
      .catch((error) => console.log(error))
  },
  // ここは「ナビゲーションガード」で使用します。
  async fetchAuthUser({ commit, state }) {
    // vuex内に「current_user」の情報がある場合はそれを使用します。
    if (state.authUser) return state.authUser;
    // ここはブラウザ側でリロードされた際、認証済のユーザ-情報を維持する為に「current_user」を返します.
    const userResponse = await axios.get('users/me');

    if (!userResponse) return null;

    commit('setAuthUser', userResponse.data);
    return userResponse.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

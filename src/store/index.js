import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    colorState: "#00DBCF",
    user: "",
    friends: []
  },
  mutations: {
    setColorState(state, data) {
      state.colorState = data;
    },
    setAuthSuccess(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    addFriend(state, friend) {
      state.friends.unshift(friend);
    }
  },
  actions: {
    async registerUser({ commit }, payload) {
      let response = await axios.post(
        "https://billsplitapi.herokuapp.com/bills/signup",
        payload
      );
      return response;
    },
    async loginUser({ commit }, payload) {
      let response = await axios.post(
        "https://billsplitapi.herokuapp.com/bills/login",
        payload
      );
      const token = response.data.message.access_token;
      const user = response.data.message.user;
      localStorage.setItem("token", token);
      commit("setAuthSuccess", user);
      return response;
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["user", "isLoggedIn", "friends"]
    })
  ]
});

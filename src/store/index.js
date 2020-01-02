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
    bills: ""
  },
  getters: {
    cummulateAccount: state => {
      let totalAccount = [];
      if (state.bills.length)
        state.bills.forEach(x => {
          let k = x.bill_recipients;
          k.forEach(x => {
            totalAccount.push(Math.round(x.amount));
          });
        });
      if (totalAccount.length) return totalAccount.reduce((a, b) => a + b, 0);
    }
  },
  mutations: {
    setColorState(state, data) {
      state.colorState = data;
    },
    setAuthSuccess(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    setBills(state, bills) {
      state.bills = bills;
    },
    logout(state) {
      state.isLoggedIn = false;
      (state.user = ""), (state.bills = "");
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
    },
    async createBill({ commit }, payload) {
      let response = await axios.post(
        "https://billsplitapi.herokuapp.com/bills/create",
        payload
      );
      return response;
    },
    async getBills({ commit, state }) {
      let response = await axios.get(
        `https://billsplitapi.herokuapp.com/bills/list?user_account_id=${state.user.user_account_id}`
      );
      commit("setBills", response.data.message);
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["user", "isLoggedIn"]
    })
  ]
});

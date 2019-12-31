<template>
  <b-form @submit.stop.prevent class="mt-5">
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      class="cssClass grey"
      @dismiss-count-down="countDownChanged"
    >
      <div v-for="(err, index) in error" :key="index">
        {{ err[0] }}
      </div>
    </b-alert>
    <div class="mb-4">
      <h6 class="text-white">
        USERNAME
      </h6>
      <input
        v-model="registerForm.username"
        class="input-area"
        placeholder="Enter your Username"
        type="text"
        required
      />
    </div>
    <div class="mt-4">
      <h6 class="text-white pt-3">
        EMAIL
      </h6>
      <input
        v-model="registerForm.email"
        class="input-area"
        placeholder="Enter your Email"
        type="email"
        required
      />
    </div>
    <div class="mt-4">
      <h6 class="text-white pt-3">
        PASSWORD
      </h6>
      <input
        v-model="registerForm.password"
        class="input-area"
        placeholder="Enter your Pasword"
        type="password"
        required
      />
    </div>
    <div>
      <button
        :disabled="!btnDisabled"
        @click="register"
        class="btn cssClass btn-sub login register grey"
      >
        Submit
      </button>
    </div>
  </b-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: ""
      },
      error: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      btnDisabled: false
    };
  },
  watch: {
    registerForm: {
      deep: true,
      immediate: true,
      handler(x) {
        Object.keys(x).some(o => {
          console.log(x[o] === "");
          let k = x[o] === "";
          this.btnDisabled = !k;
        });
      }
    }
  },
  methods: {
    ...mapActions(["registerUser", "loginUser"]),
    async register() {
      try {
        let res = await this.registerUser(this.registerForm);
        let loginData = {};
        loginData.email = res.data.message.user.email;
        loginData.password = this.registerForm.password;
        let newRes = await this.loginUser(loginData);
        if (newRes.data.status == "ok") this.$router.push("/home");
      } catch (err) {
        if (err.response.data.status == "error") this.error = null;
        this.error = err.response.data.message;
        this.dismissCountDown = this.dismissSecs;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>

<style scoped>
.input-area {
  width: 100%;
  background: transparent;
  border-bottom: 1px solid white;

  border-left: none;
  border-top: none;
  border-right: none;
  color: white;
  padding-top: 3px;
  padding-bottom: 5px;
}
.input-area::placeholder {
  color: white;
  opacity: 0.7;
}
.btn-sub {
  padding: 8px 30px;
  margin-top: 40px;
  box-shadow: 0px 36px 48px -2px rgba(0, 0, 0, 0.72);
  color: white;
  z-index: 3;
}
</style>
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 50px #2c3b4f inset !important;
  -webkit-text-fill-color: white !important;
}
.grey {
  color: #2d3436 !important;
}
</style>

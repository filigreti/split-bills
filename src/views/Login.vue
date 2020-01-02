<template>
  <div class="mt-5">
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
    <div class="mt-4">
      <h6 class="text-white pt-3">
        EMAIL
      </h6>
      <input
        class="input-area"
        placeholder="Enter your Email"
        type="email"
        v-model="loginForm.email"
        required
      />
    </div>
    <div class="mt-4">
      <h6 class="text-white pt-3">
        PASSWORD
      </h6>
      <input
        class="input-area"
        placeholder="Enter your Pasword"
        type="password"
        required
        v-model="loginForm.password"
      />
    </div>
    <div>
      <button @click="login" class="btn cssClass btn-sub login register grey">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      error: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      btnDisabled: false
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async login() {
      try {
        let res = await this.loginUser(this.loginForm);
        if (res.data.status == "ok") this.$router.push("/home");
      } catch (err) {
        console.log(err);
        this.error = null;
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
</style>

<template>
  <div id="app">
    <img class="img-fluid main-logo" src="@/assets/logo.jpg" alt="" />
    <div id="nav">
      <b-button-group>
        <router-link
          exact-active-class="cssClass"
          class="btn btn-old login "
          to="/access/login"
          >Login</router-link
        >
        <router-link
          exact-active-class="cssClass"
          class="btn btn-old register"
          to="/access/register"
          >Register</router-link
        >
      </b-button-group>
    </div>
    <div class="main-container d-flex">
      <div class=" main">
        <Slider />
      </div>
      <div
        :class="
          [this.$route.name === 'Login' || this.$route.name === 'Register']
            ? 'router-area'
            : 'w-100'
        "
      >
        <div class="router-cont w-100">
          <div class="d-flex align-items-center w-100">
            <h2
              :class="
                this.$route.name == 'Login'
                  ? ['active-white', 'cssClassTwo']
                  : 'dim-white'
              "
            >
              Login
            </h2>
            <span class="ml-2 dim-white">Or</span>
            <h2
              :class="
                this.$route.name == 'Register'
                  ? ['active-white', 'cssClassTwo']
                  : 'dim-white'
              "
              class="ml-3"
            >
              Register
            </h2>
          </div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "../components/Slider";
export default {
  data() {
    return {};
  },
  components: {
    Slider
  },
  watch: {
    "$store.state.colorState": {
      deep: true,
      immediate: true,
      handler(x) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = `.cssClass { background:${x} ; }`;
        document.getElementsByTagName("head")[0].appendChild(style);
        var styleTwo = document.createElement("style");
        styleTwo.type = "text/css";
        styleTwo.innerHTML = `.cssClassTwo { border-bottom:2px solid ${x} ; }`;
        document.getElementsByTagName("head")[0].appendChild(styleTwo);
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap");
#app {
  font-family: "Roboto Condensed", sans-serif;
}
*:focus {
  outline: 0 !important;
  box-shadow: none;
}

#nav {
  position: fixed;
  right: 5vw;
  top: 5vh;
  z-index: 2;
}

#nav a {
  font-weight: bold;
  color: #ffffffc9;
  font-size: 14px;
}

.btn-old {
  width: 80px;
  outline: none !important;
  box-shadow: 0px 2px 32px 10px rgba(0, 0, 0, 0.39);
  background-image: linear-gradient(
    to right,
    #4b5c72,
    #495a6f,
    #48586c,
    #46566a,
    #455467
  );
}
.login {
  border-top-left-radius: 50px !important;
  border-bottom-left-radius: 50px !important;
}
.register {
  border-top-right-radius: 50px !important;
  border-bottom-right-radius: 50px !important;
}
.main-logo {
  position: fixed;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  z-index: 2;
  left: 3vw;
  top: 4vh;
  box-shadow: 0px 2px 32px 5px rgba(0, 0, 0, 0.3);
}
.main {
  width: 50%;
}
.router-area {
  display: flex;
  width: 50%;
  box-sizing: border-box;
  padding: 70px 100px 70px 70px;
  justify-items: center;
  align-items: center;
  background-image: linear-gradient(
    to top,
    #253244,
    #29384b,
    #2d3d52,
    #324359,
    #364960
  );
}
.dim-white {
  color: white;
  opacity: 0.5;
  padding-bottom: 5px;
  cursor: pointer;
}
.active-white {
  color: white;
  padding-bottom: 5px;
  cursor: pointer;
}
</style>

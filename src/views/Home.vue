<template>
  <div class="home">
    <add-user :show="modalOpen" @createmodalhide="modalOpen = false" />
    <!-- <div
      v-show="this.$store.state.friends.length > 0"
      class="circle"
    >{{this.$store.state.friends.length}}</div>-->
    <div class="logo d-flex align-items-center">
      <img class="img-fluid" src="@/assets/logo.jpg" alt />
      <div @click="modalOpen = true" class="ml-3 plus-body d-flex align-items-center">
        <i class="fas fa-plus"></i>
        <span style=" font-size:10px ;width:100px; margin-left:10px">Create Bill</span>
      </div>
    </div>

    <div class="home-container">
      <div class="first d-flex flex-column">
        <div>
          <h3 class="text-center pb-4">{{capitalizeFirstLetter}}</h3>
          <div class="home-friend mb-3">
            <span>Friends</span>
            <div class="d-flex align-items-center justify-content-between cont-size mt-1">
              <div class="home-number">{{this.$store.state.friends.length}}</div>
              <div class>
                <b-progress :max="max" :value="value" class="prog-width" height="3px"></b-progress>
              </div>
            </div>
          </div>
          <div class="home-friend">
            <span>Created Bills</span>
            <div class="d-flex align-items-center justify-content-between cont-size mt-1">
              <div class="home-number">0</div>
              <div class>
                <b-progress :max="max" :value="value" class="prog-width" height="3px"></b-progress>
              </div>
            </div>
          </div>
        </div>
        <!-- {{this.$store.state.friends}} -->
      </div>
    </div>

    <!-- {{ this.$store.state.user }} -->
  </div>
</template>

<script>
import AddUser from "../components/AddUser";
export default {
  data() {
    return {
      modalOpen: false,
      value: this.$store.state.friends.length,
      max: 10
    };
  },
  components: {
    AddUser
  },
  computed: {
    capitalizeFirstLetter() {
      let username = this.$store.state.user.username;
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
.home {
  background: #fcfbfc;
  color: #30336b;
  font-family: "Open Sans", sans-serif;
}
.logo {
  height: 70px;
  width: 70px;
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 10;
}
.first {
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.home-container {
  width: 30%;
  height: 100vh;
  border-right: 0.5px solid rgba(199, 181, 181, 0.61);
}
.plus-body {
  color: #a4a5aa;
}
.first h3 {
  font-weight: bolder;
  letter-spacing: 1px;
  font-size: 2rem;
}
.circle {
  position: fixed;
  right: 50px;
  top: 30px;
  border-radius: 50px;
  box-shadow: 0px 0px 82px -20px rgba(0, 0, 0, 0.33) !important;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: #0b3254;
  z-index: 10000;
}
.home-friend {
  padding-left: 5px;
}
.home-friend span {
  color: #a4a5aa;
  font-size: 10px;
}
.home-number {
  font-size: 16px;
}
.prog-width {
  width: 80px;
  margin-right: -5px;
}
</style>
<style>
.progress-bar {
  background-color: #ff7979;
  opacity: 0.5;
}
.modal-footer {
  background: #f6f8fa;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  border: none;
  border-radius: 0 !important;
  box-shadow: 0px 0px 82px -20px rgba(0, 0, 0, 0.33) !important;
}
.modal-backdrop {
  background: #f3f5f7;
  opacity: 0.9;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 50vw;
    margin: 4rem auto;
  }
}
</style>

<template>
  <div class="home d-flex">
    <add-user :show="modalOpen" @createmodalhide="modalOpen = false" />
    <div class="logo d-flex align-items-center">
      <img class="img-fluid" src="@/assets/logo.jpg" alt />
      <div
        @click="modalOpen = true"
        class="ml-3 plus-body d-flex align-items-center"
      >
        <i class="fas fa-plus"></i>
        <span style=" font-size:10px ;width:100px; margin-left:10px"
          >Create Bill</span
        >
      </div>
    </div>

    <div class="home-container">
      <div class="first d-flex flex-column">
        <div>
          <h3 class="text-center pb-4">{{ capitalizeFirstLetter }}</h3>
          <div v-if="this.$store.state.bills">
            <div v-if="this.$store.state.bills.length">
              <div class="home-friend mb-3">
                <span>Created Bills</span>
                <div
                  class="d-flex align-items-center justify-content-between cont-size mt-1"
                >
                  <div class="home-number">
                    {{ this.$store.state.bills.length }}
                  </div>
                  <div class>
                    <b-progress
                      :max="Number(50)"
                      :value="this.$store.state.bills.length"
                      class="prog-width"
                      height="3px"
                    ></b-progress>
                  </div>
                </div>
              </div>
              <div class="home-friend">
                <span>Amount Shared</span>
                <div
                  class="d-flex align-items-center justify-content-between cont-size mt-1"
                >
                  <div
                    class="home-number"
                    v-if="cummulateAccount !== undefined"
                  >
                    ₦{{
                      cummulateAccount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </div>
                  <div class>
                    <b-progress
                      :max="Number(500000)"
                      :value="cummulateAccount"
                      class="prog-width"
                      height="3px"
                    ></b-progress>
                  </div>
                </div>
              </div>
            </div>
            <div v-else></div>
          </div>
          <div class="text-center" v-else>
            <b-spinner label="Spinning "></b-spinner>
          </div>
        </div>
      </div>
    </div>
    <div class="second">
      <div
        class="header"
        :class="
          search
            ? ' w-100 justify-content-between d-flex align-items-center pr-5  '
            : ' w-100 justify-content-center d-flex align-items-end flex-column pr-5 '
        "
      >
        <input
          v-if="search"
          v-model="searchBill"
          class="second-input"
          type="text"
        />
        <div>
          <i
            v-if="this.$store.state.bills.length > 0"
            @click="search = !search"
            class="fas fa-search ml-"
          ></i>
          <i @click="signout" class="fas fa-sign-out-alt ml-4"></i>
        </div>
      </div>
      <div v-if="this.$store.state.bills">
        <show-bill
          v-if="this.$store.state.bills.length > 0"
          :filteredSearch="filteredSearch"
          class="mt-5"
        />
        <div
          style="height:50vh"
          class="w-100 d-flex justify-content-center align-items-center"
          v-else
        >
          <h3 class="text-center">Create A New Bill</h3>
        </div>
      </div>
      <div
        class="text-center d-flex align-items-center justify-content-center w-100 h-50"
        v-else
      >
        <b-spinner label="Spinning "></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddUser from "../components/AddUser";
import ShowBill from "./ShowBill";
export default {
  data() {
    return {
      modalOpen: false,
      max: 10,
      search: false,
      searchBill: ""
    };
  },
  components: {
    AddUser,
    ShowBill
  },
  methods: {
    ...mapActions(["getBills", "logout"]),
    signout() {
      this.logout();
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["cummulateAccount"]),
    capitalizeFirstLetter() {
      let username = this.$store.state.user.username;
      return username.charAt(0).toUpperCase() + username.slice(1);
    },
    filteredSearch() {
      if (this.$store.state.bills)
        return this.$store.state.bills.filter(bill => {
          return bill.title.match(this.searchBill);
        });
    }
  },
  async created() {
    await this.getBills();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
.home {
  background: white;
  color: #30336b;
  font-family: "Open Sans", sans-serif;
}
.logo {
  height: 70px;
  width: 70px;
  position: fixed;
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
  width: 35%;
  height: 100vh;
  border-right: 0.5px solid rgba(199, 181, 181, 0.61);
  position: sticky;
  top: 0;
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
  margin-right: -55px;
}
.second {
  width: 100%;
  position: relative;
}
.second-input {
  width: 70%;
  border-radius: 50px;
  padding: 8px 0;
  border: 1px solid rgba(199, 181, 181, 0.61);
  outline: none;
  padding-left: 15px;
  margin-left: 100px;
}

.icon-header {
  position: absolute;
  right: 40px;
}
.header {
  height: 16vh;
  position: sticky;
  top: 0px;
  background: white;
  z-index: 100;
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

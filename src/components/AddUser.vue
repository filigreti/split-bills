<template>
  <div class="add-user">
    <b-modal ref="my-modal" v-model="modalProp" hide-header id="modal-center">
      <div class="modal-cont">
        <b-alert
          class="new-area"
          :show="dismissCountDown"
          dismissible
          fade
          :class="status == 'Error' ? ['bg-danger','text-white'] : ['bg-primary','text-white']"
          @dismiss-count-down="countDownChanged"
        >
          <div v-for="(err, index) in error" :key="index">{{ err[0] }}</div>
        </b-alert>
        <div class="header d-flex justify-content-between align-items-center px-4 pt-3">
          <h3>
            Create Bill for
            <input
              @input="updateValue"
              class="bill-input pl-1"
              type="number"
              min="1"
              max="10"
              v-model.number="form"
            />
            {{form == 1 ? 'Person' : 'People'}}
          </h3>
          <i @click="cancel()" class="fas fa-times fa-lg"></i>
        </div>
        <div class="mt-4 px-4 d">
          <div>
            <h6 class="email-text">Title</h6>
            <div class="d-flex justify-content-between align-items-center">
              <input
                class="email-box"
                type="text"
                placeholder="Enter Bill Title"
                v-model="bill.title"
              />
            </div>
          </div>
        </div>
        <div class="mt-3 px-4 d">
          <div>
            <h6 class="email-text">Description</h6>
            <div class="d-flex justify-content-between align-items-center">
              <input
                class="email-box"
                type="text"
                placeholder="Enter Description"
                v-model="bill.description"
              />
            </div>
          </div>
        </div>
        <div style="position:relative;" class="px-4 d">
          <div class="icon-cont">
            <!-- <i @click="form++" class="fas fa-plus email-plus"></i> -->
          </div>

          <div v-for="(x,index) in bill.recipients" :key="index" class="d-flex mt-3">
            <div class="d-flex align-items-center">
              <div>
                <h6 class="email-text">Email Address</h6>
                <div class="d-flex align-items-center">
                  <input
                    class="email-box"
                    type="email"
                    placeholder="Enter Email Address"
                    v-model="x.email"
                  />
                </div>
              </div>
              <div class="ml-4">
                <h6 class="email-text">Amount</h6>
                <div class="d-flex align-items-center">
                  <input class="price-box" type="number" placeholder="Amount" v-model="x.amount" />
                  <i v-if="index > 0" @click="remove(index)" class="far fa-trash-alt ml-5"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <button @click="getBillData" class="btn btn-blue">Create New Bill</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["show"],
  data() {
    return {
      form: 1,
      status: "",
      open: null,
      error: null,
      dismissSecs: 2,
      dismissCountDown: 0,
      bill: {
        user_account_id: this.$store.state.user.user_account_id,
        title: "",
        description: "",
        recipients: [
          {
            email: "",
            amount: ""
          }
        ]
      }
    };
  },
  computed: {
    modalProp: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("createmodalhide", val);
      }
    }
  },
  watch: {
    form(x, y) {
      let k = this.makeRecepientsObj(x);
      if (x > y) {
        this.bill.recipients.push(k);
      } else {
        this.$delete(this.bill.recipients, x);
      }
    }
  },
  methods: {
    ...mapActions(["createBill", "getBills"]),
    updateValue(x) {
      const value = x.target.value;
      if (value === 0 || value === null || value === "") {
        this.form = 1;
      } else if (value >= 10) {
        this.form = 10;
      }
    },
    async getBillData() {
      try {
        let res = await this.createBill(this.bill);
        let Info = ["New Bill Created"];
        if (res.data.status == "ok") this.status = "";
        this.status = "ok";
        this.getBills();
        this.error = [];
        this.error.push(Info);
        this.dismissCountDown = this.dismissSecs;
        this.restore();
        setTimeout(() => {
          this.$refs["my-modal"].hide();
        }, 3000);
      } catch (err) {
        this.status = "";
        this.error = null;
        this.status = "Error";
        this.error = err.response.data.message;
        this.dismissCountDown = this.dismissSecs;
      }
    },
    cancel() {
      this.restore();
      this.$refs["my-modal"].hide();
    },
    remove(x) {
      this.$delete(this.bill.recipients, x);
      this.form = this.bill.recipients.length;
    },
    makeRecepientsObj(x) {
      var recepients = {};
      for (var i = 0; i < x; ++i) {
        recepients[i];
      }
      return recepients;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    restore() {
      this.bill.title = "";
      this.bill.description = "";
      this.form = 1;
      this.status = "";
      this.bill.recipients = [
        {
          email: "",
          amount: ""
        }
      ];
    }
  }
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #e6e5e7;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}
.email-text {
  font-size: 12px;
  font-weight: bolder;
}
.email-box {
  width: 22vw;
  margin-top: 5px;
  padding: 5px 0px 5px 10px;
  font-size: 14px;
  outline: none;
}
.price-box {
  width: 8vw;
  margin-top: 5px;
  padding: 5px 0px 5px 10px;
  font-size: 14px;
  outline: none;
}

.modal-cont {
  height: 55vh;
  padding: 0px 40px 10px;
  overflow-y: auto;
}
.bill-input {
  width: 70px;
  outline: none;
}
.btn-blue {
  background-color: #3f84f6;
  color: white;
  width: 80%;
  padding: 15px 0;
  font-size: 12px;
  border-radius: 0px;
}
.new-area {
  position: fixed;
  right: 10px;
  z-index: 100000;
}
</style>
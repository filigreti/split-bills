<template>
  <div class="add-user">
    <b-modal v-model="modalProp" hide-header id="modal-center">
      <div class="modal-cont">
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
          <i @click="$bvModal.hide('modal-center')" class="fas fa-times fa-lg"></i>
        </div>
        <div class="mt-4 px-4 d">
          <div>
            <h6 class="email-text">Title</h6>
            <div class="d-flex justify-content-between align-items-center">
              <input
                class="email-box"
                type="email"
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
                type="email"
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
                <input
                  class="email-box"
                  type="email"
                  placeholder="Enter Email Address"
                  v-model="x.email"
                />
              </div>
              <div class="ml-4">
                <h6 class="email-text">Amount</h6>
                <input class="price-box" type="email" placeholder="Amount" v-model="x.amount" />
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
import { mapMutations } from "vuex";
export default {
  props: ["show"],
  data() {
    return {
      form: 1,
      open: null,
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
    updateValue(x) {
      const value = x.target.value;
      if (value === 0 || value === null || value === "") {
        this.form = 1;
      } else if (value >= 10) {
        this.form = 10;
      }
    },
    getBillData() {
      console.log(this.bill);
    },

    makeRecepientsObj(x) {
      var recepients = {};
      for (var i = 0; i < x; ++i) {
        recepients[i];
      }
      return recepients;
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
/* .email-plus {
  position: fixed;
  bottom: 28.5vh;
  left: 28vw;
  z-index: 2;
} */
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
  width: 77%;
  padding: 15px 0;
  font-size: 12px;
  border-radius: 0px;
}
</style>
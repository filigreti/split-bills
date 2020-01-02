<template>
  <div>
    <div>
      <div v-if="filteredSearch.length" class="card-cont">
        <b-card
          @click="openModal(bill)"
          v-for="(bill, index) in filteredSearch"
          :key="bill.id"
          class="purple mb-4"
          :class="change(index)"
          text-variant="white"
        >
          <blockquote class="card-blockquote">
            <p>{{ bill.title }}</p>
            <footer>
              <small>{{ bill.description }}</small>
            </footer>
          </blockquote>
        </b-card>
      </div>
      <div
        style="height:50vh"
        class="text-center d-flex align-items-center w-100 justify-content-center"
        v-else
      >
        <h1 style="color:#273c75; font-weight:bolder">
          No results
        </h1>
      </div>
    </div>
    <b-modal size="sm" hide-header hide-footer v-model="modalShow">
      <div v-if="modalInfo" class="view-modal p-5 d-flex  flex-column">
        <div class="d-flex align-items-center">
          <small class="d-flex flex-column "
            ><div class="mb-3">Bill id:</div>
            <div class="mb-3">Title:</div>
            <div class="mb-3">Description:</div>
            <div class="mb-3">Created:</div>
            <div class="mb-3">Updated:</div>
          </small>
          <small class="d-flex flex-column ml-5">
            <div class="mb-3">{{ modalInfo.bill_id }}</div>
            <div class="mb-3">{{ modalInfo.title }}</div>
            <div class="mb-3">{{ modalInfo.description }}</div>
            <div class="mb-3">{{ modalInfo.created_at }}</div>
            <div class="mb-3">{{ modalInfo.updated_at }}</div>
          </small>
        </div>
        <div class="grid-card">
          <div v-for="(item, index) in modalInfo.bill_recipients" :key="index">
            <div class="card shadow p-3">
              <small
                style="color:#8395a7; font-weight:bolder; font-size:10px"
                >{{ item.bill_id }}</small
              >
              <small style="color:#273c75; font-weight:bolder">{{
                item.email
              }}</small>
              <small class="d-flex align-items-end justify-content-end w-100">
                ₦{{ item.amount }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["filteredSearch"],
  data() {
    return {
      bills: null,
      modalShow: false,
      modalInfo: null
    };
  },
  methods: {
    change(x) {
      let a = Math.floor(Math.random() * this.filteredSearch.length);
      let cssClass = [
        "card-purple-blue",
        "card-salmon-pink",
        "card-blue-green",
        "card-purple-pink "
      ];
      var randomNumber = Math.floor(Math.random() * cssClass.length);
      if ((x = a)) {
        return cssClass[randomNumber];
      }
    },
    openModal(x) {
      this.modalShow = !this.modalShow;
      this.modalInfo = x;
      console.log(this.modalInfo);
    }
  }
};
</script>

<style scoped>
.purple {
  background: #6c70f8;
  border-radius: 20px;
  box-shadow: 1px 1px 17px 1px rgba(0, 0, 0, 0.16);
}
.card-cont {
  width: 70%;
  margin: 20px 0 0 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 30px;
}
.card-purple-blue {
  background: linear-gradient(45deg, #6d80fe 0%, #23d2fd 100%);
  box-shadow: 0 5px 20px rgba(35, 210, 253, 0.3);
}

.card-salmon-pink {
  background: linear-gradient(45deg, #ff998b 0%, #ff6d88 100%);
  box-shadow: 0 5px 20px rgba(255, 153, 139, 0.3);
}

.card-blue-green {
  background: linear-gradient(45deg, #09afe8 0%, #29f499 100%);
  box-shadow: 0 5px 20px rgba(41, 244, 153, 0.3);
}

.card-purple-pink {
  background: linear-gradient(45deg, #707cff 0%, #fa81e8 100%);
  box-shadow: 0 5px 20px rgba(250, 129, 232, 0.3);
}
.grid-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 10px;
}
</style>

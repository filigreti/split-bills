<template>
  <carousel
    @page-change="exact"
    :per-page="1"
    :mouse-drag="true"
    :loop="true"
    :autoplay="true"
    :autoplayTimeout="10000"
  >
    <slide
      @change="exact(img.color)"
      @slide-click="exact"
      v-for="(img, index) in image"
      :key="index"
    >
      <div class="quote">
        <div class="w-50">{{ img.quote }}</div>
      </div>
      <div
        @change="exact(img.color)"
        :style="`background:${img.color}`"
        class="slide-container"
      >
        <img class="img" :src="img.src" alt="" />
      </div>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      current: "",
      image: [
        {
          src:
            "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-v-i-poyd-060_2.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1600&s=dcc19db5d85ab2b16ac2e053b2a4877b",
          color: "#00DBCF",
          quote: `It should be "Split the bills"         
          instead of "You pay the bills"`
        },
        {
          src:
            "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-v-i-poyd-042_2.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1600&s=da61ac579d432a7bce2e9f53683f2b93https://moneygoody.com/wp-content/uploads/2018/01/How-to-Split-Bills-With-a-Roommate.png",
          color: "#FEDA8F",
          quote: `"I will love to split your bill into twelve seperate cheques!"..... said no server ever `
        },
        {
          src:
            "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-v-i-poyd-033_2.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1600&s=83de65b09c6588fdc6271449862282f7",
          color: "#95CAF5",
          quote: "Key Questions:So i got fifty, you paying the remaining 30"
        },
        {
          src:
            "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-v-i-poyd-02_1.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1600&s=142dded0db5bc22595780bf390d7c12d",
          color: "#FF824D",
          quote: `If the  wage is a 100, then you throw a 50
                    My ni***, we better together  -- Tory Lanez`
        }
      ]
    };
  },
  components: {
    Carousel,
    Slide
  },
  methods: {
    exact(x) {
      switch (x) {
        case 0:
          this.current = "#00DBCF";
          break;
        case 1:
          this.current = "#FEDA8F";
          break;
        case 2:
          this.current = "#95CAF5";
          break;
        case 3:
          this.current = "#FF824D";
      }
    }
  },
  watch: {
    current(x) {
      this.$store.commit("setColorState", x);
    }
  }
};
</script>

<style>
.img {
  height: 50vh;
  width: 30vw;
  object-fit: cover;
  position: absolute;
  top: 60%;
  right: 50%;
  transform: translate(50%, -50%);
  box-shadow: 0px 2px 32px 5px rgba(0, 0, 0, 0.39);
}
.VueCarousel-pagination {
  position: fixed !important;
  bottom: 5vh;
  right: 25%;
}
.slide-container {
  position: relative;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
}
.VueCarousel-dot--active {
  background: white !important;
  width: 10px !important;
  height: 10px !important;
  background-clip: content-box !important;
  box-sizing: unset !important;
  box-shadow: 0px 2px 32px 10px rgba(0, 0, 0, 0.19);
}
.quote {
  position: absolute;
  z-index: 1;
  width: 100%;
  font-size: 18px;
  color: #333333;
  font-size: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15vh;
}
</style>

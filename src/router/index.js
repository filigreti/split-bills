import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/access/login"
  },
  {
    path: "/access",
    redirect: "/access/login",
    component: () => import("../views/Access.vue"),
    children: [
      { path: "login", name: "Login", component: Login, alias: "/access" },
      {
        path: "register",
        name: "Register",
        component: () => import("../views/Register.vue")
      }
    ]
  },

  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;

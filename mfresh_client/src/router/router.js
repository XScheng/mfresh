import { routes } from "./routes";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//VueRouter's setting
export const router = new VueRouter({
  base:"/",
  mode:"hash",
  routes
})

// 第一步使用vue-router
import Vue from "vue";
import VueRouter from "vue-router";
import address from "./components/Address.vue";
import all from "./components/All.vue";
import form from "./components/Form.vue";
import member from "./components/Member.vue";
Vue.use(VueRouter);
// 创建vue-router实例
const routes = [{
    path: "/",
    component: member
  },
  {
    path: "/address",
    component: address,
    children: [{
        path: "",
        redirect: "all"
      },
      {
        path: "all",
        component: all
      },
      {
        path: "form",
        component: form
      }
    ]
  }
];
const router = new VueRouter({
  routes
});
// 根组件注入
new Vue({
  el: "#app",
  router
});

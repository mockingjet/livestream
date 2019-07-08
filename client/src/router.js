import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import(/* webpackChunkName: "chat" */ "./views/Chat.vue")
    },
    {
      path: "/live",
      name: "live",
      component: () => import(/* webpackChunkName: "live" */ "./views/Live.vue")
    },
    {
      path: "/watch",
      name: "watch",
      component: () => import(/* webpackChunkName: "watch" */ "./views/Watch.vue")
    }
  ]
});

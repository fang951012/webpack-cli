import Vue from 'vue'
import VueRouter from 'vue-router'

import Page1 from './components/Page1.vue'
import Page2 from './components/Page2.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/',
    name:'page1',
    component: Page1
  },{
    path: '/page2',
    name:'page2',
    component: Page2
  }]
})
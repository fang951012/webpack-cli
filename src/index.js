// // import _ from 'lodash'

// import './css/style.css';
// import './css/style1.css';
// async function a(){
//     const {default: _} = await import (/* webpackChunkName: "lodash" */ 'lodash') 
//     console.log(_.join(['a','b','c'],','))
// }
// a()

// if('serviceWorker' in navigator){
//     window.addEventListener('load',()=>{
//         navigator.serviceWorker.register('/service-worker.js').then(reg =>{
//             console.log(reg, 'serviceWorket注册成功')
//         }).catch(error =>{
//             console.log(error, '注册失败')
//         })
//     })
// }

// import axios from 'axios';
// function list(){
//     axios.get('/api/list').then((res)=>{
//         console.log(res)
//     })
// }
// list()

//引入组件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

new Vue({
    router,
    store,
    render:h => h(App)
  }).$mount('#app')
  
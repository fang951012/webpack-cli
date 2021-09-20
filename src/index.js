// import _ from 'lodash'

import './css/style.css';
import './css/style1.css';

async function a(){
    const {default: _} = await import (/* webpackChunkName: "lodash" */ 'lodash') 
    console.log(_.join(['a','b','c'],','))
}
a()


if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/service-worker.js').then(reg =>{
            console.log(reg, 'serviceWorket注册成功')
        }).catch(error =>{
            console.log(error, '注册失败')
        })
    })
}
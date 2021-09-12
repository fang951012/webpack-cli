// import _ from 'lodash'

import './css/style.css';
import './css/style1.css';

async function a(){
    const {default: _} = await import (/* webpackChunkName: "lodash" */ 'lodash') 
    console.log(_.join(['a','b'],','))
}
a()
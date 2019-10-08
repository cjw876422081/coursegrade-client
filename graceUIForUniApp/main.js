import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.staticUrl = "https://staticimgs.oss-cn-beijing.aliyuncs.com/";

import graceHeader from "./graceUI/components/graceHeader.vue";
Vue.component('graceHeader', graceHeader);

const app = new Vue({
    ...App
})
app.$mount();
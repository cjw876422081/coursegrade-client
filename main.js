import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false
// Vue.prototype.apiServer = 'http://112.74.177.53:9090/api/'
Vue.prototype.$authLoginUrl = '/api/authenticate'
Vue.prototype.$accountUrl = '/api/account'
Vue.prototype.dateFormat = function(date = new Date(), format){
            format = format || 'YYYY-MM-DD HH:mm:ss';

            const fn = function (d) {
                return ('0' + d).slice(-2);
            };

            const d = new Date(date);
            const formats = {
                YYYY: d.getFullYear(),
                MM: fn(d.getMonth() + 1),
                DD: fn(d.getDate()),
                HH: fn(d.getHours()),
                mm: fn(d.getMinutes()),
                ss: fn(d.getSeconds())
            };

            return format.replace(/([a-z])\1+/ig, function (a) {
                return formats[a] || a;
            });
        }
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

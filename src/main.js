import Vue from 'vue'
import App from './App.vue'
import {routes} from './routes'
import Axios from 'axios'
import VueRouter from 'vue-router';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css';
import VueSidebarMenu from './index'
Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(VueSidebarMenu)

const router = new VueRouter({
    routes,
    mode: 'history'
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')


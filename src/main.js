import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import DermatologistTable from "@/components/DermatologistTable";
import Home from "@/components/Home";

Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
    {path: '/dermatologists', component: DermatologistTable},
    {path: '/', component: Home}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app')

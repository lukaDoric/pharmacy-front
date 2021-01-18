import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import VueRouter from 'vue-router'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import {PointGeom} from 'vuelayers'


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Home from "@/components/Home";
import OurTeam from "@/components/OurTeam/OurTeam";
import Contact from "@/components/Contact/Contact"
import RegisterPatient from "@/components/SignedOutUser/RegisterPatient";
import LogIn from "@/components/SignedOutUser/LogIn";
import axios  from "axios";
import ActivationMailSent from "@/components/SignedOutUser/ActivationMailSent";
import ActivationSucceeded from "@/components/SignedOutUser/ActivationSucceeded";
import ActivationFailed from "@/components/SignedOutUser/ActivationFailed";
import Activation from "@/components/SignedOutUser/Activation";
import Medicine from "@/components/Medicine/Medicine";
import Order from "@/components/Order/Order";

Vue.prototype.$http = axios;

Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueLayers);
Vue.use(PointGeom);
Vue.use(axios);

const routes = [
    {path: '/medicine', component: Medicine},
    {path: '/ourteam', component: OurTeam},
    {path: '/contact', component: Contact},
    {path: '/register', component: RegisterPatient},
    {path: '/login', component: LogIn},
    {path: '/emailSent', component: ActivationMailSent},
    {path: '/activation/success', component: ActivationSucceeded},
    {path: '/activation/failed', component: ActivationFailed},
    {path: '/activation', component: Activation},
    {path: '/', component: Home},
    {path: '/order', component: Order}
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

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import VueRouter from 'vue-router'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import {PointGeom} from 'vuelayers'
import {store} from './store/store'


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Home from "@/components/Home";
import OurTeam from "@/components/OurTeam/OurTeam";
import Contact from "@/components/Contact/Contact"
import RegisterPatient from "@/components/SignedOutUser/RegisterPatient";
import LogIn from "@/components/SignedOutUser/LogIn";
import axios from "axios";
import ActivationMailSent from "@/components/SignedOutUser/ActivationMailSent";
import ActivationSucceeded from "@/components/SignedOutUser/ActivationSucceeded";
import ActivationFailed from "@/components/SignedOutUser/ActivationFailed";
import Activation from "@/components/SignedOutUser/Activation";
import Medicine from "@/components/Medicine/Medicine";
import Order from "@/components/Order/Order";
import VacationRequests from "@/components/VacationRequest/VacationRequests";
import PriceList from "@/components/PriceList/PriceList";
import Promotion from "@/components/Promotion/Promotion";
import RegisterUsers from "@/components/SystemAdministrator/RegisterUsers";
import AddPharmacy from "@/components/SystemAdministrator/AddPharmacy";
import MedicineRegister from "@/components/SystemAdministrator/MedicineRegister";
import DermatologistDetails from "@/components/OurTeam/DermatologistDetails";
import MedicineReservation from "@/components/Patient/MedicineReservation";
import PharmacyProfile from "@/components/PharmacyProfile/PharmacyProfile";
import ChangePassword from "@/components/SignedOutUser/ChangePassword";
import Offers from "@/components/Supplier/Offers";
import OffersUpdate from "@/components/Supplier/OffersUpdate";
import AvailableDermatologistExams from "@/components/Patient/AvailableDermatologistExams";
import ScheduledDermatologistExams from "@/components/Patient/ScheduledDermatologistExams";
import LoyaltyProgram from "@/components/SystemAdministrator/LoyaltyProgram";
import SchedulePharmacistExam from "@/components/Patient/SchedulePharmacistExam";
import ScheduledPharmacistExams from "@/components/Patient/ScheduledPharmacistExams";
import QR from "@/components/Patient/QR";
import MakeAComplaint from "@/components/Patient/MakeAComplaint";
import ResolveAComplaint from "@/components/SystemAdministrator/ResolveAComplaint";
import ManagePharmacyAdminProfileAndPharmacy
    from "@/components/PharmacyAdminManage/ManagePharmacyAdminProfileAndPharmacy";
import Chart from "@/components/Statistics/Chart";

Vue.prototype.$http = axios;
Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueLayers);
Vue.use(PointGeom);

const routes = [
    {path: '/medicine', component: Medicine},
    {path: '/ourteam', component: OurTeam},
    {path: '/contact', component: Contact},
    {path: '/register/patient', component: RegisterPatient},
    {path: '/login', component: LogIn},
    {path: '/emailSent', component: ActivationMailSent},
    {path: '/activation/success', component: ActivationSucceeded},
    {path: '/activation/failed', component: ActivationFailed},
    {path: '/activation', component: Activation},
    {path: '/', component: Home},
    {path: '/order', component: Order},
    {path: '/vacationRequests', component: VacationRequests},
    {path: '/priceList', component: PriceList},
    {path: '/register/users', component: RegisterUsers},
    {path: '/addPharmacy', component: AddPharmacy},
    {path: '/medicine/register', component: MedicineRegister},
    {path: '/priceList', component: PriceList},
    {path: '/changePassword', component: ChangePassword, name: 'ChangePassword', props: true},
    {path: '/offers', component: Offers},
    {path: '/promotion', component: Promotion},
    {path: '/dermatologistDetails/:id', component: DermatologistDetails},
    {path: '/pharmacyProfile', component: PharmacyProfile},
    {path: '/offers/update', component: OffersUpdate},
    {path: '/loyaltyProgram', component: LoyaltyProgram},
    {path: '/medicineReservation', component: MedicineReservation},
    {path: '/scheduling', component: AvailableDermatologistExams},
    {path: '/schedulePharmacistExam', component: SchedulePharmacistExam},
    {path: '/scheduledDermatologistExams', component: ScheduledDermatologistExams},
    {path: '/qr', component: QR},
    {path: '/complaint/new', component: MakeAComplaint},
    {path: '/complaint/resolve', component: ResolveAComplaint},
    {path: '/managePharmacy', component: ManagePharmacyAdminProfileAndPharmacy},
    {path: '/chart', component: Chart},
    {path: '/scheduledPharmacistExams', component: ScheduledPharmacistExams},
    {path: '/qr', component: QR}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    store: store,
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app')

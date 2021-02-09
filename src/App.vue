<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <OurTeamLink/>
        <OrderLink/>
        <VacationRequests/>
        <PriceListLink/>
        <PromotionLink/>
        <OffersLink v-if="user == 'Supplier'"></OffersLink>
        <OffersUpdateLink v-if="user == 'Supplier'"></OffersUpdateLink>
        <AddPharmacyLink v-if="user == 'SystemAdmin'"></AddPharmacyLink>
        <RegisterUserLink v-if="user == 'SystemAdmin'"></RegisterUserLink>
        <LoyaltyProgramLink v-if="user == 'SystemAdmin'"></LoyaltyProgramLink>
        <ResolveComplaintLink v-if="user == 'SystemAdmin'"></ResolveComplaintLink>
        <MakeAComplaintLink v-if="user == 'Patient'"></MakeAComplaintLink>
        <QRLink v-if="user == 'Patient'"></QRLink>
        <MedicineRegisterLink v-if="user == 'SystemAdmin'"></MedicineRegisterLink>
        <MedicineReservationLink v-if="user == 'Patient'"/>
      </NavGroup>
      <NavGroup side="ml-auto">
        <RegisterPatientLink v-if="!isLogged"/>
        <LogIn v-if="!isLogged"/>
        <ProfileDropMenu v-if="isLogged"/>
      </NavGroup>
    </NavBar>
    <hr>
    <h3>{{ user }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import OurTeamLink from "@/components/NavBar/OurTeamLink";
import ProfileDropMenu from "@/components/NavBar/ProfileDropMenu";
import NavGroup from "@/components/NavBar/NavGroup";
import RegisterPatientLink from "@/components/NavBar/RegisterPatientLink";
import OrderLink from "@/components/NavBar/OrderLink";
import LogIn from "@/components/NavBar/LogInLink";
import VacationRequests from "@/components/NavBar/VacationRequestsLink";
import PriceListLink from "@/components/NavBar/PriceListLink";
import PromotionLink from "@/components/NavBar/PromotionLink";
import MedicineReservationLink from "@/components/NavBar/MedicineReservationLink";
import OffersLink from "@/components/NavBar/OffersLink";
import OffersUpdateLink from "@/components/NavBar/OffersUpdateLink";
import AddPharmacyLink from "@/components/NavBar/AddPharmacyLink";
import RegisterUserLink from "@/components/NavBar/RegisterUserLink";
import MedicineRegisterLink from "@/components/NavBar/MedicineRegisterLink";
import LoyaltyProgramLink from "@/components/NavBar/LoyaltyProgramLink";
import MakeAComplaintLink from "@/components/NavBar/MakeAComplaintLink";
import ResolveComplaintLink from "@/components/NavBar/ResolveComplaintLink"
import QRLink from "@/components/NavBar/QRLink";

export default {
  name: 'App',
  components: {
    QRLink,
    ResolveComplaintLink,
    MakeAComplaintLink,
    LoyaltyProgramLink,
    MedicineRegisterLink,
    RegisterUserLink,
    AddPharmacyLink,
    OffersUpdateLink,
    OffersLink,
    MedicineReservationLink,
    PriceListLink,
    VacationRequests,
    LogIn,
    NavBar,
    OurTeamLink,
    ProfileDropMenu,
    NavGroup,
    RegisterPatientLink,
    OrderLink,
    PromotionLink,
  },
  created() {
    this.$store.dispatch('startSession', null);
    this.$http.defaults.headers.common['Authorization'] = this.$store.getters.tokenString;
  },
  watch: {
    $route() {
      this.$http.defaults.headers.common['Authorization'] = this.$store.getters.tokenString;
    }
  }
  ,
  computed: {
    isLogged() {
      return this.$store.state.userType != null;
    },
    user() {
      let user = this.$store.state.userType;
      return user;
    },
    isSupplier(){
      return this.$store.state.userType==='Supplier';
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

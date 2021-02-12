<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <OurTeamLink v-if="user == 'PharmacyAdmin' || user == 'Patient' "></OurTeamLink>
        <OrderLink v-if="user == 'PharmacyAdmin'"></OrderLink>
        <VacationRequests v-if="user == 'PharmacyAdmin'"></VacationRequests>
        <PriceListLink v-if="user == 'PharmacyAdmin'"></PriceListLink>
        <PromotionLink v-if="user == 'PharmacyAdmin'"></PromotionLink>
        <ManagePharmacyLink v-if="user == 'PharmacyAdmin'"></ManagePharmacyLink>
        <PharmacyProfileLink v-if="user == 'PharmacyAdmin'"></PharmacyProfileLink>
        <StatisticLink v-if="user == 'PharmacyAdmin'"></StatisticLink>
        <OffersLink v-if="user == 'Supplier'"></OffersLink>
        <OffersUpdateLink v-if="user == 'Supplier'"></OffersUpdateLink>
        <AddPharmacyLink v-if="user == 'SystemAdmin'"></AddPharmacyLink>
        <RegisterUserLink v-if="user == 'SystemAdmin'"></RegisterUserLink>
        <LoyaltyProgramLink v-if="user == 'SystemAdmin'"></LoyaltyProgramLink>
        <ResolveComplaintLink v-if="user == 'SystemAdmin'"></ResolveComplaintLink>
        <QRLink v-if="user == 'Patient'"></QRLink>
        <MedicineRegisterLink v-if="user == 'SystemAdmin'"></MedicineRegisterLink>
        <MedicineSearchLink v-if="user === 'Patient' || user === null"></MedicineSearchLink>
        <PharmacySearchLink v-if="user === null || user === 'Patient'"></PharmacySearchLink>
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
import OffersLink from "@/components/NavBar/OffersLink";
import OffersUpdateLink from "@/components/NavBar/OffersUpdateLink";
import AddPharmacyLink from "@/components/NavBar/AddPharmacyLink";
import RegisterUserLink from "@/components/NavBar/RegisterUserLink";
import MedicineRegisterLink from "@/components/NavBar/MedicineRegisterLink";
import LoyaltyProgramLink from "@/components/NavBar/LoyaltyProgramLink";
import ResolveComplaintLink from "@/components/NavBar/ResolveComplaintLink"
import QRLink from "@/components/NavBar/QRLink";
import ManagePharmacyLink from "@/components/NavBar/ManagePharmacyLink";
import PharmacyProfileLink from "@/components/NavBar/PharmacyProfileLink";
import StatisticLink from "@/components/NavBar/StatisticLink";
import MedicineSearchLink from "@/components/NavBar/MedicineSearchLink";
import PharmacySearchLink from "@/components/NavBar/PharmacySearchLink";

export default {
  name: 'App',
  components: {
    PharmacySearchLink,
    MedicineSearchLink,
    StatisticLink,
    QRLink,
    ResolveComplaintLink,
    LoyaltyProgramLink,
    MedicineRegisterLink,
    RegisterUserLink,
    AddPharmacyLink,
    OffersUpdateLink,
    OffersLink,
    PharmacyProfileLink,
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
    ManagePharmacyLink
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
    isSupplier() {
      return this.$store.state.userType === 'Supplier';
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

<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <OurTeamLink/>
        <ContactLink/>
        <OrderLink/>
        <VacationRequests/>
      </NavGroup>
      <NavGroup side="ml-auto">
        <RegisterPatientLink/>
        <LogIn v-if="isLogged"/>
        <ProfileDropMenu/>
      </NavGroup>
    </NavBar>
    <hr>
    <h3>{{user}}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import ContactLink from "@/components/NavBar/ContactLink";
import OurTeamLink from "@/components/NavBar/OurTeamLink";
import ProfileDropMenu from "@/components/NavBar/ProfileDropMenu";
import NavGroup from "@/components/NavBar/NavGroup";
import RegisterPatientLink from "@/components/NavBar/RegisterPatientLink";
import OrderLink from "@/components/NavBar/OrderLink";
import LogIn from "@/components/NavBar/LogInLink";
import VacationRequests from "@/components/NavBar/VacationRequestsLink";


export default {
  name: 'App',
  components: {
    VacationRequests,
    LogIn,
    NavBar,
    ContactLink,
    OurTeamLink,
    ProfileDropMenu,
    NavGroup,
    RegisterPatientLink,
    OrderLink
  },
  mounted() {

    this.$store.dispatch('startSession', null);

  },
  computed: {
    isLogged() {
      return this.$store.state.userType == null;
    },
    user() {
      return this.$store.state.userType
    },
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

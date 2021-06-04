<template>
  <div>
    <div>
      <b-jumbotron class="bg-dark">
        <h1 class="text-light">Dermatologist home page</h1>
        <div class="row">
          <div class="col-3"></div>
          <div class="col">
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="list-group bg-dark text-light my-3">
              <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
                 v-on:click="changeDisplay(0)">
                Patients
              </a>
              <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
                 v-on:click="changeDisplay(1)">
                Schedule Exam
              </a>
            </div>
          </div>

          <div class="col">
            <PatientSearch v-if="display === 0"/>
            <SchedulePatientsAppointment v-if="display === 1"/>
          </div>
        </div>


      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import PatientSearch from "../Patient/PatientSearch";
import SchedulePatientsAppointment from "./SchedulePatientsAppointment";
export default {
name: "PharmacistHome",
  components: {
    PatientSearch,
    SchedulePatientsAppointment
  },
  data() {
    return {
      display: 0
    }
  },
  mounted() {
    if (this.$store.state.userType !== 'Pharmacist') {
      this.$router.push("/login/");
    }
  },
  methods: {
    changeDisplay(mode) {
      this.display = mode;
    }
  }
}
</script>

<style scoped>

</style>
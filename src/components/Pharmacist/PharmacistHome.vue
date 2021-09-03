<template>
  <div>
    <div>
      <b-jumbotron class="bg-dark">
        <h1 class="text-light">Pharmacist home page</h1>
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
              <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
                 v-on:click="changeDisplay(2)">
                Medicine Issuing
              </a>
              <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
                 v-on:click="changeDisplay(3)">
                Appointment Report
              </a>
              <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
                 v-on:click="changeDisplay(4)">
                Working Calendar
              </a>
              <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
                 v-on:click="changeDisplay(5)">
                Schedule vacation
              </a>
              <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
                 v-on:click="changeDisplay(6)">
                Patient history
              </a>
            </div>
          </div>

          <div class="col">
            <PatientSearch v-if="display === 0"/>
            <SchedulePatientsAppointment v-if="display === 1"/>
            <MedicineIssuing v-if="display === 2"/>
            <AppointmentReport v-if="display === 3"/>
            <PharmacistWorkingCalendar v-if="display === 4"/>
            <RequestVacation v-if="display === 5"></RequestVacation>
            <PatientHistory v-if="display === 6"/>
          </div>
        </div>


      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import PatientSearch from "../Patient/PatientSearch";
import SchedulePatientsAppointment from "./SchedulePatientsAppointment";
import MedicineIssuing from "../Medicine/MedicineIssuing";
import AppointmentReport from "./AppointmentReport";
import PharmacistWorkingCalendar from "./PharmacistWorkingCalendar";
import RequestVacation from "../VacationRequest/RequestVacation";
import PatientHistory from "../Patient/PatientHistory";
export default {
name: "PharmacistHome",
  components: {
    PatientHistory,
    RequestVacation,
    PatientSearch,
    SchedulePatientsAppointment,
    MedicineIssuing,
    AppointmentReport,
    PharmacistWorkingCalendar
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
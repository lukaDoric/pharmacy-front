<template>
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
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
               v-on:click="changeDisplay(2)">
              Exam Report
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
               v-on:click="changeDisplay(3)">
              Working Calendar
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
               v-on:click="changeDisplay(4)">
              Schedule vacation
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
               v-on:click="changeDisplay(5)">
              Patient history
            </a>
          </div>
        </div>

        <div class="col">
          <PatientSearch v-if="display === 0"/>
          <SchedulePatientsExam v-if="display === 1"/>
          <ExamReport v-if="display === 2"/>
          <DermatologistWorkingCalendar v-if="display === 3"/>
          <VacationRequestDermatologist v-if="display === 4"></VacationRequestDermatologist>
          <PatientHistory v-if="display === 5"/>
        </div>
      </div>


    </b-jumbotron>
  </div>
</template>

<script>
import PatientSearch from "../Patient/PatientSearch";
import SchedulePatientsExam from "./SchedulePatientsExam";
import ExamReport from "./ExamReport";
import DermatologistWorkingCalendar from "./DermatologistWorkingCalendar";
import VacationRequestDermatologist from "../VacationRequest/VacationRequestDermatologist";
import PatientHistory from "../Patient/PatientHistory";
export default {
  name: "DermatologistHome",
  components: {
    PatientHistory,
    VacationRequestDermatologist,
    PatientSearch,
    SchedulePatientsExam,
    ExamReport,
    DermatologistWorkingCalendar,
  },
  data() {
    return {
      display: 0
    }
  },
  mounted() {
    if (this.$store.state.userType !== 'Dermatologist') {
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
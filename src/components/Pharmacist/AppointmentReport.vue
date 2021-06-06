<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h4 class="text-dark">Exam Report</h4>
      <br>
      <div class="px-5">
        <div class="input-group mb-3 px-5">
          <input type="text" class="form-control" placeholder="Search patients" v-model="searchName">
        </div>
        <table class="table table-dark table-hover table-bordered">
          <thead>
          <th >Name</th>
          <th >Surname</th>
          <th >Email</th>
          <th ></th>
          </thead>
          <tbody v-for="(p, index) in filteredList" v-bind:key="index">
          <tr>
            <td>{{ p.name }}</td>
            <td>{{ p.surname }}</td>
            <td>{{p.email}}</td>
            <td>
              <button class="btn btn-info btn-sm" type="button" v-on:click="onSelect(p)" v-if="btn1">Select</button>
              <button class="btn btn-info btn-sm" type="button" v-on:click="onDeselect(p)" v-if="!btn1">Deselect</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <br/>
      <div>
        <button class="btn btn-info btn-sm" type="button">Patient did not attend examination</button>
      </div>
      <br/>
      <div class="col">
        <p>Exam information</p>
      </div>
      <textarea class="textarea1" rows="7" v-model="examInformation"></textarea>
      <br/>
      <div class="col">
        <p>Medicine</p>
      </div>
      <div class="px-5">

        <div>
          <button class="btn btn-info btn-sm" type="button" v-on:click="onSchedule()" v-if="!scheduleExam">Schedule exam</button>
          <button class="btn btn-info btn-sm" type="button" v-on:click="onCancelSchedule()" v-if="scheduleExam">Cancel Scheduling</button>
        </div>
        <SchedulePatientsAppointment v-if="scheduleExam"/>
      </div>

    </b-jumbotron>
  </div>
</template>

<script>
import SchedulePatientsAppointment from "./SchedulePatientsAppointment";
export default {
  name: "AppointmentReport",
  components: {
    SchedulePatientsAppointment
  },
  data() {
    return {
      patients: [],
      patientsSearched: [],
      searchName: '',
      exams: [],
      selectedPatient: null,
      btn1: true,
      startDate: '',
      startTime: '',
      durationTime: '',
      price: '',
      today: new Date().toISOString().split('T')[0],
      examInformation: '',
      scheduleExam: false
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/getAll/")
        .then(response => {
          this.patients = response.data;
          this.patientsSearched = response.data;
        })
  },
  methods: {
    onSelect(p) {
      this.selectedPatient = p;
      this.patientsSearched = [];
      this.patientsSearched.push(p);
      this.btn1 = false;
    },
    onDeselect() {
      this.patientsSearched = this.patients;
      this.btn1 = true;
      this.selectedPatient = null;
    },
    onSchedule() {
      this.scheduleExam = true;
    },
    onCancelSchedule(){
      this.scheduleExam = false;
    }
  },
  computed: {
    filteredList(){
      return this.patientsSearched.filter(pat => {
        return pat.name.toLowerCase().concat(pat.surname.toLowerCase()).includes(this.searchName.toLowerCase().replace(/\s/g, ""))
      })
    }
  },
}
</script>

<style scoped>

.textarea1 {
  width: 80%;
}
</style>
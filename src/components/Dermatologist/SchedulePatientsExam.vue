<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Schedule an appointment</h1>
      <div class="row">
        <div class="col">
          <p>All scheduled appointments can be cancelled 24 hours before start time.</p>
        </div>
      </div>

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
        <br/>
        <div class="col">
          <p>Schedule an appointment from already created appointments:</p>
        </div>
        <table class="table table-dark table-hover table-bordered">
          <thead>
          <tr>
            <th>Date</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Price</th>
            <th>Dermatologist</th>
            <th>Dermatologist's rating</th>
            <th></th>
          </tr>
          </thead>
          <tbody v-for="e in exams" v-bind:key="e.examId">
          <tr>
            <td>{{ e.date | dateFormat() }}</td>
            <td>{{ e.start }}</td>
            <td>{{ e.end }}</td>
            <td>{{ e.price | toMoney() }}</td>
            <td>{{ e.dermatologistName + " " + e.dermatologistSurname }}</td>
            <td>{{ e.dermatologistRating }}</td>
            <td>
              <button class="btn btn-info btn-sm" type="button" v-on:click="onSchedule(e.examId)">Schedule
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <br/>
        <div>
          <h3>Create new appointment</h3>
          <div id="appointment" class="d-flex justify-content-center">
            <input :min="today" v-model="startDate" type="date"/>
            <input v-model="startTime" type="time"/>
            <input v-model="durationTime" type="number" placeholder="Duration..."/>
            <input v-model="price" type="number" placeholder="Price in dollars..."/>
            <button  type="button" class="btn btn-success" @click="createExam">Create new appointment</button>
          </div>
        </div>
      </div>



    </b-jumbotron>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "SchedulePatientsExam",
  props: ['pharmacyId', 'selectedPatient1'],

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
      today: new Date().toISOString().split('T')[0]
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/getAll/")
        .then(response => {
          this.patients = response.data;
          this.patientsSearched = response.data;
        })
    if (this.pharmacyId === undefined) {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "patient-exam/all/")
          .then(response => {
            this.exams = response.data;
          })
    } else {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "patient-exam/" + this.pharmacyId)
          .then(response => {
            this.exams = response.data;
          })
    }
  },
  methods: {
    onSelect(p) {
      this.selectedPatient = p;
      this.patientsSearched = [];
      this.patientsSearched.push(p);
      this.btn1 = false;
    },
    onDeselect(){
      this.patientsSearched = this.patients;
      this.btn1 = true;
      this.selectedPatient = null;
    },
    onSchedule(examId) {
      const config = {headers: {'Content-Type': 'application/json'}};
      if (this.selectedPatient === null) {
        alert("Please select patient!")
        return;
      }
      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + "patient-exam/scheduleForPatient", {
            examId: examId,
            patientID: this.selectedPatient.patientID,
            duration: this.durationTime,
            config})
          .then(response => {
            alert(response.data);
            window.location.reload()
          })
          .catch(err => {
            alert(err.response.data)
          });
    },
    createExam() {
      if (this.selectedPatient === null) {
        alert("Please select patient!")
        return;
      }

      if (this.startDate === '') {
        alert("Please input all fields!1")
        return;
      }

      if (this.startTime === '') {
        alert("Please input all fields!2")
        return;
      }

      if (this.durationTime === '') {
        alert("Please input all fields!3")
        return;
      }

      if (this.price === '') {
        alert("Please input all fields!4")
        return;
      }

      let startDate = new Date(this.startDate + 'T' + this.startTime)
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'exam/', {
        dermatologistId: 'prazno',
        examStart: startDate,
        duration: this.durationTime,
        price: this.price
      }).then(response => {
        alert(response.data);
        window.location.reload()
      }).catch(err => {
        alert(err.response.data)
      });
    }
  },
  computed: {
    filteredList(){
      return this.patientsSearched.filter(pat => {
        return pat.name.toLowerCase().concat(pat.surname.toLowerCase()).includes(this.searchName.toLowerCase().replace(/\s/g, ""))
      })
    }
  },
  filters: {
    dateFormat: function (value) {
      let parsed = moment(value);
      return parsed.format('DD.MM.YYYY');
    },
    toMoney: function (value) {
      return (Math.round(value * 100) / 100).toFixed(2) + '$';
    }
  }
}
</script>

<style scoped>
#search-name-button {
  margin: 5px;
}

.jumbotron {
  margin: 2%;
}

.display-4 {
  margin-bottom: 0.5em;
}

tr.hide-table-padding td {
  padding: 0;
}

.expand-button {
  position: relative;
}

.accordion-toggle .expand-button:after {
  position: absolute;
  left: .75rem;
  top: 50%;
  transform: translate(0, -50%);
  content: '-';
}

.accordion-toggle.collapsed .expand-button:after {
  content: '+';
}
</style>
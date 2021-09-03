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
        <textarea class="textarea1" rows="7" v-model="examInformation"></textarea>
      </div>


      <br/>
      <div>
        <button class="btn btn-info btn-sm" type="button" v-on:click="onPrescribe()" v-if="!prescribeMedicine">Prescribe medicine</button>
        <button class="btn btn-info btn-sm" type="button" v-on:click="onCancelPrescribe()" v-if="prescribeMedicine">Cancel Prescribe medicine</button>
      </div>
      <div v-if="prescribeMedicine">
        <div class="row-lg-7">
          <b-jumbotron class="jumbotron">
            <h1 class="display-4">Medicine</h1>
            <table class="table table-dark table-hover table-bordered">
              <thead>
              <tr>
                <th scope="col">
                  <button class="btn btn-info btn-sm" type="button" v-on:click="search">search</button>
                </th>
                <th scope="col">Name
                  <input size="10" type="text" v-model="searchNameMedicine">
                </th>
                <th scope="col">Type
                  <select v-model="searchType">
                    <option>All</option>
                    <option v-for="key in enumTypeDict" v-bind:key="key" class="dropdown-item">{{ key }}</option>
                  </select>
                </th>
                <th scope="col">Form
                  <select v-model="searchForm">
                    <option>All</option>
                    <option v-for="key in enumFormDict" v-bind:key="key" class="dropdown-item">{{ key }}</option>
                  </select>
                </th>
                <th scope="col">Rating
                  <select v-model="searchRating">
                    <option>All</option>
                    <option v-for="index in 5" v-bind:key="index">{{ index }}</option>
                  </select>
                </th>
                <th scope="col" >Select</th>
              </tr>
              </thead>
              <tbody v-for="(m, index) in medicineSearched" v-bind:key="m.id">
              <tr class="align-content-center accordion-toggle collapsed">
                <th scope="row">{{ index }}</th>
                <td class="align-baseline">{{ m.name }}</td>
                <td class="align-baseline">{{ typeFilter(m.type) }}</td>
                <td class="align-baseline">{{ formFilter(m.form) }}</td>
                <td class="align-baseline">{{ m.rating }}</td>
                <td class="align-baseline">
                  <button type="button" class="btn btn-info btn-sm" v-on:click="selectMedicine(m)">+</button>
                </td>
              </tr>
              </tbody>
            </table>
          </b-jumbotron>
        </div>
        <div class="row-lg-5">
          <b-jumbotron class="jumbotron">
            <div class="card">
              <div class="card-header">
                <h2 v-if="selectedMedicine != null" class="display-4">Make
                  {{ selectedMedicine.name }}
                  reservation</h2>
              </div>
              <div class="card-body bg-dark" v-if="selectedMedicine != null">
                <table class="table table-dark table-hover table-bordered" v-if="selectedMedicine != null">
                  <thead>
                  <tr>
                    <th>Pharmacy name</th>
                    <th>Pharmacy address</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody v-for="p in medicinePharmacies" v-bind:key="p.id">
                  <tr>
                    <td>{{ p.name }}</td>
                    <td>{{ p.address }}</td>
                    <td>{{ p.price }}</td>
                    <td>
                      <button class="btn btn-info btn-sm" v-on:click="selectedPharmacy=p">select</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <h4 v-if="medicinePharmacies.length==0 && selectedMedicine != null" style="color:white">
                  No pharmacies were found.
                </h4>
                <div v-if="selectedPharmacy!=null" style="color: white">
                  <hr color="white">
                  <div class="form-row">
                    <p>Medicine: {{ selectedMedicine.name }}<br></p>
                  </div>
                  <div class="form-row">
                    <p>Pharmacy: {{ selectedPharmacy.name }}</p>
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <input type="date" :min="today" class="form-control" v-model="expirationDate"
                             placeholder="Reservation expires">
                    </div>
                  </div>
                  <div class="form-group mt-1" style="width: 100%">
                    <button type="submit" v-on:click="onSubmit" class="btn btn-info btn-block">Submit reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </b-jumbotron>
        </div>


      </div>
      <br/>
      <div>
        <button class="btn btn-info btn-sm" type="button" v-on:click="onScheduleExam()" v-if="!scheduleExam">Schedule exam</button>
        <button class="btn btn-info btn-sm" type="button" v-on:click="onCancelSchedule()" v-if="scheduleExam">Cancel Scheduling</button>
      </div>
      <div v-if="scheduleExam">
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

          <table class="table table-dark table-hover table-bordered">
            <thead>
            <tr>
              <th>Pharmacy</th>
              <th></th>
            </tr>
            </thead>
            <tbody v-for="p in pharmacies" v-bind:key="p.id">
            <tr>
              <td>{{ p.name }}</td>
              <td>
                <button class="btn btn-info btn-sm" type="button" v-on:click="onSelectPharmacy(p)" v-if="btn2">Select</button>
                <button class="btn btn-info btn-sm" type="button" v-on:click="onDeselectPharmacy(p)" v-if="!btn2">Deselect</button>
              </td>
            </tr>
            </tbody>
          </table>


          <div id="appointment" class="d-flex justify-content-center">
            <input :min="todayMedicine" v-model="startDate" type="date"/>
            <input v-model="startTime" type="time"/>
            <input v-model="durationTime" type="number" placeholder="Duration..."/>
            <input v-model="price" type="number" placeholder="Price in dollars..."/>
            <button  type="button" class="btn btn-success" @click="createExam">Create new appointment</button>
          </div>
        </div>
      </div>
      <br/>
      <div>
        <button class="btn btn-info btn-sm" type="button" v-on:click="onSchedule()">Finish exam</button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "ExamReport",
  components: {

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
      scheduleExam: false,
      pharmacies: [],
      pharmaciesOther: [],
      btn2: true,

      prescribeMedicine: false,
      medicinePharmacies: [],
      medicine: [],
      pharmaciesSearched: [],
      medicineSearched: [],
      selectedMedicine: null,
      selectedPharmacy: null,
      expirationDate: "",
      dropdownText: "Select pharmacy",
      enumTypeDict: {
        'HUMAN': "Human medicament",
        'HERBAL': "Herbal medicine",
        'BIOPHARMACEUTICAL': "Biopharmaceutical",
        'RADIOPHARMACEUTICAL': "Radiopharmaceutical",
        'HOMEOPATHIC': "Homeopathic remedy"
      },
      enumFormDict: {
        'TABLET': 'Tablet',
        'SYRUP': 'Syrup',
        'POWDER': 'Powder',
        'CAPSULE': 'Capsule',
        'INHALER': 'Inhaler',
        'INJECTION': 'Injection',
        'DROPS': 'Drops',
        'GEL': 'Gel',
        'PASTE': 'Paste'
      },
      searchNameMedicine: "",
      searchType: "All",
      searchForm: "All",
      searchRating: "All",
      todayMedicine: '01-01-1970'

    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/getAll/")
        .then(response => {
          this.patients = response.data;
          this.patientsSearched = response.data;
        })
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "medicine/get/all")
        .then(response => {
          this.medicine = response.data;
          this.medicineSearched = this.medicine
        })
    this.setToday()
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "dermatologist/getDermatologistsPharmacies/")
        .then(response => {
          this.pharmacies = response.data;
          this.pharmaciesOther = response.data;
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
    onDeselect() {
      this.patientsSearched = this.patients;
      this.btn1 = true;
      this.selectedPatient = null;
    },
    onSelectPharmacy(p) {
      this.selectedPharmacy = p;
      this.pharmacies = [];
      this.pharmacies.push(p);
      this.btn2 = false;
    },
    onDeselectPharmacy() {
      this.pharmacies = this.pharmaciesOther;
      this.btn2 = true;
      this.selectedPharmacy = null;
    },
    onScheduleExam() {
      this.scheduleExam = true;
    },
    onCancelSchedule(){
      this.scheduleExam = false;
    },
    onPrescribe() {
      this.prescribeMedicine = true;
    },
    onCancelPrescribe(){
      this.prescribeMedicine = false;
    },
    createExam() {
      if (this.selectedPatient === null) {
        alert("Please select patient!123")
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
      let examDTO = {
        dermatologistID: 'a',
        pharmacyID: this.selectedPharmacy.id,
        patientID: this.selectedPatient.email,
        examStart: startDate,
        duration: this.durationTime,
        price: this.price
      }

      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'exam/createAndScheduleForPatientDermatologist/', examDTO)
          .then(response => {
            alert(response.data);
          }).catch(err => {
        alert(err.response.data)
      });
    },
    downloadPdf() {

    },
    onSchedule(examId){
      if (this.selectedPatient === null) {
        alert("Please select patient!")
        return;
      }
      let exam = {
        examID: examId,
        patientID: this.selectedPatient.email
      }
      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + "patient-exam/scheduleForPatient", exam)
          .then(response => {
            alert(response.data);
          })
          .catch(err => {
            alert(err.response.data)
          });
    },
    selectMedicine(medicine) {
      this.selectedPharmacy = null;
      this.selectedMedicine = medicine
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/pharmacies/" + medicine.id.toString())
          .then(response => {
            this.medicinePharmacies = response.data;
          })
    },
    onSubmit() {

      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/exam/", {
            medicineId: this.selectedMedicine.id,
            pharmacyId: this.selectedPharmacy.id,
            expirationDate: this.expirationDate,
            patientId: this.selectedPatient.email
          })
          .then(response => {
            response.data
            alert("Medicine successfully reserved!")
          })
          .catch(err => {
            alert(err.response.data)
          })
    },
    search() {
      this.selectedMedicine = null;
      this.selectedPharmacy = null;
      this.medicineSearched = [];
      this.medicine.forEach(med => {
            if (this.searchNameMedicine == "" || med.name == this.searchNameMedicine) {
              if (this.searchForm == "All" || this.searchForm == this.enumFormDict[med.form]) {
                if (this.searchType == "All" || this.searchType == this.enumTypeDict[med.type]) {
                  if (this.searchRating == "All" || this.searchRating == med.ratings) {
                    this.medicineSearched.push(med);
                  }
                }
              }
            }
          }
      )
    },
    formFilter: function (value) {
      return this.enumFormDict[value];
    },
    typeFilter: function (value) {
      return this.enumTypeDict[value];
    },
    setToday: function () {
      let today = new Date();
      let dd = today.getDate() + 1;
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }

      this.todayMedicine = yyyy + '-' + mm + '-' + dd;
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
.textarea1 {
  width: 80%;
}

</style>
<template>
  <div>
    <div class="row">
      <div class="col-lg-7">
        <b-jumbotron class="jumbotron">
          <h1 class="display-4">Medicine</h1>
          <table class="table table-dark table-hover table-bordered">
            <thead>
            <tr>
              <th scope="col">
                <button class="btn btn-info btn-sm" type="button" v-on:click="search">search</button>
              </th>
              <th scope="col">Name
                <input size="10" type="text" v-model="searchName">
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
              <th scope="col">Generate PDF</th>
              <th scope="col">Select</th>
            </tr>
            </thead>
            <tbody v-for="(m, index) in medicineSearched" v-bind:key="m.id">
            <tr class="align-content-center accordion-toggle collapsed">
              <th scope="row">{{ index }}</th>
              <td class="align-baseline">{{ m.name }}</td>
              <td class="align-baseline">{{ typeFilter(m.type) }}</td>
              <td class="align-baseline">{{ formFilter(m.form) }}</td>
              <td class="align-baseline">{{ m.ratings }}</td>
              <td>
                <button type="button" class="btn btn-success btn-sm" v-on:click="downloadPdf(m)">Download</button>
              </td>
              <td class="align-baseline">
                <button type="button" class="btn btn-info btn-sm" v-on:click="selectMedicine(m)">+</button>
              </td>
            </tr>
            </tbody>
          </table>
        </b-jumbotron>
      </div>
      <div class="col-lg-5">
        <b-jumbotron class="jumbotron">
          <div class="card">
            <div class="card-header">
              <h2 v-if="selectedMedicine != null && loggedUser!=null" class="display-4">Make {{ selectedMedicine.name }}
                reservation</h2>
              <h2 v-else-if="selectedMedicine != null && loggedUser==null" class="display-4">{{
                  selectedMedicine.name
                }}' pharmacies</h2>
              <h2 v-else-if="loggedUser==null" class="display-4">Select medicine to see it's pharmacies.</h2>
              <h2 v-else class="display-4">Select medicine to make a reservation.</h2>
            </div>
            <div class="card-body bg-dark" v-if="selectedMedicine != null">
              <table class="table table-dark table-hover table-bordered" v-if="selectedMedicine != null">
                <thead>
                <tr>
                  <th>Pharmacy name</th>
                  <th>Pharmacy address</th>
                  <th>Price</th>
                  <th v-if="loggedUser!=null"></th>
                </tr>
                </thead>
                <tbody v-for="p in pharmacies" v-bind:key="p.id">
                <tr>
                  <td>{{ p.name }}</td>
                  <td>{{ p.address }}</td>
                  <td>{{ p.price }}</td>
                  <td v-if="loggedUser!=null">
                    <button class="btn btn-info btn-sm" v-on:click="selectedPharmacy=p">select</button>
                  </td>
                </tr>
                </tbody>
              </table>
              <h4 v-if="pharmacies.length==0 && selectedMedicine != null" style="color:white">
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
                    <input type="date" class="form-control" v-model="expirationDate" placeholder="Reservation expires">
                  </div>
                </div>
                <div class="form-group mt-1" style="width: 100%">
                  <button type="submit" v-on:click="onSubmit" class="btn btn-info btn-block">Submit reservation
                  </button>
                </div>
              </div>
            </div>
            <div class="card-footer bg-dark" v-if="selectedMedicine != null && loggedUser!=null"><small
                class="text-light text-left">By submitting this reservation you are
              confirming that you will purchase
              the
              medicine at the selected pharmacy by the date chosen.<br>You can cancel the reservation up to 24 hours
              before
              it expires to avoid penalty points.</small>
            </div>
          </div>
        </b-jumbotron>
      </div>
    </div>
  </div>

</template>

<style scoped>
#search-name-button {
  margin: 5px;
}

.jumbotron {
  margin: 2%;
}

</style>

<script>
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle';
import {jsPDF} from "jspdf";

export default {
  name: "Medicine",
  data() {
    return {
      nameInput: "",
      medicine: [],
      pharmacies: [],
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
      searchName: "",
      searchType: "All",
      searchForm: "All",
      searchRating: "All"
    }
  },
  mounted() {
    axios
        .get("http://localhost:8080/medicine/get/all")
        .then(response => {
          this.medicine = response.data;
          this.medicineSearched = this.medicine
        })
  },
  methods: {
    selectMedicine(medicine) {
      this.selectedPharmacy = null;
      this.selectedMedicine = medicine
      axios
          .get("http://localhost:8080/medicine-reservation/pharmacies/" + medicine.id.toString())
          .then(response => {
            this.pharmacies = response.data;
          })
    },
    downloadPdf(medicine) {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("®™PharmacyManager", 10, 30);
      doc.line(0, 34, 200, 34);
      doc.setFontSize(14);
      doc.text(medicine.name, 10, 40);
      doc.setFontSize(9);
      doc.text("Id: " + medicine.uuid, 10, 50);
      doc.text("Form: " + this.enumFormDict[medicine.form], 10, 60);
      doc.text("Type: " + this.enumTypeDict[medicine.type], 10, 70);
      if (medicine.prescribed) {
        doc.text("This medicine has to be prescribed!", 10, 80);
      } else {
        doc.text("You can get this medicine without prescription!", 10, 80);
      }
      doc.text("Average rating: " + medicine.ratings, 10, 90);
      doc.text("Recommended daily dose: " + medicine.recommendedDose, 10, 100);
      doc.text("Manufacturer: " + medicine.manufacturer, 10, 110);
      doc.text("Composition: " + medicine.composition, 10, 120);
      doc.text("Some side effects may be: " + medicine.sideEffects, 10, 130);
      doc.text("Description: " + medicine.description, 10, 140);
      doc.save(medicine.name + ".pdf");
    },
    onSubmit() {
      axios
          .post("http://localhost:8080/medicine-reservation/", {
            medicineId: this.selectedMedicine.id,
            pharmacyId: this.selectedPharmacy.id,
            expirationDate: this.expirationDate
          })
          .then(response => {
            response.data
            alert("Medicine successfully reserved!")
          })
          .catch(error => {
            console.log(error.message)
            alert("Sorry, looks like there has been a mistake with your reservation. Please try again.")
          })
    },
    search() {
      this.selectedMedicine = null;
      this.selectedPharmacy = null;
      this.medicineSearched = [];
      this.medicine.forEach(med => {
            if (this.searchName == "" || med.name == this.searchName) {
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

  },
  computed: {
    loggedUser() {
      return this.$store.state.userType;
    }
  }
}
</script>


<template>
  <b-jumbotron class="jumbotron">
    <h1 class="display-4">Dermatologists</h1>

    <div class="container my-4">
      <hr>
      <div class="table-responsive">
        <div class="d-flex bd-highlight mb-3">
          <input type="text"
                 placeholder="Search"
                 v-model="filter">
          <div>
            <select v-on:select="filterByPharmacy" id="dropdown-1" text="Pharmacy" class="m-md-2"
                    @change="filterByPharmacy($event)">
              <option>All pharmacies</option>
              <option v-for="(pharmacy, index) in pharmacies" :key="index">{{ pharmacy.pharmacyName }}</option>
            </select>
          </div>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">See pharamcy</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Rating</th>
          </tr>
          </thead>
          <tbody v-for="(dermatologist, index) in filteredDermatologists" :key="index">
          <tr class="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1"
              href="#collapseOne">
            <td class="expand-button"></td>
            <td>{{ dermatologist.name }}</td>
            <td>{{ dermatologist.surname }}</td>
            <td>{{ dermatologist.rating }}</td>
            <td>
              <button :value="dermatologist.id" @click="checkDetails($event)" type="button" class="btn btn-success">
                Check details
              </button>
            </td>
          </tr>
          <tr class="hide-table-padding">
            <td></td>
            <td colspan="3">
              <div id="collapseOne" class="collapse in p-3">
                <div class="row" v-for="(pharmacy, index) in dermatologist.pharmacies" :key="index">
                  <div class="col-3"><p style="color:forestgreen;">{{ pharmacy.pharmacyName }}</p></div>
                  <div class="col-4"><p style="color:forestgreen;">{{ pharmacy.pharmacyAddress }}</p></div>
                </div>
                <div>
                  <div class="col-sm-10">
                    <div class="d-flex flex-row">
                      <input type="text" readonly class="form-control-plaintext" value="MONDAY">
                      <input type="text" readonly class="form-control-plaintext" value="MON">
                    </div>
                    <div class="d-flex flex-row">
                      <input type="text" readonly class="form-control-plaintext" value="TUESDAY">
                    </div>
                    <div class="d-flex flex-row">
                      <input type="text" readonly class="form-control-plaintext" value="WEDNESDAY">
                    </div>
                    <div class="d-flex flex-row">
                      <input type="text" readonly class="form-control-plaintext" value="THURSDAY">
                    </div>
                    <div class="d-flex flex-row">
                      <input type="text" readonly class="form-control-plaintext" value="FRIDAY">
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </b-jumbotron>
</template>

<script>
import axios from "axios";

export default {
  name: "Dermatologists",
  data() {
    return {
      filter: '',
      filterByPharmacyValue: '',
      pharmacies: [],
      dermatologists: [],
      allDermatologists: []
    }
  },

  mounted() {
    axios
        .get('http://localhost:8080/dermatologist/getAllDermatologists')
        .then(response => {
          this.dermatologists = response.data;
          this.allDermatologists = response.data;
        })

    axios
        .get('http://localhost:8080/pharmacy/')
        .then(response => {
          this.pharmacies = response.data;
        })
  },

  methods: {

    filterByPharmacy(event) {
      if (event.target.value === 'All pharmacies') {
        this.dermatologists = this.allDermatologists;
      } else {
        axios
            .get('http://localhost:8080/dermatologist/getDermatologistsByPharmacy/' + event.target.value)
            .then(response => {
              this.dermatologists = response.data;
            })
      }
    },

    checkDetails(event) {
      this.$router.push("/dermatologistDetails/" + event.target.value);
    }
  },

  computed: {
    filteredDermatologists() {
      return this.dermatologists.filter(dermatologist => {
        const name = dermatologist.name.toString().toLowerCase();
        const surname = dermatologist.surname.toLowerCase();
        const rating = dermatologist.rating.toString();
        const searchTerm = this.filter.toLowerCase();
        return name.includes(searchTerm) || surname.includes(searchTerm) || rating.includes(searchTerm);
      });
    }
  },
}
</script>

<style>
.jumbotron {
  border-radius: 5em !important;
  margin-right: 5em;
  margin-left: 5em;
  margin-top: 5em;
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
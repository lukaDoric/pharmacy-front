<template>
  <div>
    <b-jumbotron class="jumbotron bg-light">

      <div class="panel-group">
        <h1>Schedule an appointment with pharmacist</h1>
        <br>
        <div class="panel panel-primary">
          <fieldset v-if="step === 1">
            <div class="panel-body">
              <h4 class="text-dark">Step 1: Pick date and time to start your appointment</h4>
              <br>
              <div class="input-group mb-3 px-5">
                <input type="date" :min="dateLimit" class="form-control" placeholder="Date" aria-label="Date"
                       v-model="date">
                <input type="time" class="form-control" placeholder="Time" aria-label="Time" v-model="time">
                <div class="input-group-append">
                  <button class="btn btn-outline-light bg-dark" type="button" v-on:click="onSearchPharmacies()">
                    Search for pharmacies
                  </button>
                </div>
              </div>
              <div class="px-5">
                <table class="table table-dark table-hover table-bordered">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th>
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Sort by
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#" v-on:click="onSortPharmacies(0)">Price (lowest first)</a>
                          <a class="dropdown-item" href="#" v-on:click="onSortPharmacies(1)">Price (highest first)</a>
                          <a class="dropdown-item" href="#" v-on:click="onSortPharmacies(2)">Rating (lowest first)</a>
                          <a class="dropdown-item" href="#" v-on:click="onSortPharmacies(3)">Rating (highest first)</a>
                        </div>
                      </div>
                    </th>
                  </tr>
                  </thead>
                  <tbody v-for="p in pharmacies" v-bind:key="p.id">
                  <tr>
                    <td>{{ p.name }}</td>
                    <td>{{ p.address.city }}, {{ p.address.street }}</td>
                    <td>{{ p.rating }}</td>
                    <td>{{ p.price }}</td>
                    <td>
                      <button class="btn btn-success" v-on:click="onSelectPharmacy(p)">Select pharmacy</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <p v-if="pharmacyNoResults" class="text-warning">
                  Looks like there aren't any pharmacies with available pharmacist appointments.
                  Try searching for an other date or time
                </p>
              </div>
            </div>
          </fieldset>
          <fieldset v-if="step === 2">
            <div class="panel-body">
              <h4 class="text-dark">Step 2: Pick a pharmacist to schedule an appointment</h4>
              <br>
              <div class="form-group text-dark">
                <div class="px-5">
                  <table class="table table-dark table-hover table-bordered">
                    <thead>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Rating</th>
                    <th>
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="pharmacistsSort"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Sort by
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#" v-on:click="onSortPharmacists(0)">Rating (lowest first)</a>
                          <a class="dropdown-item" href="#" v-on:click="onSortPharmacists(1)">Rating (highest first)</a>
                        </div>
                      </div>
                    </th>
                    </thead>
                    <tbody v-for="p in pharmacists" v-bind:key="p.id">
                    <td>{{ p.name }}</td>
                    <td>{{ p.surname }}</td>
                    <td>{{ p.rating }}</td>
                    <td>
                      <button class="btn btn-success" v-on:click="onSelectPharmacist(p)">Select pharmacist</button>
                    </td>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="px-5">
                <button @click.prevent="prev()" class="btn btn-info btn-block">Go back to pharmacies</button>
              </div>
            </div>
          </fieldset>
          <fieldset v-if="step === 3">
            <div class="panel-body">
              <h4 class="text-dark">Step 3: Confirm an appointment</h4>
              <br>
              <div class="card bg-dark text-light mx-auto" style="width: 50rem;">
                <div class="card-body">
                  <h5 class="card-title">Appointment information:</h5>
                  <p class="card-text">
                    Start time: {{ this.date }} {{ this.time }}
                  </p>
                  <p class="card-text">
                    Pharmacist: {{ this.selectedPharmacist.name }} {{ this.selectedPharmacist.surname }}
                  </p>
                  <p>
                    Location: {{ this.selectedPharmacy.name }}, {{ this.selectedPharmacy.address }}
                  </p>
                  <div class="row">
                    <div class="col">
                      <button @click.prevent="prev()" class="btn btn-info btn-block">Back to pharmacists</button>
                    </div>
                    <div class="col">
                      <button @click.prevent="onSubmit()" class="btn btn-success btn-block">Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "SchedulePharmacistExam",
  data() {
    return {
      date: '',
      time: '',
      pharmacies: [],
      pharmacyNoResults: false,
      step: 1,
      pharmacists: [],
      pharmacistNoResults: false,
      selectedPharmacyId: 0,
      selectedPharmacy: null,
      selectedPharmacistId: 0,
      selectedPharmacist: null,
      dateLimit: '1970-01-01'
    }
  },
  mounted() {
    this.setMinDate()
  },
  methods: {
    onSearchPharmacies() {
      this.getPharmacies()
    },
    onSelectPharmacy(pharmacy) {
      this.selectedPharmacy = pharmacy
      this.selectedPharmacyId = pharmacy.id
      this.getPharmacists()
      this.next()
    },
    onSelectPharmacist(pharmacist) {
      this.selectedPharmacist = pharmacist
      this.selectedPharmacistId = pharmacist.id
      this.next()
    },
    onSortPharmacies(option) {
      let param = ''
      switch (option) {
        case 0:
          param = 'PRICE_ASC';
          break;
        case 1:
          param = 'PRICE_DESC';
          break;
        case 2:
          param = 'RATING_ASC';
          break;
        case 3:
          param = 'RATING_DESC';
          break;
      }
      this.getPharmacies(param)
    },
    onSortPharmacists(option) {
      let param = ''
      switch (option) {
        case 0:
          param = 'RATING_ASC';
          break;
        case 1:
          param = 'RATING_DESC';
          break;
      }
      this.getPharmacists(param)
    },
    onSubmit() {
      let dateTime = this.getDateFromInputs();
      let data = {"dateTime": dateTime, "pharmacistId": this.selectedPharmacistId}
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + "pharmacistExam/", data)
          .then(response => {
            response.data
            alert("Appointment successfully scheduled!")
          })
          .catch(err => alert(err.response.data))
    },
    getPharmacies(sort = '') {
      let dateTime = this.getDateFromInputs();
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "pharmacistExam/pharmacies/" + dateTime + "/" + sort)
          .then(response => {
            this.pharmacies = response.data;
            this.pharmacyNoResults = this.pharmacies.length === 0
          })
    }
    ,
    getPharmacists(sort = '') {
      let dateTime = this.getDateFromInputs();
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "pharmacistExam/pharmacists/" + this.selectedPharmacyId + "/" + dateTime + "/" + sort)
          .then(response => {
            this.pharmacists = response.data;
            this.pharmacistNoResults = this.pharmacies.length === 0
          })
    }
    ,
    getDateFromInputs() {
      let dateParts = this.date.split('-');
      let year = parseInt(dateParts[0]);
      let month = parseInt(dateParts[1]) - 1;
      let day = parseInt(dateParts[2]);
      let timeParts = this.time.split(':')
      let hour = parseInt(timeParts[0]);
      let minute = parseInt(timeParts[1]);
      return new Date(year, month, day, hour, minute);
    }
    ,
    prev() {
      this.step--;
    }
    ,
    next() {
      this.step++;
    },
    setMinDate: function () {
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

      this.dateLimit = yyyy + '-' + mm + '-' + dd;
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <b-jumbotron class="jumbotron bg-light text-light">
      <div class="input-group mb-3 px-5">
        <input type="date" class="form-control" placeholder="Date" aria-label="Date" v-model="date">
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
                  <a class="dropdown-item" href="#" v-on:click="onSort(0)">Price (lowest first)</a>
                  <a class="dropdown-item" href="#" v-on:click="onSort(1)">Price (highest first)</a>
                  <a class="dropdown-item" href="#" v-on:click="onSort(2)">Rating (lowest first)</a>
                  <a class="dropdown-item" href="#" v-on:click="onSort(3)">Rating (highest first)</a>
                </div>
              </div>
            </th>
          </tr>
          </thead>
          <tbody v-for="p in pharmacies" v-bind:key="p.id">
          <tr>
            <td>{{ p.name }}</td>
            <td>{{ p.address }}</td>
            <td>{{ p.rating }}</td>
            <td>{{ p.price }}</td>
            <td>
              <button class="btn btn-success" v-on:click="onSelect(p.id)">Select pharmacy</button>
            </td>
          </tr>
          </tbody>
        </table>
        <p v-if="noResults" class="text-warning">
          Looks like there aren't any pharmacies with available pharmacist appointments.
          Try searching for an other date or time
        </p>
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
      noResults: false
    }
  },
  methods: {
    onSearchPharmacies() {
      this.getPharmacies()
    },
    onSelect(id) {
      console.log(id)
    },
    onSort(option) {
      console.log(option)
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
    getPharmacies(sort = '') {
      let dateTime = this.getDateFromInputs();
      this.$http
          .get("http://localhost:8080/pharmacistExam/pharmacies/" + dateTime + "/" + sort)
          .then(response => {
            this.pharmacies = response.data;
            this.noResults = this.pharmacies.length === 0
          })
    },
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
  }
}
</script>

<style scoped>

</style>
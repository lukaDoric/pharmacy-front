<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Pharmacist vacation requests</h1>
      <div class="table-responsive">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Vacation Time</th>
            <th scope="col">Accept/Decline</th>
          </tr>
          </thead>
          <tbody v-for="(vacation, index) in pharmacistVacations" :key="index">
          <tr>
            <td>{{ vacation.name }}</td>
            <td>{{ vacation.surname }}</td>
            <td>{{ vacation.vacationInterval }}</td>
            <td>
              <form>
                <input v-model="selected[index]" type="radio" name="status" value="accept">
                <label>Accept</label><br>
                <input v-model="selected[index]" type="radio" name="status" value="decline">
                <label>Decline</label><br>
              </form>
              <b-button class="btn-success" @click="sendVacationResponsePharmacist(index)">Send</b-button>
            </td>
          </tr>
          <b-form-textarea v-model="reason[index]" placeholder="Reason..." v-if="selected[index] === 'decline'">
          </b-form-textarea>
          </tbody>
        </table>
      </div>
    </b-jumbotron>

    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Dermatologist vacation requests</h1>
      <div class="table-responsive">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Vacation Time</th>
            <th scope="col">Accept/Decline</th>
          </tr>
          </thead>
          <tbody v-for="(vacation, index) in dermatologistVacations" :key="index">
          <tr>
            <td>{{ vacation.name }}</td>
            <td>{{ vacation.surname }}</td>
            <td>{{ vacation.vacationInterval }}</td>
            <td>
              <form>
                <input v-model="selected[index]" type="radio" name="status" value="accept">
                <label>Accept</label><br>
                <input v-model="selected[index]" type="radio" name="status" value="decline">
                <label>Decline</label><br>
              </form>
              <b-button class="btn-success" @click="sendVacationResponseDermatologist(index)">Send</b-button>
            </td>
          </tr>
          <b-form-textarea rowspan="4" v-model="reason[index]" placeholder="Reason..." v-if="selected[index] === 'decline'">
          </b-form-textarea>
          </tbody>
        </table>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reason: [],
      selected: [],
      pharmacistVacations: [],
      dermatologistVacations: []
    }
  },

  mounted() {
    axios
        .get('http://localhost:8080/vacation/getAllPharmacistsVacation')
        .then(response => {
          this.pharmacistVacations = response.data;
        })

    axios
        .get('http://localhost:8080/vacation/getAllDermatologistsVacation')
        .then(response => {
          this.dermatologistVacations = response.data;
        })
  },

  methods: {
    sendVacationResponseDermatologist(index) {
      console.log(this.reason[index])
    },

    sendVacationResponsePharmacist(index) {
      console.log(this.reason[index])
    }
  }
}
</script>
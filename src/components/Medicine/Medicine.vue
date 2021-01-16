<template>
  <div>
    <b-jumbotron>
      <h1 class="display-4">Medicine</h1>
      <table class="table table-dark">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Form</th>
        </tr>
        </thead>
        <tbody v-for="(m, index) in medicine" v-bind:key="m.id">
        <tr>
          <th scope="row">{{ index }}</th>
          <td>{{ m.name }}</td>
          <td>{{ m.description }}</td>
          <td>{{ m.form }}</td>
          <td>
            <button type="button" class="btn btn-success">Make a reservation</button>
          </td>
        </tr>
        </tbody>
      </table>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      medicine: []
    }
  },
  name: "Medicine",
  mounted() {
    axios
        .get("http://localhost:8080/medicine-reservation/medicine")
        .then(response => {this.medicine = response.data; console.log(this.medicine)})
  }
}
</script>

<style scoped>

</style>
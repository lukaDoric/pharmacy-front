<template>
  <b-jumbotron class="jumbotron">
    <h1 class="display-4">Pharmacists</h1>
    <div>
      <table class="table table-dark">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Surname</th>
          <th scope="col">Appointment</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>
            <button type="button" class="btn btn-success">Check availability</button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>
            <button type="button" class="btn btn-success">Check availability</button>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>
            <button type="button" class="btn btn-success">Check availability</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  name: "Pharmacists"
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
</style>
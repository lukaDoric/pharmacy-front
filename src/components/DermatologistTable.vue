<template>
  <b-jumbotron class="jumbotron">
    <h1 class="display-4">Dermatologists</h1>
    <div>
      <table class="table table-dark">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  name: "DermatologistTable"
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
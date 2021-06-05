<template>
  <b-jumbotron>
    <h4 class="text-dark">Appointment Report</h4>
    <br>
  </b-jumbotron>
</template>

<script>
export default {
  name: "AppointmentReport"
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
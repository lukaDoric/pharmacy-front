<template>
  <div>
    <b-jumbotron>
      <h4 class="text-dark">Working Calendar</h4>
      <br/>
      <b-calendar></b-calendar>
      <br/>
      <div>
        <button class="btn btn-info btn-sm" type="button" v-on:click="onSelect()">Select date</button>
      </div>
      <br/>
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
    </b-jumbotron>
  </div>
</template>

<script>

export default {
  name: "DermatologistWorkingCalendar",
  methods: {
    onSelect(){

    }
  }
}
</script>

<style scoped>

</style>
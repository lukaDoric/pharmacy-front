<template>
  <div>
    <div class="row">
      <table style="margin: 0 5% " class="table table-dark table-hover">
        <thead >
          <th>Name</th>
          <th style="width: 33.3333%">Uuid</th>
          <th style="width: 33.3333%">Amount</th>
        </thead>
        <tbody>
        <tr v-for="m in supplierMedicines" v-bind:key="m.uuid">
          <td>{{ m.medicineName }}</td>
          <td>{{ m.uuid }}</td>
          <td>{{ m.medicineAmount }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-lg-6 block">
        <table class="table">
          <tbody>
          <tr v-for="order in orders" v-bind:key="order.id">
            <b-jumbotron>
              <div class="card">
                <div class="card-header">
                  <h3>ORDER ID: {{ order.id }}</h3>
                  <h3>ORDER DEADLINE: {{ formatDate(order.deadline) }}</h3>
                  <button class="btn btn-success" v-on:click="selectedOrder=order">See orders medicines</button>
                </div>
                <div class="card-body">
                  <table class="table table-dark table-hover">
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Uuid</th>
                      <th>Form</th>
                      <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in getKeys(order.orderItems)" v-bind:key="item">
                      <td>{{ convertToMap1(item).name }}</td>
                      <td>{{ convertToMap1(item).uuid }}</td>
                      <td>{{ convertToMap1(item).form }}</td>
                      <td>{{ order.orderItems[item] }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </b-jumbotron>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-6">
        <b-jumbotron class="jumbotron">
          <div class="card">
            <div class="card-header">
              <h2 v-if="selectedOrder != null" class="display-4">Make offer for order with ID: {{
                  selectedOrder.id
                }}</h2>
              <h2 v-else class="display-4">Select order to make an offer.</h2>
            </div>
            <div class="card-body bg-dark" v-if="selectedOrder != null">
              <div style="color: white">
                <hr color="white">
                <div class="form-row">
                  <label for="shippingDays">Estimated number of days for delivery</label>
                  <input type="number" min="1" id="shippingDays" class="form-control" v-model="shippingDays">
                </div>
                <div class="form-row">
                  <label for="shippingDays">Order price in euros.</label>
                  <input type="number" min="1" id="price" class="form-control" v-model="price">
                </div>
                <div class="form-group mt-1" style="width: 100%">
                  <button type="submit" v-on:click="onSubmit" class="btn btn-info btn-block">Submit reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Offers",
  data() {
    return {
      orders: [],
      selectedOrder: null,
      shippingDays: 1,
      price: 1,
      supplierMedicines:[]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.selectedOrder = null;
      this.$http
          .get("http://localhost:8080/order/notOffered")
          .then(response => {
            this.orders = response.data;
          })
      this.$http.get("http://localhost:8080/offer/medicine")
      .then(response => {
        this.supplierMedicines = response.data
      })
    },
    onSubmit() {
      console.log(this.selectedOrder.id);
      let offer = {'shippingDays': this.shippingDays, 'price': this.price, 'orderId': this.selectedOrder.id};
      this.$http.post("http://localhost:8080/offer/", offer)
          .then(this.init)
          .catch(err => alert(err.response.data));
    },
    formatDate(date) {
      const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
      const mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
      const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
      return `${da}-${mo}-${ye}`
    },
    convertToMap(map) {
      let mp = new Map();

      Object.keys(map).forEach((k) => mp.set(k, map[k]));

      return mp
    },
    convertToMap1(map) {
      return JSON.parse(map)
    },
    getKeys(map) {
      return this.convertToMap(map).keys();
    }

  }
}
</script>

<style scoped>

</style>
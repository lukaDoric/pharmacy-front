<template>
  <div class="row">
    <div class="col-lg-9 block">
      <table class="table table-dark table-hover table-bordered">
        <tbody>
        <tr v-for="order in orders" v-bind:key="order.id">
          <b-jumbotron>
            <div class="card-dark">
              <h3>ORDER ID: {{order.id}}</h3>
              <h3>ORDER DEADLINE: {{order.deadline}}</h3>
            </div>
          </b-jumbotron>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-lg-5">
      <b-jumbotron class="jumbotron">
        <div class="card">
          <div class="card-header">
            <h2 v-if="selectedOffer != null" class="display-4">Make offer for {{ selectedOffer.id }}</h2>
            <h2 v-else class="display-4">Select order to make an offer.</h2>
          </div>
          <div class="card-body bg-dark" v-if="selectedOffer != null">
            <div v-if="selectedPharmacy!=null" style="color: white">
              <hr color="white">
              <div class="form-row">
                <label for="shippingDays">Estimated number of days for delivery</label>
                <input type="number" min="0" id="shippingDays" class="form-control" v-model="shippingDays">
              </div>
              <div class="form-row">
                <label for="shippingDays">Order price in euros.</label>
                <input type="number" min="0" id="price" class="form-control" v-model="price">
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
</template>

<script>

export default {
  name: "Offers",
  data() {
    return {
      orders: [],
      selectedOffer: null,
      shippingDays: 0,
      price:1,
    }
  },
  mounted() {
    this.$http
        .get("http://localhost:8080/order/notOffered")
        .then(response => {
          this.orders = response.data;
        })
  },
  methods:{
    onSubmit(){
      console.log(this.selectedOffer);
    }
  }
}
</script>

<style scoped>

</style>
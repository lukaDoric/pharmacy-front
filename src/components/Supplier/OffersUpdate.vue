<template>
  <div class="row">
    <div class="col-lg-8">
      <b-jumbotron>
        <table class="table table-dark table-hover">
          <thead>
          <tr>
            <th>Price</th>
            <th>Shipping days</th>
            <th>Status</th>
            <th>Orders ID</th>
            <th>Orders deadline</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="offer in offers" v-bind:key="offer.id">
            <td>{{ offer.price }}</td>
            <td>{{ offer.shippingDays }}</td>
            <td>{{ offer.status }}</td>
            <td>{{ offer.orderId }}</td>
            <td>{{ formatDate(offer.orderDeadline) }}</td>
            <td>
              <button v-if="canChange(offer.orderDeadline, offer.status)" class="btn btn-success"
                      v-on:click="select(offer)">Change
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </b-jumbotron>
    </div>
    <div class="col-lg-4">
      <b-jumbotron>
        <div class="card">
          <div class="card-header">
            <h2 v-if="selectedOffer!=null">Change offer.</h2>
            <h2 v-else>Select offer. </h2>
          </div>
          <div class="card-body bg-dark" style="color: white" v-if="selectedOffer!=null">
            <div class="form-check">
              <label>Price:</label>
              <br>
              <input class="form-control" type="number" min="1" v-model="price">
            </div>
            <br>
            <div class="form-check">
              <label>Shipping days:</label>
              <br>
              <input class="form-control" type="number" min="1" v-model="shippingDays">
            </div>
            <hr class="bg-light">
            <div class="form-check">
              <button class="btn btn-info form-control" v-on:click="submit">Submit</button>
            </div>
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: "OffersUpdate",
  data() {
    return {
      offers: [],
      selectedOffer: null,
      price: 1,
      shippingDays: 1
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    formatDate(date) {
      const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
      const mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
      const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
      return `${da}-${mo}-${ye}`
    },
    canChange(date, status) {
      let now = new Date();
      return now.getTime() < date && status !== 'ACCEPTED';
    },
    select(offer) {
      this.selectedOffer = offer;
      this.price = offer.price;
      this.shippingDays = offer.shippingDays
    },
    submit() {
      let offer = {'shippingDays': this.shippingDays, 'price': this.price, 'offerId': this.selectedOffer.offerId}
      this.$http.post("http://localhost:8080/offer/update", offer).then(response => {
        console.log(response);
        this.init()
      });
    },
    init() {
      this.$http.get("http://localhost:8080/offer/").then(response => this.offers = response.data);
      this.selectedOffer = null;
    }
  }
}
</script>

<style scoped>

b-jumbotron {
  margin: 2%;
}

</style>
<template>
  <div>
    <b-jumbotron>
      <div class="d-flex bd-highlight mb-3">
        <div class="p-2 bd-highlight"><h3 class="display-4">Create Medicine Order</h3></div>
        <div class="ml-auto p-2 bd-highlight">
          <button name="addOrder" type="button" class="btn btn-success mt-3 mr-2" v-on:click="createOrder">Create order
          </button>
          <button name="addOrder" type="button" class="btn btn-secondary mt-3 mr-2" v-on:click="addOrderItem">Add
            medicine
          </button>
          <button name="addOrder" type="button" class="btn btn-danger mt-3" v-on:click="removeOrderItem">Remove medicine
          </button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <b-form-input v-model="deadline" id="dateInput4" placeholder="Deadline" type="date"
                        :min="today"></b-form-input>
        </div>
      </div>
      <div v-for="(item, index) in items" v-bind:key="index">
        <OrderItem :medicine="item.medicineId" @medicineIdChanged="item.medicineId = $event"
                   :amount="item.amount" @amountChanged="item.amount = $event" :medicines="medicines"></OrderItem>
      </div>
    </b-jumbotron>
    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Recent orders</h1>
      <div v-for="(order, index) in recentOrders" :key="index">
        <div class="d-flex bd-highlight mb-3">
          <button type="button" class="btn btn-danger mt-3 mr-2" @click="removeOrder(order.id)">Remove order</button>
          <h4 class="mt-3 ml-5">Deadline: {{ order.deadlineString }}</h4>
          <h4 class="mt-3 ml-5">Order id: {{ order.id }}</h4>
        </div>
        <table class="table table-dark">
          <thead>
          <tr>
            <th scope="col">Medicine</th>
            <th scope="col">Amount</th>
          </tr>
          </thead>
          <tbody v-for="(orderItem, index) in order.medicineAmount" :key="index">
          <tr>
            <td>{{ orderItem.medicineName }}</td>
            <td>{{ orderItem.medicineAmount }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-jumbotron>

    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Offers</h1>
      <div v-for="(offers, index) in offersList" :key="index">
        <hr color="black">
        <div class="d-flex bd-highlight mb-3" v-for="(offer, index) in offers" :key="index">
          <button v-if="offer.status === 'WAITING'" type="button" class="btn btn-success mt-3 mr-2"
                  @click="acceptOffer(offer.offerId)">Accept offer
          </button>
          <h4 class="mt-3 ml-5">Order Deadline: {{ formatDate(offer.orderDeadline) }}</h4>
          <h4 class="mt-3 ml-5">Order id: {{ offer.orderId }}</h4>
          <h4 class="mt-3 ml-5">Price: {{ offer.price + "$" }}</h4>
          <h4 class="mt-3 ml-5">Shipping days: {{ offer.shippingDays }}</h4>
          <h4 class="mt-3 ml-5">Status: {{ offer.status }}</h4>
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";
import OrderItem from "@/components/Order/OrderItem";

export default {
  name: "Order",
  components: {OrderItem},
  data() {
    return {
      items: [{medicineId: '', amount: 0}],
      deadline: null,
      medicineName: '',
      amount: 0,
      medicineAmount: null,
      recentOrders: [],
      medicines: [],
      offersList: [],
      today: new Date().toISOString().split('T')[0]
    }
  },

  mounted() {
    axios
        .get('http://localhost:8080/order/getOrdersByPharmacy')
        .then(response => {
          this.recentOrders = response.data;
        })

    axios
        .get('http://localhost:8080/offer/getOffersByPharmacy')
        .then(response => {
          this.offersList = response.data;
        })

    this.$http.get('http://localhost:8080/medicine/get/all')
        .then(response => {
          this.medicines = response.data;
        })
  },

  methods: {
    createOrder() {
      this.medicineAmount = {}

      if (this.deadline === null) {
        alert("Please fill all fields or remove ones you don't use!")
      }

      for (let i = 0; i < this.items.length; i++) {
        this.medicineAmount[this.items[i].medicineId] = this.items[i].amount
        if ((this.medicineAmount[this.items[i].medicineId]) === '' || (this.medicineAmount[this.items[i].medicineId]) <= 0
            || (this.items[i].medicineId === "")) {
          alert("Please fill all fields or remove ones you don't use!")
          return;
        }
      }

      axios
          .post('http://localhost:8080/order/', {
            orderItems: this.medicineAmount,
            deadline: this.deadline
          }).then(response => {
        alert(response.data);
        window.location.reload();
      }).catch(err => {
        alert(err.response.data)
      });
    },

    removeOrder(orderId) {
      this.$http
          .delete('http://localhost:8080/order/deleteOrder/' + orderId)
          .then(window.location.reload())
          .catch(reason => alert(reason.message));
    },

    acceptOffer(offerId) {
      this.$http
          .put('http://localhost:8080/offer/acceptOffer/' + offerId)
          .then(window.location.reload())
          .catch(reason => alert(reason.message));
    },

    formatDate(date) {
      const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
      const mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
      const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
      return `${da}-${mo}-${ye}`
    },

    addOrderItem() {
      this.items.push({medicineName: "", amount: 0})
    },

    removeOrderItem() {
      this.items.pop()
    }
  }
}
</script>

<style scoped>
.btn {
  margin-top: 2%;
}
</style>
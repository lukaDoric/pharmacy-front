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
          <button type="button" class="btn btn-success mt-3 mr-2">Check details</button>
          <h4 class="mt-3 ml-5">Deadline: {{ order.deadlineString }}</h4>
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
      today: new Date().toISOString().split('T')[0]
    }
  },

  mounted() {
    axios
        .get('http://localhost:8080/order/getOrdersByPharmacy')
        .then(response => {
          this.recentOrders = response.data;
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
        if ((this.medicineAmount[this.items[i].medicineId]) === '' || (this.medicineAmount[this.items[i].medicineId]) === 0
            || (this.items[i].medicineId === "")) {
          alert("Please fill all fields or remove ones you don't use!")
          return;
        }
      }

      axios
          .post('http://localhost:8080/order/', {
            orderItems: this.medicineAmount,
            deadline: this.deadline
          });
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
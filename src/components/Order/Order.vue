<template>
  <div>
    <b-jumbotron>
      <div class="d-flex bd-highlight mb-3">
        <div class="p-2 bd-highlight"><h3 class="display-4">Create Medicine Order</h3></div>
        <div class="ml-auto p-2 bd-highlight">
          <button name="addOrder" type="button" class="btn btn-success mt-3 mr-2" v-on:click="createOrder">Create order
          </button>
          <button name="addOrder" type="button" class="btn btn-secondary mt-3 mr-2" v-on:click="addItem">Add medicine
          </button>
          <button name="addOrder" type="button" class="btn btn-danger mt-3" v-on:click="removeItem">Remove medicine
          </button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <b-form-input v-model="deadline" id="dateInput4" placeholder="Deadline" type="date"></b-form-input>
        </div>
      </div>
      <div v-for="(item, index) in items" v-bind:key="index">
        <OrderItem :medicine="item.medicineName" @medicineNameChanged="item.medicineName = $event"
                   :amount="item.amount" @amountChanged="item.amount = $event"></OrderItem>
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
      items: [{medicineName: '', amount: 0}],
      deadline: null,
      medicineName: '',
      amount: 0,
      medicineAmount: null
    }
  },

  methods: {
    createOrder() {
      this.medicineAmount = {}

      for (let i = 0; i < this.items.length; i++) {
        this.medicineAmount[this.items[i].medicineName] = this.items[i].amount
      }

      axios
          .post('http://localhost:8080/order/', {
            orderItems: this.medicineAmount,
            deadline: this.deadline
          });
    },

    addItem() {
      this.items.push({medicineName: "", amount: 0})
    },

    removeItem() {
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
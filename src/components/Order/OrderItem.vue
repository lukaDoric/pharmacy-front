<template>
  <div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <input :value="medicine" class="form-control" @input="changeMedicineName" placeholder="Enter medicine name"
               type="text">
      </div>
      <div class="form-group col-md-6">
        <input :value="amount" class="form-control" @input="changeAmount" placeholder="Amount" type="number">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "OrderItem",

  props: ['medicine', 'amount'],

  data() {
    return {
      medicineName: '123',
      amountValue: 0
    }

  },

  methods: {
    changeMedicineName(event) {
      this.medicineName = event.target.value;
      this.$emit('medicineNameChanged', this.medicineName);
    },

    changeAmount(event) {
      this.amountValue = event.target.value;
      this.$emit('amountChanged', this.amountValue);
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <div class="form-row">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">{{ medicineName }}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" v-for="(medicine, index) in medicines"
             :key="index" v-on:click="onMedicineSelected(medicine)">{{ medicine.name + '--' + medicine.form }}</a>
        </div>
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

  props: ['medicine', 'amount', 'medicines'],

  data() {
    return {
      medicineName: 'Select medicine',
      amountValue: 0,
      medicinesValue: [],
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
    },

    onMedicineSelected(medicine) {
      this.medicineName = medicine.name + '--' + medicine.form;
      this.$emit('medicineIdChanged', medicine.id);
    }
  }
}
</script>

<style scoped>

</style>
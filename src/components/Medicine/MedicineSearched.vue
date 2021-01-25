<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: "MedicineSearched",
    data(){
      return {
        name:""
      }

    },
    mounted() {
      this.init();
    },
    methods: {
      init () {
        this.$http.get('', );
        console.log(this.$route.params.medicineName); //should return id of URL param
      },
    }
  }
</script>

<style scoped>

</style>
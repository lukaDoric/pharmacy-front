<template>
  <div>
    <b-jumbotron class="bg-dark">
      <div class="row">
        <div class="col-3"></div>
        <div class="col">
          <h1 class="text-light">Patient home page</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <!-- Pharmacy section -->
          <div class="list-group bg-dark text-light my-3">
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(0)">
              Search pharmacies
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(1)">
              Promotions
            </a>
          </div>

          <!-- Medicine section -->
          <div class="list-group bg-dark text-light my-3">
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(2)">
              Search Medicine
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(3)">
              Medicine reservations
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(4)">
              E-prescriptions
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(5)">
              Scan QR code
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(6)">
              Allergies
            </a>
          </div>

          <!-- Exam section -->
          <div class="list-group bg-dark text-light my-3">
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(7)">
              Dermatologist exam history
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(8)">
              Schedule dermatologist exam
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark" v-on:click="changeDisplay(9)">
              Pharmacist appointment history
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
               v-on:click="changeDisplay(10)">
              Schedule pharmacist appointment
            </a>
          </div>

          <!-- Feedback section -->
          <div class="list-group bg-dark text-light my-3">
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
               v-on:click="changeDisplay(11)">
              Rate our services
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light text-dark"
               v-on:click="changeDisplay(12)">
              Leave a complaint
            </a>
          </div>
        </div>

        <div class="col">
          <PharmacySearch v-if="display === 0"/>
          <Subscriptions v-if="display === 1"/>
          <Medicine v-if="display === 2"/>
          <MedicineReservation v-if="display === 3"/>
          <!-- prescriptions missing -->
          <QR v-if="display === 5"/>
          <Allergies v-if="display === 6"/>
          <Rating v-if="display === 11" />
          <MakeAComplaint v-if="display === 12" />
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import PharmacySearch from "@/components/Pharmacy/PharmacySearch";
import Subscriptions from "@/components/Patient/Subscriptions";
import Medicine from "@/components/Medicine/Medicine";
import MedicineReservation from "@/components/Patient/MedicineReservation";
import QR from "@/components/Patient/QR";
import Allergies from "@/components/Patient/Allergies";
import Rating from "@/components/Patient/Rating";
import MakeAComplaint from "@/components/Patient/MakeAComplaint";

export default {
  name: "PatientHome",
  components: {MakeAComplaint, Rating, Allergies, QR, MedicineReservation, Medicine, Subscriptions, PharmacySearch},
  data() {
    return {
      display: 0
    }
  },
  mounted() {
    // TODO: check user type
  },
  methods: {
    changeDisplay(mode) {
      this.display = mode;
    }
  }
}
</script>

<style scoped>

</style>
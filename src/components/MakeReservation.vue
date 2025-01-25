<template>
  <div class="form-container p-4">
    <div class="mb-4">
      <h3 class="font-bold">Flight Details</h3>
      <p>From: {{ routeData.from }} - To: {{ routeData.to }}</p>
      <p>Flight: {{ formatDate(routeData.flightStart) }} - {{ formatDate(routeData.flightEnd) }}</p>
      <p>Company: {{ routeData.company }}</p>
      <p>Price: {{ formatPrice(routeData.price) }}</p>
      <p>Distance: {{ routeData.distance }}</p>
    </div>
    <form @submit.prevent="confirmReservation(newReservation)" class="space-y-4">
      <input type="hidden" v-model="newReservation.routeId">
      <input type="hidden" v-model="newReservation.providerId">
      <div>
        <input
            type="text"
            v-model="newReservation.firstName"
            placeholder="First name"
            class="form-control"
            required
        />
      </div>
      <div>
        <input
            type="text"
            v-model="newReservation.lastName"
            placeholder="Last name"
            class="form-control"
            required
        />
      </div>
      <button type="submit">Confirm reservation</button>
    </form>
  </div>
</template>

<script>
import {travelService} from "@/services/api";

export default {
  props: {
    routeData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedFrom: '',
      selectedTo: '',
      newReservation: {
        firstName: "",
        lastName: "",
        providerId: this.routeData.provider.id.toString(),
        routeId: this.routeData.routeInfo.id.toString()
      },
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
    },

    async confirmReservation(newReservation) {
      console.log('Form data:', newReservation);

      try {
        const payload = {
          firstName: newReservation.firstName.trim(),
          lastName: newReservation.lastName.trim(),
          providerId: newReservation.providerId,
          routeId: newReservation.routeId
        };
        console.log('Sending payload:', payload);
        await travelService.saveReservation(payload);
        this.resetForm();
      } catch (error) {
        console.error('Error making reservation:', error.response?.data || error.message);
      }
    },

  resetForm() {
    this.newReservation = {
    firstName: "",
    lastName: "",
    providerId: this.routeData.provider.id.toString(),
    routeId: this.routeData.routeInfo.id.toString()
  }
    },
  },
  created() {
    console.log('Route data:', this.routeData);
    this.newReservation = {
      firstName: "",
      lastName: "",
      providerId: this.routeData.provider.id,
      routeId: this.routeData.routeInfo.id
    };
  /*  this.newReservation.routeId = this.routeData.routeInfo.id.toString();
    this.newReservation.providerId = this.routeData.provider.id.toString();*/
  }
}
</script>

<style scoped>

</style>
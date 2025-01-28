<template>
  <div class="form-container">
    <div class="flight-details">
      <h3>Reservation Details</h3>
      <p>From - To: {{ routeData.from }} - {{ routeData.to }}</p>
      <p>Duration: {{ formatDate(routeData.flightStart) }} - {{ formatDate(routeData.flightEnd) }}</p>
      <p>Company: {{ routeData.company }}</p>
      <p>Price: {{ formatPrice(routeData.price) }}</p>
      <p>Distance: {{ routeData.distance }} km</p>
    </div>
    <div v-if="!showConfirmation">
      <form @submit.prevent="validateAndShowConfirm" class="space-y-4">
        <input type="hidden" v-model="newReservation.routeId">
        <input type="hidden" v-model="newReservation.providerId">
        <div>
          <input
              type="text"
              v-model.trim="newReservation.firstName"
              placeholder="First name"
              class="form-control"
              required
              :class="{ 'error': formSubmitted && !newReservation.firstName }"
          />
          <span v-if="formSubmitted && !newReservation.firstName" class="error-message">
            First name is required
          </span>
        </div>
        <div>
          <input
              type="text"
              v-model.trim="newReservation.lastName"
              placeholder="Last name"
              class="form-control"
              required
              :class="{ 'error': formSubmitted && !newReservation.lastName }"
          />
          <span v-if="formSubmitted && !newReservation.lastName" class="error-message">
            Last name is required
          </span>
        </div>
        <button type="submit">Confirm reservation</button>
      </form>
    </div>

    <!-- Confirmation dialog -->
    <div v-if="showConfirmation" class="confirmation-dialog">
      <h3>Confirm Your Reservation</h3>
      <p>Please review your reservation details:</p>
      <!-- Show reservation details -->
      <div class="actions">
        <button @click="confirmReservation(newReservation)">Confirm</button>
        <button @click="showConfirmation = false">Cancel</button>
      </div>
    </div>
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
      showConfirmation: false,
      formSubmitted: false
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price)
    },

    validateAndShowConfirm() {
      this.formSubmitted = true;

      if (!this.newReservation.firstName || !this.newReservation.lastName) {
        return; // Stop if validation fails
      }

      this.showConfirmation = true;
    },

    async confirmReservation(newReservation) {
      try {
        const payload = {
          firstName: newReservation.firstName.trim(),
          lastName: newReservation.lastName.trim(),
          providerId: newReservation.providerId,
          routeId: newReservation.routeId
        };
        await travelService.saveReservation(payload);
        alert('Reservation confirmed!');
        this.$emit('close-reservation');

      } catch (error) {
        console.error('Error making reservation:', error.response?.data || error.message);
      }
    }
  },
  created() {
    console.log('Route data:', this.routeData);
    this.newReservation = {
      firstName: "",
      lastName: "",
      providerId: this.routeData.provider.id,
      routeId: this.routeData.routeInfo.id
    };
  }
}
</script>

<style scoped>
input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
}

.flight-details {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

input {
  width: 100%;
  color: white;
  margin: 0.5rem 0;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

input.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

button[type="submit"] {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
}
</style>
<template>
  <div>
  <h3>Find your reservation</h3>

  <div class="search-reservation">
    <form @submit.prevent="getReservation(reservation)" class="space-y-4">
      <div>
        <input type="text" v-model="reservation.firstName"
               placeholder="Insert first name" class="form-control"
               required/>
      </div>
      <div>
        <input type="text" placeholder="Insert last name" v-model="reservation.lastName"
               class="form-control"
               required/>
      </div>
      <button type="submit">Find reservations</button>
    </form>
<br>
    <div v-if="reservations.length">
      <h3>Your reservations:</h3>
      <p class="total-price">Total Price: €{{ totalPrice }}</p>


      <table id="reservation">
      <thead>
      <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Route</th>
        <th>Price</th>
        <th>Flight start</th>
        <th>Flight end</th>
        <th>Travel time</th>
        <th>Flight Company</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(res, index) in reservations" :key="index">
        <td>{{ res.firstName }}</td>
        <td>{{ res.lastName }}</td>
        <td>{{ res.route }}</td>
        <td>{{ res.quotedPrice }}</td>
        <td>{{ formatDate(res.flightStart) }}</td>
        <td>{{ formatDate(res.flightEnd) }}</td>
        <td>{{ res.travelTimeHours }} hours</td>
        <td>{{ res.companyName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
  </div>
</template>

<script>
import {travelService} from "@/services/api";

export default {
  props: {},
  data() {
    return {
      reservations: [],

      reservation: {
        firstName: "",
        lastName: "",
      },
    }
  },
  computed: {
    totalPrice() {
      return this.reservations.reduce((sum, res) => sum + parseFloat(res.quotedPrice), 0).toFixed(2);
    }
  },
  methods: {
    async getReservation(reservation) {
      try {
        const data  = await travelService.getReservations(reservation);
        this.reservations = data;
        this.resetForm();
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        alert('Reservation not found!')
      }
    },
    resetForm() {
      this.reservation = {
        firstName: "",
        lastName: "",
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  },
    created() {

    }
    }
</script>

<style scoped>
.search-reservation {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h3 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.total-price {
  text-align: right;
  font-size: 1.2rem;
  margin: 1rem 0;
}

table {
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: left;
}

th {
  background: rgba(255, 255, 255, 0.1);
}

button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
}
</style>
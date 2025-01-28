<template>
  <div v-if="routes.length" class="mt-4">
    <RoutesTableFilter
        :companies="uniqueCompanies"
        @filter-company="filterByCompany"
        @filter-price="filterByPrice"
        @filter-distance="filterByDistance"
        @filter-time="filterByTime"
    />
    <br>
    <div v-if="routes.length" class="mt-4"><h2 class="text-xl font-bold mb-4">Available Routes</h2>
      <table class="min-w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">From</th>
          <th class="border p-2">To</th>
          <th class="border p-2">Flight Start</th>
          <th class="border p-2">Flight End</th>
          <th class="border p-2">Price</th>
          <th class="border p-2">Distance</th>
          <th class="border p-2">Company</th>
          <th class="border p-2"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(route, index) in routes" :key="index" class="hover:bg-gray-50">
          <td class="border p-2">{{ from }}</td>
          <td class="border p-2">{{ to }}</td>
          <td class="border p-2">{{ formatDate(route.flightStart) }}</td>
          <td class="border p-2">{{ formatDate(route.flightEnd) }}</td>
          <td class="border p-2">{{ formatPrice(route.price) }}</td>
          <td class="border p-2">{{ route.routeInfo.distance }}</td>
          <td class="border p-2">{{ route.company.name }}</td>
          <td class="border p-2">
            <button @click="makeReservation(route)">Make a reservation</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RoutesTableFilter from "@/components/RoutesTableFilter.vue";

export default {
  name: 'RoutesTable',
  components: {RoutesTableFilter},
  props: {
    routes: {type: Array, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true}
  },
  data() {
    return {
      filteredRoutes: []
    }
  },
  computed: {
    uniqueCompanies() {
      return [...new Set(this.routes.map(route => route.company.name))];
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price);
    }, formatDate(dateString) {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }, makeReservation(route) {
      console.log('Route data being emitted:', route);
      this.$emit('make-reservation', {
        routeInfo: route.routeInfo,
        provider: route,
        from: this.from,
        to: this.to,
        flightStart: route.flightStart,
        flightEnd: route.flightEnd,
        company: route.company.name,
        price: route.price,
        distance: route.routeInfo.distance
      });
      this.$emit('close-table');
    },
    filterByCompany(company) {
      this.filteredRoutes = this.routes.filter(route => route.company.name === company);
    },
    filterByPrice(order) {
      this.filteredRoutes = [...this.routes].sort((a, b) => {
        return order === 'Lowest to highest' ? a.price - b.price : b.price - a.price;
      });
    },
    filterByDistance(order) {
      this.filteredRoutes = [...this.routes].sort((a, b) => {
        return order === 'Shortest to longest' ?
            a.routeInfo.distance - b.routeInfo.distance :
            b.routeInfo.distance - a.routeInfo.distance;
      });
    },
    filterByTime(order) {
      this.filteredRoutes = [...this.routes].sort((a, b) => {
        const timeA = new Date(a.flightEnd) - new Date(a.flightStart);
        const timeB = new Date(b.flightEnd) - new Date(b.flightStart);
        return order === 'Shortest to longest' ? timeA - timeB : timeB - timeA;
      });
    }
  }
}
</script>

<style scoped>
.routes-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

th {
  font-weight: bold;
  background: rgba(255, 255, 255, 0.1);
}

.select-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.select-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.table-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.close-btn {
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
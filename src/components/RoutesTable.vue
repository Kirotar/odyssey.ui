<template>
  <div v-if="routes.length" class="routes-container">
    <RoutesTableFilter
        :companies="uniqueCompanies"
        @filter-company="filterByCompany"
        @filter-price="filterByPrice"
        @filter-distance="filterByDistance"
        @filter-time="filterByTime"
        class="filter-section"
    />
    <br>
    <h2 class="text-xl font-bold mb-4">Available Routes</h2>
    <div class="table-wrapper">
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
          <th class="border p-2">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(route, index) in filteredRoutes.length ? filteredRoutes : routes" :key="index" class="hover:bg-gray-50">
          <td class="border p-2" data-label="From">{{ from }}</td>
          <td class="border p-2" data-label="To">{{ to }}</td>
          <td class="border p-2" data-label="Flight Start">{{ formatDate(route.flightStart) }}</td>
          <td class="border p-2" data-label="Flight End">{{ formatDate(route.flightEnd) }}</td>
          <td class="border p-2" data-label="Price">{{ formatPrice(route.price) }}</td>
          <td class="border p-2" data-label="Distance">{{ route.routeInfo.distance }}</td>
          <td class="border p-2" data-label="Company">{{ route.company.name }}</td>
          <td class="border p-2" data-label="Action">
            <button @click="makeReservation(route)" class="w-full">Make a reservation</button>
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
      selectedCompany: 'All',
      currentSort: null,
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
    makeReservation(route) {
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
    applyFilters() {
      let filtered = this.selectedCompany === 'All'
          ? [...this.routes]
          : this.routes.filter(route => route.company.name === this.selectedCompany);

      if (this.currentSort) {
        const {type, order} = this.currentSort;
        switch (type) {
          case 'price':
            filtered.sort((a, b) => order === 'Lowest to highest' ? a.price - b.price : b.price - a.price);
            break;
          case 'distance':
            filtered.sort((a, b) => order === 'Shortest to longest' ? a.routeInfo.distance - b.routeInfo.distance : b.routeInfo.distance - a.routeInfo.distance);
            break;
          case 'time':
            filtered.sort((a, b) => {
              const timeA = new Date(a.flightEnd) - new Date(a.flightStart);
              const timeB = new Date(b.flightEnd) - new Date(b.flightStart);
              return order === 'Shortest to longest' ? timeA - timeB : timeB - timeA;
            });
        }
      }
      this.filteredRoutes = filtered;
    },

    filterByCompany(company) {
      this.selectedCompany = company;
      this.applyFilters();
    },

    filterByPrice(order) {
      this.currentSort = {type: 'price', order};
      this.applyFilters();
    },

    filterByDistance(order) {
      this.currentSort = {type: 'distance', order};
      this.applyFilters();
    },

    filterByTime(order) {
      this.currentSort = {type: 'time', order};
      this.applyFilters();
    },
  },
  watch: {
    routes: {
      immediate: true,
      handler(newRoutes) {
        this.filteredRoutes = newRoutes;
      }
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

.table-wrapper {
  overflow-x: auto;
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

@media (max-width: 768px) {
  .routes-container {
    padding: 1rem;
  }

  table, thead, tbody, tr, th, td {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  td {
    position: relative;
    padding-left: 50%;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  td:before {
    position: absolute;
    left: 1rem;
    width: 45%;
    padding-right: 10px;
    font-weight: bold;
    content: attr(data-label);
  }

  td:last-child {
    border-bottom: none;
  }

  button {
    width: 100%;
  }
}
</style>
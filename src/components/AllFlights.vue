<template>
  <button @click="toggleVisibility">Show all routes</button>
  <div v-if= "visibility">
  <h1>All available routes</h1>
<table id="priceTable">
  <thead>
  <tr>
    <th>Route</th>
    <th>Distance (km)</th>
    <th>Provider</th>
    <th>Price</th>
    <th>Flight Start</th>
    <th>Flight End</th>
  </tr>
  </thead>
  <tbody>
  <!-- Dynamic rows will be inserted here -->
  </tbody>
</table>
</div>
</template>

<script>
import {ref} from "vue";
import { travelService } from '@/services/api';

export default {
  setup() {
    const visibility = ref(false);

    const toggleVisibility = async () => {
      visibility.value = !visibility.value;
      if (visibility.value) {
        await fetchData();
      }
    };

    // Fetch the data
    async function fetchData() {
      try {
        const data = await travelService.getTravelPrices();
        populateTable(data.legs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
//Populate table with data
    function populateTable(legs) {
      const tableBody = document.getElementById('priceTable').querySelector('tbody');
      legs.forEach(leg => {
        leg.providers.forEach(provider => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${leg.routeInfo.from.name} → ${leg.routeInfo.to.name}</td>
            <td>${leg.routeInfo.distance.toLocaleString()}</td>
            <td>${provider.company.name}</td>
            <td>${provider.price.toFixed(2)}</td>
            <td>${new Date(provider.flightStart).toLocaleString()}</td>
            <td>${new Date(provider.flightEnd).toLocaleString()}</td>
          `;
          tableBody.appendChild(row);
        });
      });
    }

    return{visibility, toggleVisibility};
    },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
  text-align: left;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
<template>
  <div class="header-container">
    <h1>COSMOS ODYSSEY</h1>
    <h2>Solar System Travel Deals</h2>
  </div>

  <SpaceTravel/>


  <div class="search-reservation">
    <input type="text" placeholder="Insert last name">
    <button>Find your reservation</button>
  </div>
  <div>

    <div class="filter-container">
      <p>Filter</p>

      <DropdownButton
          buttonText="Travel company"
          :options="['Route 1', 'Route 2', 'Route 3']"
          @option-selected="handleSelection"
      />
      <DropdownButton
          buttonText="Price"
          :options="['Lowest to highest', 'Highest to lowest']"
          @option-selected="handleSelection"
      />
      <DropdownButton
          buttonText="Distance"
          :options="['Shortest to longest', 'Longest to shortest']"
          @option-selected="handleSelection"
      />
      <DropdownButton
          buttonText="Travel time"
          :options="['Shortest to longest', 'Longest to shortest']"
          @option-selected="handleSelection"
      />
    </div>
    <AllFlights/>

  </div>
</template>

<script>
import AllFlights from "@/components/AllFlights.vue";
import DropdownButton from './components/DropdownButton.vue'
import SpaceTravel from "@/views/SpaceTravel.vue";


export default {

  components: {
    AllFlights,
    DropdownButton,
    SpaceTravel
  },
  methods: {
    handleSelection(selectedOption) {
      console.log('Selected:', selectedOption);
      // Handle the selection here
    }
  }
};
</script>

<style>

</style>

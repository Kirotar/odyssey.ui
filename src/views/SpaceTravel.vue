<template>
  <div class="space-travel p-4">

    <SearchForm
        :locations="uniqueLocations"
        :destinations="availableDestinations"
        @originChange="handleOriginChange"
        @destinationChange="handleDestinationChange"
        @submit="handleSubmit"
    />

    <RoutesTable
        v-if="showTable"
        :routes="filteredRoutes"
        :from="selectedFrom"
        :to="selectedTo"
        @make-reservation="handleReservation"
        @close-table="showTable = false"

    />

    <MakeReservation
        v-if="showReservation"
        :routeData="selectedRoute"
        @close-reservation="showReservation = false"

    />


    <!--    <SearchReservation/>  -->

    <!--    <AllFlights/> -->

  </div>
</template>

<script>
import {travelService} from '@/services/api';
import SearchForm from "@/components/SearchForm.vue";
import RoutesTable from "@/components/RoutesTable.vue";
import MakeReservation from "@/components/MakeReservation.vue";
//import SearchReservation from "@/components/SearchReservation.vue";
//import AllFlights from "@/components/AllFlights.vue";

export default {
  name: 'SpaceTravel',
  components: {
    //AllFlights,
    // SearchReservation,
    MakeReservation,
    SearchForm,
    RoutesTable
  },
  data() {
    return {
      showTable: true,
      showReservation: false,
      selectedRoute: null,
      travelData: null,
      uniqueLocations: [],
      availableDestinations: [],
      selectedFrom: '',
      selectedTo: '',
      filteredRoutes: [],

    }
  },
  methods: {
    async fetchLocations() {
      try {
        const data = await travelService.getTravelPrices();
        this.travelData = data;

        const locations = new Set();
        if (data?.legs?.length) {
          data.legs.forEach(leg => {
            if (leg.routeInfo?.from?.name) {
              locations.add(leg.routeInfo.from.name);
            }
          });
        }
        this.uniqueLocations = Array.from(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },

    handleOriginChange(from) {
      this.selectedFrom = from;
      this.selectedTo = '';
      this.updateAvailableDestinations(from);
      this.showTable = false;
      this.filteredRoutes = [];
    },

    updateAvailableDestinations(from) {
      const destinations = new Set();
      if (this.travelData?.legs?.length) {
        this.travelData.legs.forEach(leg => {
          if (leg.routeInfo?.from?.name === from && leg.routeInfo?.to?.name) {
            destinations.add(leg.routeInfo.to.name);
          }
        });
      }
      this.availableDestinations = Array.from(destinations);
    },

    handleDestinationChange(to) {
      this.selectedTo = to;
      this.filterRoutes();
    },

    filterRoutes() {
      if (!this.selectedFrom || !this.selectedTo) {
        this.filteredRoutes = [];
        return;
      }

      const matchingLeg = this.travelData.legs.find(leg =>
          leg.routeInfo?.from?.name === this.selectedFrom &&
          leg.routeInfo?.to?.name === this.selectedTo
      );

      if (matchingLeg) {
        this.filteredRoutes = matchingLeg.providers.map(provider => ({
          ...provider,
          routeInfo: matchingLeg.routeInfo
        }));
      } else {
        this.filteredRoutes = [];
      }
    },

    handleSubmit() {
      this.showTable = this.filteredRoutes.length > 0;
    },

    handleReservation(data) {
      this.selectedRoute = data;
      this.showTable = false;
      this.showReservation = true;
    }

  },
  created() {
    this.fetchLocations();
  }
}
</script>

<style scoped>
.space-travel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.space-travel > * {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.space-travel > *:last-child {
  border-bottom: none;
}

</style>
<template>
  <div class="filter-container">
    <p>Filter by :</p>
    <DropdownButton
        buttonText="Travel company"
        :options="['All', ...companies]"
        @option-selected="$emit('filter-company', $event)"
    />
    <DropdownButton
        buttonText="Price"
        :options="['Lowest to highest', 'Highest to lowest']"
        @option-selected="$emit('filter-price', $event)"
    />
    <DropdownButton
        buttonText="Distance"
        :options="['Shortest to longest', 'Longest to shortest']"
        @option-selected="$emit('filter-distance', $event)"
    />
    <DropdownButton
        buttonText="Travel time"
        :options="['Shortest to longest', 'Longest to shortest']"
        @option-selected="$emit('filter-time', $event)"
    />
  </div>
</template>

<script>
import DropdownButton from "@/components/DropdownButton.vue";

export default {
  components: { DropdownButton },
  props: {
    companies: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['filter-company', 'filter-price', 'filter-distance', 'filter-time']
}
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-container p {
  margin-right: 1rem;
}


</style>
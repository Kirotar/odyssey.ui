<template>
  <div class="search-form">
    <h3>Find flights</h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="form-group">
        <label for="from">From</label>
        <select
            name="from"
            id="from"
            v-model="selectedFrom"
            @change="handleFromChange"
            class="p-2 border rounded"
        >
          <option value="">Select origin planet</option>
          <option
              v-for="location in locations"
              :key="location"
              :value="location"
          >
            {{ location }}
          </option>
        </select>
      </div>

      <div class="flex flex-col">
        <label for="to">To</label>
        <select
            name="to"
            id="to"
            v-model="selectedTo"
            :disabled="!selectedFrom"
            @change="handleToChange"
            class="p-2 border rounded"
        >
          <option value="">Select destination planet</option>
          <option
              v-for="destination in destinations"
              :key="destination"
              :value="destination"
          >
            {{ destination }}
          </option>
        </select>
      </div>

      <input
          type="submit"
          value="Search Routes"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    locations: {
      type: Array,
      required: true
    },
    destinations: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      selectedFrom: '',
      selectedTo: ''
    }
  },
  methods: {
    handleFromChange() {
      this.selectedTo = '';
      this.$emit('originChange', this.selectedFrom);
    },
    handleToChange() {
      this.$emit('destinationChange', this.selectedTo);
    },
    handleSubmit() {
      this.$emit('submit', {
        from: this.selectedFrom,
        to: this.selectedTo
      });
    }
  }
}
</script>

<style scoped>
.search-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

h3 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: white;
}

select {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}

select option {
  background: #1a1a1a;
  color: white;
}

input[type="submit"] {
  background: slateblue;
  color: white;
  transition: background 0.3s;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 0.5rem;}

input[type="submit"]:hover {
  background: darkslateblue;
}

</style>
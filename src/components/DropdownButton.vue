<template>
  <div class="dropdown">
    <button @click="isOpen = !isOpen">
      {{ buttonText }}
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div v-if="isOpen" class="dropdown-menu">
        <div>
          <a
              v-for="(option, index) in options"
              :key="index"
              href="#"
              @click.prevent="selectOption(option)"
              class="dropdown-item"
          >
            {{ option }}
          </a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DropdownButton',
  props: {
    buttonText: {
      type: String,
      default: 'Select Option'
    },
    options: {
      type: Array,
      default: () => ['Option 1', 'Option 2', 'Option 3']
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    selectOption(option) {
      this.isOpen = false;
      this.$emit('option-selected', option);
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    });
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 200px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  min-width: 160px;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  z-index: 10;
  width: 100%;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: black;
  text-decoration: none;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.9);
}

.dropdown button{
  width: 100%;
}
</style>

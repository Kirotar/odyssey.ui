<template>
  <div class="background-image">
    <div class="wrapper">

      <div class="container">
        <div class="header-container">
          <h1>COSMOS ODYSSEY</h1>
          <h2>Solar System Travel Deals</h2>
        </div>
        <div class="nav-links">
          <router-link to="/" class="router-link">Search flights</router-link>
          <router-link to="/reservations" class="router-link">My Reservations</router-link>
        </div>
        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script>


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Space Grotesk', sans-serif;
  color: white;
}

.container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  width: 80%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-height: auto;
  overflow-y: auto;
  height: fit-content;
}

.header-container {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 1;
  padding: 2rem;

}

button {
  background: darkslateblue;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

button:hover {
  background: slateblue;
}

input {
  background: #1e293b;
  color: white;
  border: 1px solid #475569;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/51/Night-sky-milky-way-galaxy-astrophotography_-_West_Virginia_-_ForestWander.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 1;
  z-index: -1;
  background-repeat: repeat;
  min-height: 100vh;
  overflow-y: auto;

}

.wrapper {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  padding: 2rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
}

.router-link {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
}

.router-link:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>

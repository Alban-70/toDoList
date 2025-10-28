<template>
  <div class="app-container">
    <SideBar v-if="route.path !== '/addTache'" class="sidebar" @selectCategorie="categorieSelectionnee = $event" />
    <router-view class="main-content" :categorie="categorieSelectionnee" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'

const categorieSelectionnee = ref(null)
const route = useRoute()
</script>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  background: #f0f2f5; /* gris pastel doux */
  font-family: 'Poppins', sans-serif;
}

.sidebar {
  width: 200px;
  background: #e2e6eb; /* gris légèrement plus foncé que le fond */
  border-right: 1px solid #cbd5e1;
  padding: 1rem;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
}

.main-content {
  flex-grow: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}
</style>

<template>
  <div class="sidebar-container">
    <h2 class="sidebar-title">📂 Catégories</h2>
    <ul class="categories-list">
      <li 
        v-for="categorie in categories" 
        :key="categorie.id_categorie"
        @click="selectCategorie(categorie.nom_categorie)"
        :class="{ active: categorie.nom_categorie === selected }"
        class="categorie-item"
        >
        {{ categorie.nom_categorie }}
        </li>

    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['selectCategorie'])

const categories = ref([]);
const selected = ref(null);

async function fetchCategories() {
  try {
    const res = await axios.get('http://localhost:3000/show_categories')
    categories.value = res.data

    const toutes = categories.value.find(c => c.nom_categorie.toLowerCase() === 'toutes')
    if (toutes) {
      selected.value = toutes.nom_categorie
      selectCategorie(toutes.nom_categorie)
    }

  } catch (err) {
    console.error('Erreur lors du chargement des catégories : ', err)
  }
}

function selectCategorie(nom) {
  selected.value = nom  
  emit('selectCategorie', nom)
}


onMounted(fetchCategories)
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #1e293b;
  background: #e2e6eb; /* gris doux */
}

/* --- TITRE --- */
.sidebar-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  text-align: center;
  color: #0f172a;
  border-bottom: 2px solid #cbd5e1;
  padding-bottom: 0.5rem;
}

/* --- LISTE --- */
.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

/* --- ÉLÉMENT --- */
.categorie-item {
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.4rem;
  transition: all 0.2s ease;
  cursor: pointer;
  color: #475569;
  font-weight: 500;
}

.categorie-item:hover {
  background: #cbd5e1;
  color: #1e293b;
  transform: translateX(4px);
}

.categorie-item.active {
  background: #94a3b8;
  color: white;
}
</style>

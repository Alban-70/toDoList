<template>
  <div class="sidebar-container">
    <h2 class="sidebar-title">📂 Catégories</h2>

    <!-- Champ + bouton empilés -->
    <div class="input-group">
      <input 
        placeholder="Créer une catégorie"
        v-model="new_categorie"
        @keyup.enter="addCategorie(new_categorie)"
      />
      <button @click="addCategorie(new_categorie)">Ajouter</button>
    </div>

    

    <ul class="categories-list">
      <li
        class="categorie-item"
        :class="{ active: selected === '' }"
        @click="selectCategorie('')"
      >
        Toutes
      </li>
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
const selected = ref('');
const new_categorie = ref('');

async function fetchCategories() {
  try {
    const res = await axios.get('http://localhost:3000/categories/show')
    categories.value = res.data

  } catch (err) {
    console.error('Erreur lors du chargement des catégories : ', err)
  }
}

async function addCategorie(nom) {
  if (!nom || !nom.trim()) return
  try {
    await axios.post('http://localhost:3000/categories/add', { nom });
    new_categorie.value = ''; // vide le champ
    await fetchCategories();
  } catch (err) {
    console.error(err);
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
  background: #e2e6eb;
  padding: 1rem;
}

/* --- TITRE --- */
.sidebar-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: #0f172a;
  border-bottom: 2px solid #cbd5e1;
  padding-bottom: 0.5rem;
}

/* --- GROUPE INPUT + BOUTON (vertical) --- */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input-group input,
.input-group button {
  box-sizing: border-box; /* inclut padding et border dans la largeur */
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
}

.input-group input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 3px rgba(148,163,184,0.5);
}

.input-group button {
  width: 100%;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  background-color: #34d399;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.input-group button:hover {
  background-color: #28a745;
  transform: translateY(-1px);
}

.input-group button:active {
  transform: translateY(0);
}

/* --- LISTE --- */
.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.categorie-item {
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  margin-bottom: 0.3rem;
  transition: all 0.2s ease;
  cursor: pointer;
  color: #475569;
  font-weight: 500;
  font-size: 0.9rem;
}

.categorie-item:hover {
  background: #cbd5e1;
  color: #1e293b;
  transform: translateX(3px);
}

.categorie-item.active {
  background: #94a3b8;
  color: white;
}
</style>

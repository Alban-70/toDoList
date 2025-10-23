<template>
  <div class="show-taches-wrapper">
    <!-- Barre de recherche alignée avec le contenu -->
    <div class="search-container">
      <input type="search" placeholder="Rechercher une tâche..." v-model="searchTerm" />
    </div>

    <div class="todolist-container">
      <h2 class="title">📋 Mes tâches</h2>

      <button class="btn btn-small" @click="trierTachesPriorite">
        Trier par priorité {{ croissant ? 'décroissante' : 'croissante' }}
      </button>

      <table class="taches-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Priorité</th>
            <th>Échéance</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="tache in taches" 
            :key="tache.id_tache"
            :class="tache.priorite"
          >
            <td class="titre">{{ tache.titre }}</td>
            <td>{{ tache.description || '—' }}</td>
            <td>
              <span class="badge" :class="tache.priorite">
                {{ tache.priorite }}
              </span>
            </td>
            <td>{{ formatDate(tache.date_echeance) }}</td>
            <td class="statut">{{ tache.statut }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
    categorie : String
});

const taches = ref([]);
const croissant = ref(false);
const ordrePriorite = ref({ basse: 1, moyenne: 2, haute: 3 });
const searchTerm = ref(''); // valeur barre de recherche

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function trierTachesPriorite() {
  if (!croissant.value) {
    taches.value.sort((a, b) => ordrePriorite.value[a.priorite] - ordrePriorite.value[b.priorite]);
    croissant.value = true;
  } else {
    taches.value.sort((a, b) => ordrePriorite.value[b.priorite] - ordrePriorite.value[a.priorite]);
    croissant.value = false;
  }
}

async function fetchTaches(categorie) {
  try {
    let url = 'http://localhost:3000/show_taches'
    if (categorie) url += `?categorie=${categorie}`
    const res = await axios.get(url)
    taches.value = res.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => fetchTaches(null))
watch(() => props.categorie, (newVal) => fetchTaches(newVal))
</script>

<style scoped>
.show-taches-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* centre pour que la recherche soit alignée avec le contenu */
}

/* --- BARRE DE RECHERCHE --- */
.search-container {
  width: 100%;
  max-width: 900px; /* même largeur que todolist-container */
  margin: 1rem 0;
}

.search-container input {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  outline: none;
}

.search-container input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 5px rgba(148,163,184,0.5);
}

/* --- CONTAINER TÂCHES --- */
.todolist-container {
  max-width: 900px;
  width: 100%;
  background: #f0f2f5;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  font-family: "Poppins", sans-serif;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

/* --- BOUTONS --- */
.btn {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  background: #d1d5db; /* gris doux */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

/* --- BOUTON PETIT --- */
.btn-small {
  padding: 0.35rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 8px;
}

.btn:hover {
  background: #9ca3af; /* gris plus foncé au hover */
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.12);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  background: #6b7280; /* gris foncé */
}

/* --- TABLEAU --- */
.taches-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.taches-table th {
  background: #e2e6eb;
  color: #1e293b;
  font-weight: 600;
  padding: 0.8rem;
  border-bottom: 1px solid #cbd5e1;
}

.taches-table td {
  padding: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
  color: #475569;
  vertical-align: top;
}

/* --- LIGNES SURVOL --- */
.taches-table tr:hover {
  background: #f3f4f6;
  transition: background 0.2s ease;
}

/* --- COULEURS PRIORITÉS --- */
.taches-table tr.basse {
  border-left: 4px solid #34d399;
}
.taches-table tr.moyenne {
  border-left: 4px solid #fbbf24;
}
.taches-table tr.haute {
  border-left: 4px solid #ef4444;
}

/* --- BADGES --- */
.badge {
  font-size: 0.8rem;
  text-transform: capitalize;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
}
.badge.basse {
  background-color: #34d399;
}
.badge.moyenne {
  background-color: #fbbf24;
}
.badge.haute {
  background-color: #ef4444;
}

/* --- STATUT --- */
.statut {
  font-weight: 600;
  color: #1e293b;
}

.titre {
  font-weight: 600;
  color: #0f172a;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .taches-table, .taches-table thead {
    display: none;
  }

  .taches-table tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 1rem;
  }

  .taches-table td {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    border: none;
  }

  .taches-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #374151;
  }
}
</style>

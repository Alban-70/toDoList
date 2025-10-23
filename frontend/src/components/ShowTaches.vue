<template>
  <div class="todolist-container">
    <h2 class="title">📋 Mes tâches</h2>

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
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const taches = ref([])

async function fetchTaches() {
  try {
    const res = await axios.get('http://localhost:3000/show_taches')
    taches.value = res.data
  } catch (err) {
    console.error('Erreur lors du chargement des tâches : ', err)
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

onMounted(fetchTaches)
</script>

<style scoped>
.todolist-container {
  max-width: 900px;
  margin: 2rem auto;
  background: #f0f2f5; /* fond gris doux */
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

/* --- TABLEAU --- */
.taches-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
  background: #ffffff; /* cartes légèrement plus claires que le fond */
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

<template>
  <div class="add-task-page">
    <h2 class="title">➕ Ajouter une tâche</h2>

    <div class="form-group">
      <label for="titre">Titre</label>
      <input
        id="titre"
        v-model="titre"
        type="text"
        placeholder="Titre de la tâche"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Description de la tâche"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="priorite">Priorité</label>
      <select id="priorite" v-model="priorite">
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
      </select>
    </div>

    <div class="form-group">
        <label for="categorie">Catégorie</label>
        <select id="categorie" v-model="idCategorie">
            <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">
            {{ cat.nom_categorie }}
            </option>
        </select>
    </div>


    <div class="form-group">
      <label for="date">Échéance</label>
      <input id="date" type="date" v-model="dateEcheance" />
    </div>

    <div class="buttons">
      <button class="btn" @click="ajouterTache">Ajouter</button>
      <button class="btn cancel-btn" @click="annuler">Annuler</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const titre = ref('')
const description = ref('')
const priorite = ref('basse')
const dateEcheance = ref('')
const idCategorie = ref(null)
const categories = ref([])

const router = useRouter()

async function ajouterTache() {
  if (!titre.value.trim()) {
    alert('Le titre est obligatoire')
    return
  }

  try {
    await axios.post('http://localhost:3000/taches/add', {
      titre: titre.value,
      description: description.value,
      priorite: priorite.value,
      date_echeance: dateEcheance.value,
      id_categorie: idCategorie.value
    })

    router.push('/') 
  } catch (err) {
    console.error(err)
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get('http://localhost:3000/categories/show')
    categories.value = res.data
  } catch (err) {
    console.error('Erreur lors du chargement des catégories : ', err)
  }
}

function annuler() {
  router.back()
}

onMounted(fetchCategories)
</script>

<style scoped>
.add-task-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f0f2f5;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  font-family: "Poppins", sans-serif;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-group label {
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #0f172a;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 0.6rem 0.8rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  outline: none;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 5px rgba(148,163,184,0.5);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #2563eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.cancel-btn {
  background-color: #9ca3af;
}

.cancel-btn:hover {
  background-color: #6b7280;
}
</style>

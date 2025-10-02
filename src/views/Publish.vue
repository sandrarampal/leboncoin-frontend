<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import Button from '@/components/Button.vue'

const router = useRouter()

const GlobalStore = inject('GlobalStore')

console.log(GlobalStore.userInfos.value.userToken)

const title = ref('')
const description = ref('')
const price = ref(null)
const pictures = ref(null)

const isPublishing = ref(false)
const errorMessage = ref('')

const clearErrorMessage = () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

const handleSubmit = async () => {
  isPublishing.value = true

  const formData = new FormData()

  //ajout des images
  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      formData.append('files.pictures', pictures.value[key])
    }
  }

  //ajout des autres informations
  const stringifiedInfos = JSON.stringify({
    title: title.value,
    description: description.value,
    price: price.value,
    owner: GlobalStore.userInfos.value.userId,
  })

  formData.append('data', stringifiedInfos)

  try {
    if (!title.value || !description.value || !price.value || !pictures.value) {
      errorMessage.value = 'Veuillez remplir tous les champs'
      isPublishing.value = false
      return
    }

    const response = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfos.value.userToken,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    router.push(`/offer/${response.data.data.id}`)
  } catch (error) {
    console.log('catch Publish>>', error)
    errorMessage.value = 'Une erreur est survenue lors de la publication de votre annonce'
  }

  isPublishing.value = false
}

const urlsListPreview = computed(() => {
  const tab = []

  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }

  return tab
})
</script>

<template>
  <main class="container">
    <div class="publish-div">
      <h1>Déposer une annonce</h1>
      <form action="">
        <label class="title-label" for="title"
          >Titre de l'annonce<input
            type="text"
            name="title"
            id="title"
            v-model="title"
            @input="clearErrorMessage"
        /></label>

        <label class="description-label" for="description"
          >Description de l'annonce<textarea
            cols="70"
            rows="10"
            name="description"
            id="description"
            v-model="description"
            @input="clearErrorMessage"
          />
        </label>
        <label class="price-label" for="price"
          >Votre prix de vente<input
            type="number"
            name="price"
            id="price"
            v-model="price"
            @input="clearErrorMessage"
        /></label>
        <label class="pictures-label" for="pictures"
          >Ajoutez des fichiers
          <div>
            <font-awesome-icon :icon="['fas', 'camera']" style="font-size: 35px" />
            <p>Sélectionnez jusqu'à 10 photos</p>
          </div>
          <input
            type="file"
            name="pictures"
            id="pictures"
            multiple
            @input="(event) => (pictures = event.target.files)"
            style="display: none"
        /></label>
      </form>
      <div v-if="pictures" class="preview">
        <img v-for="url in urlsListPreview" :src="url" alt="" />
      </div>
      <p v-if="isPublishing">Envoi en cours ...</p>
      <div v-else class="button">
        <Button label="Déposer mon annonce" :onClick="handleSubmit" />
      </div>
      <div v-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.publish-div {
  border: black solid 1px;
  padding: 15px;
  border-radius: 15px;
  width: 100%;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.title-label,
.description-label {
  width: 70%;
}

.price-label {
  width: 25%;
}

.pictures-label {
  width: fit-content;
}

.pictures-label div {
  border: black solid 1px;
  width: 150px;
  height: 130px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
  border-radius: 10px;
  cursor: pointer;
}

input {
  width: 100%;
  height: 30px;
}

textarea {
  width: 100%;
}

.button {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.preview {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.preview img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
</style>

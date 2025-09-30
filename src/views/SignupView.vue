<script setup>
import { RouterLink } from 'vue-router'
import { ref, inject } from 'vue'
import Button from '@/components/Button.vue'
import ConnectionCard from '@/components/ConnectionCard.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')

const errorMessage = ref('')

const isSubmitted = ref(false)

const GlobalStore = inject('GlobalStore')

const handleSubmit = async () => {
  try {
    isSubmitted.value = true
    if (!username.value || !email.value || !password.value) {
      errorMessage.value = 'Veuillez remplir tous les champs'
    } else {
      const response = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
        {
          email: email.value,
          username: username.value,
          password: password.value,
        },
      )
      GlobalStore.userToken.value = response.data.jwt
    }
    console.log(GlobalStore.userToken.value)

    isSubmitted.value = false
    router.push({ name: 'home' })
  } catch (error) {
    console.log('error>>>', error.response.data.error)
    errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    isSubmitted.value = false
  }
}
</script>

<template>
  <ConnectionCard
    title="Bonjour !"
    description="Inscrivez-vous pour découvrir toutes nos fonctionnalités."
  >
    <template #form>
      <form @submit.prevent="handleSubmit">
        <label for="username">Nom *</label>
        <input type="text" v-model="username" id="username" />
        <label for="email">E-mail *</label>
        <input type="email" v-model="email" id="email" />
        <label for="password">Mot de Passe *</label>
        <input type="password" v-model="password" id="password" />
        <div v-if="!isSubmitted">
          <Button
            label="S'inscrire"
            style="width: 100%; margin-bottom: 10px"
            :onClick="handleSubmit"
          />
        </div>
        <p v-else>Inscription en cours...</p>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
      </form>
    </template>

    <template #link>
      <p>Vous avez déjà un compte?</p>
      <RouterLink to="/login">
        <span>Connectez-vous</span>
      </RouterLink>
    </template>
  </ConnectionCard>
</template>

<style scoped>
form {
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form div {
  width: 100%;
}

label {
  width: 100%;
  margin-bottom: 5px;
}

input {
  width: 100%;
  margin-bottom: 20px;
  height: 30px;
  border-radius: 10px;
}
</style>

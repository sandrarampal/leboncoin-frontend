<script setup>
import { RouterLink } from 'vue-router'
import { ref, inject } from 'vue'
import Button from '@/components/Button.vue'
import ConnectionCard from '@/components/ConnectionCard.vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const errorMessage = ref('')
const isSubmitted = ref(false)

const GlobalStore = inject('GlobalStore')

const handleLogin = async () => {
  try {
    isSubmitted.value = true
    if (!email.value || !password.value) {
      errorMessage.value = 'Veuillez remplir tous les champs'
    } else {
      const response = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
        {
          identifier: email.value,
          password: password.value,
        },
      )

      GlobalStore.updateUser(response.data.user.username, response.data.jwt, response.data.user.id)

      isSubmitted.value = false
      router.push({ name: route.query.redirect || 'home' })
    }
  } catch (error) {
    console.log('error>>>', error.response?.data?.error)
    errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    isSubmitted.value = false
  }
}
</script>

<template>
  <ConnectionCard title="Bon retour !" description="Connectez-vous pour accéder à votre compte.">
    <template #form>
      <form @submit.prevent="handleLogin">
        <label for="email">E-mail *</label>
        <input type="email" v-model="email" id="email" />
        <label for="password">Mot de Passe *</label>
        <input type="password" v-model="password" id="password" />
        <div v-if="!isSubmitted">
          <Button
            label="Se connecter"
            style="width: 100%; margin-bottom: 10px"
            :onClick="handleLogin"
          />
        </div>
        <p v-else>Connexion en cours...</p>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
      </form>
    </template>

    <template #link>
      <p>Vous n'avez pas encore de compte?</p>
      <RouterLink to="/signup">
        <span>Inscrivez-vous</span>
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

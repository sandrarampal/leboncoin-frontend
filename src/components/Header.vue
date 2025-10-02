<script setup>
import { RouterLink } from 'vue-router'
import Button from './Button.vue'
import { inject } from 'vue'

const GlobalStore = inject('GlobalStore')
</script>

<template>
  <header>
    <div class="top-header container">
      <RouterLink to="/">
        <img src="../assets/img/logo.svg" alt="" />
      </RouterLink>

      <div class="middle-menu">
        <RouterLink :to="{ name: 'publish' }" style="text-decoration: none">
          <Button
            label="Déposer une annonce"
            color="primary"
            :icon="['far', 'plus-square']"
            style="font-weight: bold"
          />
        </RouterLink>

        <input type="text" placeholder="Rechercher sur leboncoin" class="search-input" />
        <div class="search-button">
          <Button
            color="primary"
            :icon="['fas', 'search']"
            colorIcon="black"
            style="height: 30px; width: 30px"
          />
        </div>
      </div>
      <RouterLink to="/login" style="color: black; text-decoration: none">
        <div class="login-section">
          <font-awesome-icon :icon="['far', 'user']" />
          <p v-if="!GlobalStore.userInfos.value">Se connecter</p>
          <p v-else>{{ GlobalStore.userInfos.value.username }}</p>
        </div>
      </RouterLink>
      <div
        v-if="GlobalStore.userInfos.value"
        @click="GlobalStore.updateUser()"
        style="cursor: pointer"
      >
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
      </div>
    </div>
    <div class="bottom-header container">
      <nav>
        <ul>
          <li>Immobilier</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Véhicules</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Locations de Vacances</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Emploi</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Mode</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Maison & Jardin</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Famille</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Electronique</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Loisirs</li>
          <font-awesome-icon :icon="['fas', 'circle']" style="font-size: 3px" />
          <li>Autres</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  border-bottom: black 1px solid;
  margin-bottom: 20px;
  padding-bottom: 15px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 20px;
}

.middle-menu {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.search-input {
  padding: 10px;
  border: none;
  background-color: #f3f8fd;
  border-radius: 8px;
  width: 300px;
  font-size: 16px;
}

.search-button {
  position: absolute;
  right: 10px;
}

.login-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.login-section p {
  font-size: 12px;
}

ul {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  list-style: none;
  gap: 21px;
  align-items: center;
  font-size: 14px;
}
img {
  height: 30px;
}
</style>

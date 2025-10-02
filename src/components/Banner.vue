<script setup>
import Button from '@/components/Button.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="sell-banner">
    <p>C'est le moment de vendre</p>
    <RouterLink :to="{ name: 'publish' }" style="text-decoration: none">
      <Button
        label="Déposer une annonce"
        color="primary"
        :icon="['far', 'plus-square']"
        style="font-weight: bold"
    /></RouterLink>
    <img src="../assets/img/onde-corail.svg" alt="" class="coral-wave" />
    <img src="../assets/img/feuille-bleue.svg" alt="" class="blue-leaf" />
  </div>
</template>

<style scoped>
.sell-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #ffe9de;
  border-radius: 15px;
  margin-bottom: 30px;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  height: 80px;
}

.coral-wave {
  position: absolute;
  left: 0px;
  bottom: 0;
  border-radius: 15px 0 0 15px;
  height: 100%;
}

.blue-leaf {
  position: absolute;
  right: 0px;
  bottom: 0;
  border-radius: 0 15px 15px 0;
  height: 100%;
}
</style>

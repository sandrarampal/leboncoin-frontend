<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import OfferCard from '@/components/OfferCard.vue'
import Banner from '@/components/Banner.vue'

const offers = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate=pictures&populate=owner.avatar',
    )
    offers.value = data.data || []
  } catch (error) {
    console.log('catch>>', error)
  }
})
</script>

<template>
  <main class="container">
    <p>Des millions de petites annonces et autant d’occasions de se faire plaisir</p>
    <Banner />
    <p v-if="offers.length === 0">Chargement</p>
    <div v-else class="offers-list">
      <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>
  </main>
</template>

<style scoped>
main > p {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: bold;
  margin-top: 30px;
}

/* Offres */
.offers-list {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
</style>

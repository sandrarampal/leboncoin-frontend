<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'
import OfferCard from '@/components/OfferCard.vue'
import Banner from '@/components/Banner.vue'
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const offers = ref([])

const props = defineProps({
  page: Number,
  title: String,
})

const numberOfPages = ref(1)
const pageNumbers = ref([])
const pagination = () => {
  pageNumbers.value = []
  for (let i = 1; i <= numberOfPages.value; i++) {
    pageNumbers.value.push(i)
  }
}

const goToPage = (page) => {
  const queries = { ...props }
  queries.page = page

  router.push({ name: 'home', query: queries })
}

const goToPreviousPage = () => {
  const queries = { ...props }
  queries.page = queries.page - 1
  router.push({ name: 'home', query: queries })
}
const goToNextPage = () => {
  const queries = { ...props }
  queries.page = queries.page + 1
  router.push({ name: 'home', query: queries })
}
onMounted(() => {
  watchEffect(async () => {
    try {
      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate=pictures&populate=owner.avatar&pagination[page]=${props.page}&pagination[pageSize]=10&filters[title][$containsi]=${props.title}`,
      )
      offers.value = data.data || []

      numberOfPages.value = data.meta.pagination.pageCount
      pagination()
    } catch (error) {
      console.log('catch>>', error)
    }
  })
})
</script>

<template>
  <main class="container">
    <form class="filters">
      <div>
        <p>Prix</p>
        <div>
          <label for=""><input type="number" placeholder="Minimum" /> €</label>
          <label for=""><input type="number" placeholder="Maximum" /> €</label>
        </div>
      </div>
      <div>
        <p>Tri</p>
        <div>
          <label for=""
            >Prix croissants
            <input type="radio" name="asc" id="asc" />
          </label>
          <label for=""
            >Prix décroissants
            <input type="radio" name="desc" id="desc" />
          </label>
          <label for=""
            >Pas de tri
            <input type="radio" name="nosort" id="nosort" />
          </label>
        </div>
      </div>
      <Button label="Rechercher" />
    </form>

    <p>Des millions de petites annonces et autant d’occasions de se faire plaisir</p>
    <Banner />
    <p v-if="offers.length === 0">Chargement</p>
    <div v-else class="offers-list">
      <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>

    <div class="pagination">
      <div v-if="page > 1" @click="goToPreviousPage">
        <font-awesome-icon :icon="['fas', 'chevron-left']" style="margin-right: 20px" />
      </div>
      <button
        v-for="(page, index) in pageNumbers"
        :key="index"
        class="pagination-button"
        :class="{ active: page === props.page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <div v-if="page < numberOfPages" @click="goToNextPage">
        <font-awesome-icon :icon="['fas', 'chevron-right']" style="margin-left: 20px" />
      </div>
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

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

.pagination-button {
  padding: 16px 20px;
  background-color: white;
  color: #152233;
  cursor: pointer;
  border: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.pagination-button.active {
  background-color: #152233;
  border-radius: 4px;
  color: white;
}

.pagination > div {
  cursor: pointer;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

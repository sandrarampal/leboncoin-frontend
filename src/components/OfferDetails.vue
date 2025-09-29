<script setup>
import { getPrice } from '@/utils/functions'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: [String, Number],
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="offer-details">
    <div class="main-infos">
      <p>{{ title }}</p>
      <p>{{ getPrice(price) }} €</p>
      <p>
        {{ publishedAt ? new Date(publishedAt).toLocaleDateString('fr-FR') : '' }}
      </p>
    </div>
    <div class="offer-description">
      <p>Description</p>
      <p>{{ description }}</p>
    </div>
    <div class="offer-location">
      <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
      <p>Agon-Coutainville (50230)</p>
    </div>
  </div>
</template>

<style scoped>
.offer-details {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.main-infos {
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-bottom: solid 1px #e6e5e5;
  padding-bottom: 40px;
}

.main-infos p:first-child {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 10px;
}

.main-infos p:nth-child(2) {
  font-size: 18px;
  font-weight: bold;
}

.main-infos p:last-child {
  color: #627c93;
  font-size: 12px;
}

.offer-description p:first-child {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
}

.offer-description {
  border-bottom: solid 1px #e6e5e5;
  padding-bottom: 40px;
}

.offer-location {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

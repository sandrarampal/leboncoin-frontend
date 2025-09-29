<script setup>
import { RouterLink } from 'vue-router'
import { getPrice } from '@/utils/functions'

defineProps({
  offer: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="offer-card">
    <RouterLink
      :to="{ name: 'offer', params: { id: offer.id.toString() } }"
      style="text-decoration: none"
    >
      <div v-if="offer.attributes?.owner?.data?.attributes" class="offer-owner">
        <img
          v-if="offer.attributes.owner.data.attributes.avatar?.data?.attributes?.url"
          :src="offer.attributes.owner.data.attributes.avatar.data.attributes.url"
          alt=""
        />
        <p>{{ offer.attributes.owner.data.attributes.username }}</p>
      </div>
      <img
        v-if="offer.attributes?.pictures?.data?.[0]?.attributes.url"
        :src="offer.attributes.pictures.data[0].attributes.url"
        alt=""
      />

      <div class="offer-details">
        <div>
          <p v-if="offer.attributes?.title">{{ offer.attributes.title }}</p>
          <p v-if="offer.attributes?.price">{{ getPrice(offer.attributes.price) }} €</p>
        </div>
        <div>
          <p v-if="offer.attributes?.publishedAt">
            {{ offer.attributes.publishedAt.slice(0, 10) }}
          </p>
          <font-awesome-icon :icon="['far', 'heart']" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.offer-card {
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 18.2%;
}

.offer-card img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 8px;
}

.offer-owner {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  color: black;
  align-items: flex-end;
}

.offer-owner p {
  padding-bottom: 5px;
}

.offer-owner img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.offer-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: black;
}

.offer-details div:first-child {
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.offer-details div:last-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #627c93;
}

.offer-details div:last-child p {
  font-size: 12px;
}
</style>

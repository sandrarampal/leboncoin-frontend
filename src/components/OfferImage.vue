<script setup>
import { useCycleList } from '@vueuse/core'

const props = defineProps({
  pictures: {
    type: Object,
    required: true,
  },
})

//créer la liste des images
const images = props.pictures.data.map((pic) => pic.attributes.url)
console.log(images)

const { state, next, prev } = useCycleList(images)
</script>

<template>
  <div class="offer-image">
    <font-awesome-icon
      :icon="['fas', 'chevron-left']"
      style="font-size: 20px; cursor: pointer"
      @click="prev()"
    />
    <img :src="state" alt="photos du produit" />
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      style="font-size: 20px; cursor: pointer"
      @click="next()"
    />
  </div>
</template>

<style scoped>
.offer-image {
  height: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.offer-image img {
  height: 100%;
  object-fit: cover;
}
</style>

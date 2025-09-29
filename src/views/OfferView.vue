<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Button from '@/components/Button.vue'
import OwnerCard from '@/components/OwnerCard.vue'
import OfferImage from '@/components/OfferImage.vue'
import OfferDetails from '@/components/OfferDetails.vue'

const offerInfos = ref({})

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate=pictures&populate=owner.avatar`,
    )
    offerInfos.value = data.data
    console.log(offerInfos.value)
  } catch (error) {
    console.log('catch>>', error)
  }
})
</script>

<template>
  <main>
    <p v-if="!offerInfos.attributes">Chargement...</p>
    <div v-else class="container offer-view">
      <div>
        <OfferImage :pictures="offerInfos.attributes.pictures" />
        <OfferDetails
          :title="offerInfos.attributes.title"
          :price="offerInfos.attributes.price"
          :publishedAt="offerInfos.attributes.publishedAt"
          :description="offerInfos.attributes.description"
        />
      </div>

      <OwnerCard :owner="offerInfos.attributes.owner" />
    </div>
  </main>
</template>

<style scoped>
.offer-view {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  margin-top: 30px;
  margin-bottom: 50px;
}

.offer-view > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
}
</style>

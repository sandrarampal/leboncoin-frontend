<script setup>
import Button from '@/components/Button.vue'

const props = defineProps({
  owner: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="offer-owner">
    <div class="owner-info">
      <div class="owner-avatar">
        <img
          v-if="owner.data.attributes.avatar.data"
          :src="owner.data.attributes.avatar.data.attributes.url"
          alt=""
        />
        <p>{{ owner.data.attributes.username.toUpperCase() }}</p>
      </div>
      <div v-if="owner.data.attributes.confirmed" class="owner-status">
        <font-awesome-icon :icon="['fas', 'check-double']" />
        <p>Pièce d'identité vérifiée</p>
      </div>
      <div class="owner-answer-time">
        <font-awesome-icon :icon="['far', 'clock']" />
        <p>Répond généralement en 1 heure</p>
      </div>
    </div>
    <div class="offer-actions">
      <Button label="Acheter" color="primary" style="padding: 15px; border-radius: 15px" />
      <Button label="Message" color="secondary" style="padding: 15px; border-radius: 15px" />
    </div>
  </div>
</template>

<style scoped>
.offer-owner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  width: 30%;
  height: fit-content;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.owner-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 1px solid #e6e5e5;
  padding-bottom: 50px;
}

.owner-avatar {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-weight: bold;
}
.owner-avatar img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.owner-status,
.owner-answer-time {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.owner-status {
  color: #89380f;
  background-color: #ffe9de;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.offer-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>

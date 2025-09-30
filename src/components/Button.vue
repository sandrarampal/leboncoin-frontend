<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
    default: 'primary',
  },
  icon: {
    type: Array,
    required: false,
    default: null,
  },
  colorIcon: {
    type: String,
    required: false,
    default: 'white',
  },
  onClick: {
    type: Function,
    required: false,
  },
})
</script>

<template>
  <button :class="`btn-${props.color}`" @click="props.onClick">
    <font-awesome-icon
      v-if="props.icon"
      :icon="props.icon"
      class="btn-icon"
      :style="{ color: props.colorIcon }"
    />
    {{ props.label }}
  </button>
</template>

<style scoped>
button {
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
}

.btn-primary {
  background-color: #ec5a12;
  color: white;
}
.btn-secondary {
  background-color: #094171;
  color: white;
}
</style>

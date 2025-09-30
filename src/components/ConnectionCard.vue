<script setup>
defineProps({
  title: {
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
  <main class="container">
    <div class="connection-card">
      <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <slot name="form"></slot>
      <div class="link-section">
        <slot name="link"></slot>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
}

.connection-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: #ccc solid 1px;
  width: 30%;
  padding: 30px;
  border-radius: 20px;
}

.link-section {
  display: flex;
  gap: 10px;
}
</style>

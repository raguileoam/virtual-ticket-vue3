
<template>
  <v-card class="d-flex flex-column align-center" variant="text">
    <v-card-title class="ticket-title justify-center">{{ props.title }}</v-card-title>
    <v-card-text v-if="props.ticket" class="display-3 mb-5">
      <p class="ticket-number text-h1 d-flex justify-center mb-6">{{ props.ticket }}</p>
    </v-card-text>

    <v-card-text v-else>
      <LoadingBar />
    </v-card-text>
</v-card>
</template>

<script setup>
import LoadingBar from './LoadingBar.vue';

const props = defineProps({
  title: String,
  ticket: String
})
</script>

<style scoped>
.ticket-number {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
}

.ticket-title {
  white-space: normal;
}
</style>
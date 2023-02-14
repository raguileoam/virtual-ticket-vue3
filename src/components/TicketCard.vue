
<template>
  <v-card class="d-flex flex-column align-center" variant="text">
    <v-card-text v-if="props.ticket" class="display-3 mb-5">
      <p class="ticket-label text-h2 d-flex justify-center mb-6">Tu número</p>
      <p class="ticket-number text-h1 d-flex justify-center mb-6">{{ props.ticket }}</p>
    </v-card-text>

    <v-card-text v-else>
      <LoadingBar />
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue" @click="getTicketNumber" variant="flat">Obtener número de ticket</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import LoadingBar from './LoadingBar.vue';

const emit = defineEmits(["onSubmitTicket"]);
const props = defineProps({
  ticket: {
    type: String,
    default: "A12"
  }
})

const getTicketNumber = () => {
  emit("onSubmitTicket")
}
</script>

<style scoped>
p {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
}

.ticket-number {
  color: blue;
}
</style>
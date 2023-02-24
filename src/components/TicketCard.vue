
<template>
  <v-card class="d-flex flex-column align-center" variant="text" v-if="props.ticket">
    <v-card-text class="display-3 mb-5">
      <p class="ticket-label text-h2 d-flex justify-center mb-6">Tu número</p>
      <p class="ticket-number text-h1 d-flex justify-center mb-6">{{ props.ticket }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="red" @click="getTicketNumber" variant="flat">Cancelar</v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="d-flex flex-column align-center pa-4" variant="text" v-else>
    <v-card-text class="display-3 mb-2">
      <p class="d-flex justify-center pa-2">No tienes un número pedido actualmente</p>
    </v-card-text>
    <v-img width="280" src="@/assets/TicketQueueIcon.png"></v-img>
    <v-card-actions>
      <v-btn color="primary" @click="getTicketNumber" variant="flat">Obtener número de ticket</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const emit = defineEmits(["onSubmitTicket"]);
const props = defineProps({
  ticket: {
    type: String
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
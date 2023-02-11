
<template>
  <div>
    <div v-if="messages">
      <div v-for="message in messages[0]" v-bind:key="message">
        Último ticket en fila: {{ message.lastTicketInProcess }}
        Último ticket en atención: {{ message.lastTicketInAttention }}
      </div>
    </div>

    <div v-else>
      <LoadingBar />
    </div>
  </div>
</template>

<script setup>
//import { useSocket } from "./Socket.js";
import LoadingBar from "@/components/LoadingBar.vue";
import messages from "@/mocks/socket.json"

//const { messages } = useSocket();

</script>

<template>
  <div>
    <div v-if="messages" v-for="message in messages[0]" v-bind:key="message">
      Último ticket en fila: {{ message.lastTicketInProcess }}
      Último ticket en atención: {{ message.lastTicketInAttention }}
    </div>

    <div v-else>
      <LoadingBar />
    </div>
  </div>
</template>

<script setup>
import { useSocket } from "./Socket.js";
import LoadingBar from "@/components/LoadingBar.vue";

const { messages } = useSocket();

</script>
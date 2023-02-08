
<template>
  <div>
    <div v-if="this.received_messages">
      eo
    </div>

    <div v-else>
      <LoadingBar />
    </div>
  </div>
</template>

<script>

import Socket from "./Socket.js";
import LoadingBar from "@/components/LoadingBar.vue";
export default {
  data() {
    return {
      office: [],
      tickets: null,
      received_messages: null,
      send_message: null,
      connected: false,
      status: null
    };
  },
  components: {
    LoadingBar
  },
  methods: {
    connect() {
      this.client = Socket;
      this.client.activate();
    },
    disconnect() {
      if (this.client) {
        this.client.deactivate();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
  },
  mounted() {
    this.connect();
  },
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <h3>{{content}}</h3>
      </v-col>

      <v-col md="9">
        <TicketBranchCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TicketBranchCard from "@/components/TicketBranchCard.vue";
let content = ""
</script>
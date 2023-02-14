<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6">
        <v-sheet rounded="lg" min-height="50vh">
          <TicketCard />
        </v-sheet>
      </v-col>

      <v-col cols=" 12" sm="3">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TicketCard from "@/components/TicketCard.vue";

</script>
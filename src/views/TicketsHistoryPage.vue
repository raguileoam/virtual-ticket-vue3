<template>
    <v-container fluid class="tickets-container">
        <v-table v-if="!loading && filterActiveTickets.length > 0">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Tickets</th>
                        <th class="text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ticket in filterActiveTickets" :key="ticket.id">
                        <td class="text-left">
                            {{ dateFilter(ticket.date) }}
                        </td>
                        <td class="text-left">
                            <v-btn @click.stop="dialog = true" small color="error">
                                <v-icon small>mdi-delete</v-icon>
                                <p class="d-none d-sm-flex">Eliminar atención</p>
                                <v-dialog v-model="dialog" max-width="280">
                                    <v-card>
                                        <v-card-title>Eliminar atención</v-card-title>
                                        <v-card-text>Esta acción es irreversible</v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text @click="dialog = false">Cancelar</v-btn>
                                            <v-btn color="primary darken-1" @click="deleteTicket(ticket)">Eliminar</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-table>
        <div class="no-tickets-container justify-center" v-if="!loading && filterActiveTickets.length == 0">
            <v-card width="550" min-height="300" outlined rounded>
                <v-row class="mt-2">
                    <v-col class="text-center" cols="12">
                        <v-icon size="x-large" color="error">mdi-alert</v-icon>
                    </v-col>
                </v-row>
                <v-card-title class="ticket-title display-2 justify-center">
                    Actualmente no tienes atenciones activas. Registra una:
                </v-card-title>
                <v-card-actions>
                    <v-row>
                        <v-col class="text-center" cols="12">
                            <v-btn to="/" color="primary">Añadir atención</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </div>
</v-container>
</template>
  
<script setup>
import tickets from "@/mocks/tickets.json";
import { ref, computed } from "vue";
import dayjs from "dayjs";

const loading = ref(false);
const dialog = ref(false);
const filterActiveTickets = computed(() => tickets.filter(ticket => ticket.status === "ACTIVE"));
const deleteTicket = (ticket) => {
    dialog.value = false;
}
const dateFilter = (date) => dayjs(date);
</script>
  
<style scoped>
.no-tickets-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.tickets-container {
    height: 80vh;
}

.ticket-title {
    white-space: normal;
}
</style>
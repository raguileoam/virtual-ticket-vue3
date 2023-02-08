import apiService from "./api.service";
export default {
    postTicket(office, user) {
        return apiService.post("/api/ticket/", {
            params: {
                branchOffice: office,
                user: { id: user.id }
            }
        })
    },
    getTickets(user) {
        return apiService.get("/api/ticket/user/", user.id)
    },
    markAsCancelledTicket(ticket1) {
        return apiService.update("/api/ticket/" + ticket1.id + "/mark-as-cancelled");
    },
    markAsLateTicket(ticket1) {
        return apiService.update("/api/ticket/" + ticket1.id + "/mark-as-late");
    },
    markAsDoneTicket(ticket1) {
        return apiService.update("/api/ticket/" + ticket1.id + "/mark-as-done");
    }
}
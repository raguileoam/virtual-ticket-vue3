import apiService from "./api.service";
export default {
    postTicket(office, user) {
        return apiService.post("/api/ticket/", {
            params: {
                branchOffice: {id: office.id},
                user: { id: user.id }
            }
        })
    },
    getTicketsByUser(user) {
        return apiService.get("/api/ticket/user/", user.id)
    },
    markTicketAsCancelled(ticket1) {
        return apiService.update("/api/ticket/" + ticket1.id + "/mark-as-cancelled");
    },
    markTicketAsDone(ticket1) {
        return apiService.update("/api/ticket/" + ticket1.id + "/mark-as-done");
    }
}
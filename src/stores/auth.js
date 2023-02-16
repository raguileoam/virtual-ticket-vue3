import { defineStore } from "pinia";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("token"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore("token", {
  state: () => {
    return initialState;
  },
  actions: {
    login(user) {
      return AuthService.login(user).then(
        async (response) => {
          if (response.authorities) {
            localStorage.setItem("token", JSON.stringify(response));
            this.status = { loggedIn: true };
            return Promise.resolve(response);
          } else {
            this.status = {};
            this.user = null;
            return Promise.reject("Su cuenta no tiene permisos");
          }
        },
        (error) => {
          this.status = {};
          this.user = null;
          return Promise.reject(error);
        }
      );
    },
    logout() {
      AuthService.logout();
      this.status = {};
      this.user = null;
    },
    register(user) {
      return AuthService.register(user).then(
        (response) => {
          this.status = {};
          return Promise.resolve(response.data);
        },
        (error) => {
          this.status = {};
          return Promise.reject(error.response.data);
        }
      );
    },
  },
});

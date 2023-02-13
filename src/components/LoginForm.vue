<template>
    <v-row justify="center" align="center">
        <v-col cols="12" lg="7">
            <v-card flat outlined class="pa-md-4 mx-lg-auto">
                <v-card-text>
                    <h1 class="headline font-weight-bold grey--text text--darken-3">
                        ¿Ya tiene una cuenta?
                    </h1>
                </v-card-text>
                <v-card-text>
                    <v-form v-model="isValidForm" ref="form" lazy-validation class="pa-4">
                        <v-text-field prepend-icon="mdi-email" validate-on-blur clearable dense outlined
                            v-model="user.email" :rules="[formRules.emailPattern]" label="Ingrese su e-mail"
                            type="email" required />
                        <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[formRules.passwordRequired, formRules.min]" :type="show1 ? 'text' : 'password'"
                            counter @click:append="show1 = !show1" prepend-icon="mdi-lock" dense outlined
                            v-model="user.password" label="Ingrese su contraseña" required />
                        <div class="d-flex justify-center">
                            <v-btn dark color="secondary" depressed :disabled="loadingLogin" :loading="loadingLogin"
                                @click="handleLogin">Entrar</v-btn>
                        </div>
                    </v-form>
                    <v-alert type="error" dense v-show="errorMessage">{{ errorMessage }}</v-alert>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import formRules from "@/utils/formRules.js";
import { useAuthStore } from "@/stores/auth";

export default {
    setup() {
        const auth = useAuthStore();
        return { auth };
    },
    methods: {
        async validate() {
            this.errorMessage = "";
            this.loadingLogin = true;
            const validateForm = await this.$refs.form.validate();
            if (!validateForm.valid) {
                this.loadingLogin = false;
                return false;
            }
            return true;
        },
        async handleLogin() {
            try {
                const isValid = await this.validate();
                if (!isValid) return;
                await this.auth.login(this.user);
                this.$router.push("/");
            } catch (error) {
                this.loadingLogin = false;
                this.errorMessage = error;
            }
        },
    },
    computed: {
        loggedIn() {
            return this.auth.status.loggedIn;
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    data: () => ({
        user: {
            email: null,
            password: null,
        },
        loadingLogin: false,
        errorMessage: "",
        newPassword: null,
        show1: false,
        isValidForm: false,
        formRules: formRules,
    }),
};
</script>
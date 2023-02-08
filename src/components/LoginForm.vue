<template>
    <v-row justify="center" align="center">
        <v-col cols="12" lg="7">
            <v-card flat outlined>
                <v-card-text>
                    <h1 class="headline font-weight-bold grey--text text--darken-3">
                        ¿Ya tiene una cuenta?
                    </h1>
                </v-card-text>
                <v-card-text>
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field prepend-icon="mdi-email" validate-on-blur clearable dense outlined
                            v-model="user.email" :rules="[rules.emailPattern]" label="Ingrese su e-mail" type="email"
                            required data-cy="field-email" />
                        <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.passwordRequired, rules.min]" :type="show1 ? 'text' : 'password'" counter
                            @click:append="show1 = !show1" prepend-icon="mdi-lock" dense outlined
                            v-model="user.password" label="Ingrese su contraseña" required data-cy="field-password" />
                        <v-row align="center" justify="space-around">
                            <v-btn dark color="secondary" depressed :disabled="loading" :loading="loading"
                                @click="handleLogin" data-cy="clickLogin">Entrar</v-btn>
                        </v-row>
                        <v-row align="center" justify="space-around" class="px-8">
                            <v-divider />
                            <h1 class="subtitle-2 ma-4"></h1>
                            <v-divider />
                        </v-row>
                    </v-form>
                    <v-alert type="error" dense v-if="message">{{ message }}</v-alert>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import formRules from "@/common/formRules.js";
import { useAuthStore } from "@/stores/auth";

export default {
    setup() {
        const auth = useAuthStore();

        return { auth };
    },
    methods: {
        validate() {
            this.message = "";
            this.loading = true;
            if (!this.$refs.form.validate()) {
                this.loading = false;
                return false;
            }
            return true;
        },
        handleLogin() {
            if (!this.validate()) return;
            this.auth.login(this.user).then(
                () => {
                    this.$router.push("/content");
                },
                (error) => {
                    this.loading = false;
                    this.message = error;
                }
            );
        },
    },
    computed: {
        loggedIn() {
            return this.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/content");
        }
    },
    data: () => ({
        user: {
            email: null,
            password: null,
        },
        tab: 0,
        loading: false,
        snackbar: false,
        message: "",
        newPassword: null,
        show1: false,
        valid: false,
        rules: formRules,
    }),
};
</script>
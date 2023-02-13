<template>
  <v-app-bar color="white" prominent flat>
    <v-app-bar-nav-icon class="d-sm-none" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title> <v-btn href="/">Virtual ticket</v-btn></v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="d-none d-sm-flex">
      <v-btn v-for="url in loggedInUrls" :key="url.value" :href="url.value">{{ url.title }}</v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary class="d-sm-none" v-if="mobile">
    <v-list>
      <v-list-item v-for="(url, i) in loggedInUrls" :key="i" :value="url" active-color="primary" :href="url.value">
        <v-list-item-title>{{ url.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const drawer = ref(false);
const loggedIn = ref(false);
const urls = reactive([
  {
    title: 'Mis tickets',
    value: '/tickets',
    needLogin: true
  },
  {
    title: 'Entrar',
    value: '/login',
    needLogin: false
  },
  {
    title: 'Salir',
    value: '/sign-out',
    needLogin: true
  },
]);

const loggedInUrls = computed(() => {
  return urls.filter(url => url.needLogin == loggedIn.value);
});

const { mobile } = useDisplay();
</script>
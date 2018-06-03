<template>
  <v-list dense>
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>__menu.home__</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="logout">
      <v-list-tile-action>
        <v-icon>power_settings_new</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>__menu.logout__</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
<script>
  export default {
    name: 'iro-menu',
    methods: {
      logout() {
        localStorage.removeItem("user-token");
        window.location = "#/login"
      }
    }
  };
</script>

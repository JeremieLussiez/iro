<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <v-card class="elevation-12">
              <v-toolbar dark color="black">
                <img width="54" height="54" style="margin-right: 4px;" src="../assets/logo.svg">
                <v-toolbar-title>__login.screen.application.name__</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field color="grey darken-4" prepend-icon="person" name="login" label="login.screen.login" type="text">
                  </v-text-field>
                  <v-text-field color="grey darken-4" prepend-icon="lock" name="password" label="login.screen.password" id="password" type="password">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="grey darken-4" @click.native="connect()">__login.screen.create__</v-btn>
                <v-btn outline color="grey darken-4" @click.native="connect()">__login.screen.connect__</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  // import LoginService from './loginService';

  // const loginServiceInstance = new LoginService();
  export default {
    name: 'login-screen',
    props: [],
    data() {
      return {
        login: '',
        password: '',
      };
    },

    mounted() {
      /* Vue.http
         .get('/api/networks')
         .then((response) => {
           // console.log(response);
           this.accessPoints = response.body;
         }); */
    },

    methods: {
      connect() {
        // loginServiceInstance.login(this.login, this.password, this.client);
      },
    },

  };

</script>

<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <v-card class="elevation-12">
              <v-toolbar color="blue">
                <img width="54" height="54" style="margin-right: 4px;" src="assets/logo-white.svg">
                <v-toolbar-title style="color: white;">__login.screen.application.name__</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field color="blue" v-model="email" prepend-icon="person" name="email" label="__login.screen.email__" id="email" type="text">
                  </v-text-field>
                  <v-text-field color="blue" v-model="password" prepend-icon="lock" name="password" label="__login.screen.password__" id="password" type="password">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="blue" @click.native="goHome()">__login.screen.test__</v-btn>
                <v-btn outline color="blue" @click.native="connect()">__login.screen.create__</v-btn>
                <v-btn outline color="blue" @click.native="connect()">__login.screen.connect__</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {
    store,
    AUTHENTICATE_USER,
  } from '@/store.js';

  export default {
    name: 'login-screen',
    props: [],
    data() {
      return {
        email: '',
        password: '',
      };
    },
    /*
        beforeRouteEnter(route, from, next) {
          console.log(route.params);
        },
    */
    methods: {
      goHome() {
        router.push({path: '/login', params: {mode: 'update'}});
      },
      connect() {
        store.dispatch(AUTHENTICATE_USER, {
          email: this.email,
          password: this.password,
        });
      },
    },

  };

</script>

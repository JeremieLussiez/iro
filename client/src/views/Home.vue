<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <iro-menu></iro-menu>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>__menu.greeting__, {{username}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-tabs show-arrows v-model="active" color="cyan" dark slider-color="yellow">
        <v-tab ripple>
          Fill
        </v-tab>
        <v-tab ripple>
          Rainbow
        </v-tab>
        <v-tab ripple>
          Setup
        </v-tab>
        <v-tab ripple>
          Gauge
        </v-tab>
        <v-tab ripple>
          Wave
        </v-tab>
        <v-tab-item>
          <iro-mode @sendToServer="sendToServer">
            <iro-fill-mode></iro-fill-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode @sendToServer="sendToServer">
            <iro-rainbow-mode></iro-rainbow-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode @sendToServer="sendToServer">
            <iro-setup-mode></iro-setup-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode @sendToServer="sendToServer">
            <iro-gauge-mode></iro-gauge-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode @sendToServer="sendToServer">
            <iro-wave-mode></iro-wave-mode>
          </iro-mode>
        </v-tab-item>
      </v-tabs>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios';

  import { store } from "../store";

  import IroMode from '@/components/modes/IroMode.vue';
  import IroGaugeMode from '@/components/modes/IroGaugeMode.vue';
  import IroWaveMode from '@/components/modes/IroWaveMode.vue';
  import IroFillMode from '@/components/modes/IroFillMode.vue';
  import IroSetupMode from '@/components/modes/IroSetupMode.vue';
  import IroRainbowMode from '@/components/modes/IroRainbowMode.vue';
  import IroMenu from '@/views/IroMenu.vue';

  export default {
    name: 'home',
    props: {
      source: String,
    },
    components: {
      IroGaugeMode,
      IroWaveMode,
      IroSetupMode,
      IroRainbowMode,
      IroFillMode,
      IroMenu,
      IroMode,
    },
    data: () => ({
      username: '',
      drawer: null,
      notifications: false,
      sound: true,
      widgets: false,
      active: null,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    methods: {
      next() {
        const active = parseInt(this.active, 10);
        this.active = (active < 2 ? active + 1 : 0).toString();
      },
      sendToServer(modeName, modeParams = {}, messageParams = {}) {
        console.log('sendToServer', modeName, modeParams, messageParams);
        const message = {
          payload: {
            type: modeName,
            speed: 1,
            duration: -1,
            ...modeParams,
          },
          text: 'Hello iro!',
          from: this.username,
          date: new Date(),//todo dynamic date depending on chosen delay
          ...messageParams,
        };
        axios.post('/api/messages', message).then(
          result => {
          },
          error => {
            console.log(error);
          }
        );
      },
    },
    mounted() {
      this.username = store.state.userData.username
    }
  };
</script>

<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <iro-menu></iro-menu>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Iro client</v-toolbar-title>
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
          <iro-mode>
            <iro-fill-mode @sendToServer="sendToServer"></iro-fill-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode>
            <iro-rainbow-mode @sendToServer="sendToServer"></iro-rainbow-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode>
            <iro-setup-mode @sendToServer="sendToServer"></iro-setup-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode>
            <iro-gauge-mode @sendToServer="sendToServer"></iro-gauge-mode>
          </iro-mode>
        </v-tab-item>
        <v-tab-item>
          <iro-mode>
            <iro-wave-mode @sendToServer="sendToServer"></iro-wave-mode>
          </iro-mode>
        </v-tab-item>
      </v-tabs>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';

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
    sendToServer(modeName, modeParams = {}) {
      console.log('sendToServer', modeName, modeParams);
      const message = {
        payload: {
          ...modeParams,
          type: modeName,
          speed: 1,
          duration: -1,
        },
        text: 'I did it!!',
        date: new Date(),
        to: 'IRO00001',
        from: 'Lootss',
      };
      axios.post('/api/messages', message).then(
        result => {},
        error => {
          console.log(error);
        }
      );
    },
  },
};
</script>

import Vue from 'vue/dist/vue.common';
import './loginScreenComponent.css';
import Translator from '../../translate/translator';
import LoginService from './loginService';
import template from './loginScreenComponent.html';
import fr from './labels/fr';
import en from './labels/en';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

const loginServiceInstance = new LoginService();

const component = Vue.component('login-screen', {
  props: [],
  template,

  data() {
    return {
      ssid: '',
      password: '',
      accessPoints: [],
      selectedAccessPoint: '',
      colors: [
        [0x00, 0xbc, 0xd4],
        [0x21, 0x96, 0xf3],
        [0x3f, 0x51, 0xb5],
        [0x67, 0x3a, 0xb7],
        [0x9c, 0x27, 0xb0],
        [0xe9, 0x1e, 0x63],
        [0xf4, 0x43, 0x36],
        [0xff, 0x57, 0x22],
        [0xff, 0x98, 0x00],
        [0xff, 0xc1, 0x07],
        [0xff, 0xeb, 0x3b],
        [0xcd, 0xdc, 0x39],
        [0x8b, 0xc3, 0x4a],
        [0x4b, 0xaf, 0x4f],
        [0x00, 0x96, 0x88],
        [0x9e, 0x9e, 0x9e],
        [0x60, 0x7d, 0x8b],
        [0x79, 0x55, 0x48],
        [0x97, 0x6a, 0x5a],
      ],
      colorIndex: 0,
    };
  },

  mounted() {
    Vue.http
      .get('/api/networks')
      .then((response) => {
        // console.log(response);
        this.accessPoints = response.body;
      });
  },

  methods: {
    connect() {
      loginServiceInstance.login(this.login, this.password, this.client);
    },
    displayRing() {
      const red = this.colors[this.colorIndex][0];
      const green = this.colors[this.colorIndex][1];
      const blue = this.colors[this.colorIndex][2];
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      Vue.http.get(`/api/ring?foreground=r${red}g${green}b${blue}`);
    },
    displayGauge() {
      const red = this.colors[this.colorIndex][0];
      const green = this.colors[this.colorIndex][1];
      const blue = this.colors[this.colorIndex][2];
      const backgroundColorIndex = (this.colorIndex + (this.colors.length >> 1)) % this.colors.length;
      const backgroundRed = this.colors[backgroundColorIndex][0];
      const backgroundGreen = this.colors[backgroundColorIndex][1];
      const backgroundBlue = this.colors[backgroundColorIndex][2];
      const value = Math.round(Math.random() * 23);
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      Vue.http.get(`/api/gauge?foreground=r${red}g${green}b${blue}&background=r${backgroundRed}g${backgroundGreen}b${backgroundBlue}&value=${value}`);
    },
    displaySmiley() {
      const red = this.colors[this.colorIndex][0];
      const green = this.colors[this.colorIndex][1];
      const blue = this.colors[this.colorIndex][2];
      const backgroundColorIndex = (this.colorIndex + (this.colors.length >> 1)) % this.colors.length;
      const backgroundRed = this.colors[backgroundColorIndex][0];
      const backgroundGreen = this.colors[backgroundColorIndex][1];
      const backgroundBlue = this.colors[backgroundColorIndex][2];
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      Vue.http.get(`/api/smiley?foreground=r${red}g${green}b${blue}&background=r${backgroundRed}g${backgroundGreen}b${backgroundBlue}`);
    },
    displayWave() {
      const red = this.colors[this.colorIndex][0];
      const green = this.colors[this.colorIndex][1];
      const blue = this.colors[this.colorIndex][2];
      const backgroundColorIndex = (this.colorIndex + (this.colors.length >> 1)) % this.colors.length;
      const backgroundRed = this.colors[backgroundColorIndex][0];
      const backgroundGreen = this.colors[backgroundColorIndex][1];
      const backgroundBlue = this.colors[backgroundColorIndex][2];
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      Vue.http.get(`/api/wave?foreground=r${red}g${green}b${blue}&background=r${backgroundRed}g${backgroundGreen}b${backgroundBlue}`);
    },
  },

});

export default {
  routes: {
    path: '/login',
    component,
  },
  component,
};

import Vue from 'vue/dist/vue.common';
import './setupMode.scss';
import IroRing from '../../iroRing/iroRing';
import Translator from '../../../translate/translator';
import template from './setupMode.html';
import fr from './labels/fr';
import en from './labels/en';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

const component = Vue.component('iro-setup-mode', {

  template,

  components: [IroRing],

  methods: {
    translate(label) {
      return translatorInstance.getTranslatedLabel(label);
    },
    updateModeParameters() {
      const {
        leds,
      } = this.$refs.ring;
      for (let i = 0; i < leds.length; i++) {
        const led = leds[i];
        led.color = '#eeeeee';
      }
      leds[0].color = '#2196f3';
      leds[6].color = '#ff0000';
      leds[12].color = '#ffeb3b';
      leds[18].color = '#4baf4f';
    },
    ringUpdate(leds) {
      const firstLedColor = leds[0].color;
      for (let i = 0; i < leds.length - 1; i++) {
        const led = leds[i];
        const nextLed = leds[(i + 1) % leds.length];
        led.color = nextLed.color;
      }
      const lastLed = leds[leds.length - 1];
      lastLed.color = firstLedColor;
    },
  },

  mounted() {
    this.updateModeParameters();
  },

});

export default {
  routes: {
    path: '/iroSetupMode',
    component,
  },
  component,
};

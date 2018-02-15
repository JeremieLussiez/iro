import Vue from 'vue/dist/vue.common';
import './rainbowMode.scss';
import IroRing from '../../iroRing/iroRing';
import Translator from '../../../translate/translator';
import Color from '../../../tools/color';
import template from './rainbowMode.html';
import fr from './labels/fr';
import en from './labels/en';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

const component = Vue.component('iro-rainbow-mode', {

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
      const rainbow = [
        '#2196f3',
        '#3f51b5',
        '#9c27b0',
        '#ff5722',
        '#ffeb3b',
        '#4baf4f',
      ];
      let ledIndex = 0;
      const steps = leds.length / rainbow.length;
      for (let i = 0; i < rainbow.length - 1; i++) {
        for (let j = 0; j < steps; j++) {
          const startColor = Color.htmlColorToRGB(rainbow[i]);
          const endColor = Color.htmlColorToRGB(rainbow[i + 1]);
          const newColor = Color.lerpColor(startColor, 0, endColor, steps, j);
          leds[ledIndex].color = Color.rgbToHTMLColor(newColor);
          ledIndex++;
        }
      }
      for (let j = 0; j < steps; j++) {
        const startColor = Color.htmlColorToRGB(rainbow[rainbow.length - 1]);
        const endColor = Color.htmlColorToRGB(rainbow[0]);
        const newColor = Color.lerpColor(startColor, 0, endColor, steps, j);
        leds[ledIndex].color = newColor;
        ledIndex++;
      }
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
    path: '/iroRaimbowMode',
    component,
  },
  component,
};

import Vue from 'vue/dist/vue.common';
import './gaugeMode.scss';
import IroRing from '../../iroRing/iroRing';
import Translator from '../../../translate/translator';
import Color from '../../../tools/color';
import template from './gaugeMode.html';
import fr from './labels/fr';
import en from './labels/en';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

const component = Vue.component('iro-gauge-mode', {

  template,

  components: [IroRing],

  data: () => ({
    value: 17,
  }),

  methods: {
    translate(label) {
      return translatorInstance.getTranslatedLabel(label);
    },
    onLedClick(ledIndex) {
      if (ledIndex === 0) {
        if (this.value === 1) {
          this.value = 0;
        } else if (this.value === 0) {
          this.value = 1;
        } else {
          this.value = ledIndex;
        }
      } else {
        this.value = ledIndex;
      }
      this.updateModeParameters();
    },
    updateModeParameters() {
      const {
        leds,
      } = this.$refs.ring;
      for (let i = this.value; i < leds.length; i++) {
        const led = leds[i];
        led.color = '#eeeeee';
      }
      if (this.value > 0) {
        for (let i = 0; i <= this.value; i++) {
          leds[i].color = Color.rgbToHTMLColor(Color.lerpColor(Color.htmlColorToRGB('#ffeb3b'), 0, Color.htmlColorToRGB('#ff5722'), leds.length, i));
        }
      }
    },
    ringUpdate() {
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

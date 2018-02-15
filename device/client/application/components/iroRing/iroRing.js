import Vue from 'vue/dist/vue.common';
import './iroRing.scss';
import template from './iroRing.html';

const component = Vue.component('iro-ring', {
  template,

  data: () => ({
    time: 0,
    ledRadius: 10,
    ringRadius: 80,
    leds: [],
  }),

  methods: {
    onLedClick(ledId) {
      this.$emit('ledClick', ledId);
    },
    resetLeds(leds) {
      this.leds = leds;
      this.$forceUpdate();
    },
  },

  computed: {
    viewBox() {
      const actualRadius = (this.ringRadius + this.ledRadius) * 2;
      return `0 0 ${actualRadius} ${actualRadius}`;
    },
  },

  destroyed() {
    window.clearInterval(this.timer);
  },

  mounted() {
    const ringSize = 24;
    const angleCorrection = -Math.PI / 2.0;
    const radiusOffset = this.ledRadius + this.ringRadius;
    const radius = (Math.PI * 2) / ringSize;
    for (let i = 0; i < ringSize; i++) {
      const angle = angleCorrection + (radius * i);
      this.leds.push({
        index: i,
        color: '#eeeeee',
        x: (Math.cos(angle) * this.ringRadius) + radiusOffset,
        y: (Math.sin(angle) * this.ringRadius) + radiusOffset,
      });
    }

    for (let i = 0; i < this.leds.length; i++) {
      const led = this.leds[i];
      led.color = '#eeeeee';
    }

    this.timer = window.setInterval(() => {
      this.$emit('ringUpdate', this.leds);
      this.$forceUpdate();
    }, 50);
    this.$forceUpdate();
  },

});

export default component;

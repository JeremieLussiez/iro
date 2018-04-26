<template>
  <v-card>
    <v-card-actions>
      <iro-ring ref="ring" @ledClick="onLedClick" @ringUpdate="ringUpdate"></iro-ring>
    </v-card-actions>
    <v-card-actions>
      <v-layout row wrap>
        <v-flex fill-height xs12 sm12 md12>
          <iro-color-picker label="__gauge.background__" :color="backgroundColor" @colorChange="colorValue => changeColor('backgroundColor', colorValue)"></iro-color-picker>
        </v-flex>
        <v-flex fill-height xs12 sm12 md12>
          <iro-color-picker label="__gauge.gradient.start__" :color="gradientStart" @colorChange="colorValue => changeColor('gradientStart', colorValue)"></iro-color-picker>
        </v-flex>
        <v-flex fill-height xs12 sm12 md12>
          <iro-color-picker label="__gauge.gradient.end__" :color="gradientEnd" @colorChange="colorValue => changeColor('gradientEnd', colorValue)"></iro-color-picker>
        </v-flex>
        <v-flex fill-height xs12 sm12 md12>
          <v-slider v-model="value" label="__gauge.value__" step="1" min="0" max="24" @input="changeValue"></v-slider>
        </v-flex>
      </v-layout>
    </v-card-actions>
    <v-card-actions>
      <v-btn flat color="orange" @click="send()">Send to</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import IroRing from '@/components/IroRing.vue';
import IroColorPicker from '@/components/IroColorPicker.vue';
import Color from '@/tools/color';

export default {
  name: 'iro-gauge-mode',

  components: {
    IroRing,
    IroColorPicker,
  },

  data: () => ({
    value: 17,
    backgroundColor: '#eeeeee',
    gradientStart: '#9c27b0',
    gradientEnd: '#5b44b3',
  }),

  methods: {
    changeColor(colorProp, colorValue) {
      this[colorProp] = colorValue;
      this.updateModeParameters();
    },
    changeValue(newValue) {
      this.value = newValue;
      this.updateModeParameters();
    },
    onLedClick(ledIndex) {
      if (ledIndex === 0 && this.value === 1) {
        this.changeValue(0);
      } else {
        this.changeValue(ledIndex + 1);
      }
    },
    setGradient(start, end) {
      this.gradient = {
        start,
        end,
      };
      this.updateModeParameters();
    },
    updateModeParameters() {
      const {leds} = this.$refs.ring;
      for (let i = 0; i < this.value; i++) {
        leds[i].color = Color.rgbToHTMLColor(
          Color.lerpColor(
            Color.htmlColorToRGB(this.gradientStart),
            0,
            Color.htmlColorToRGB(this.gradientEnd),
            leds.length - 1,
            i
          )
        );
      }
      for (let i = this.value; i < leds.length; i++) {
        const led = leds[i];
        led.color = this.backgroundColor;
      }
    },
    ringUpdate() {},
    send() {
      const params = {
        background: this.backgroundColor,
        value: toPercentage(this.value).toFixed(2),
        gradient: {
          end: this.gradientEnd,
          start: this.gradientStart,
        },
      };
      this.$emit('sendToServer', 'gauge', params);
    },
  },

  mounted() {
    this.updateModeParameters();
  },
};

function toPercentage(value) {
  return value / 24;
}
</script>

<template>
  <v-card-actions>
    <iro-ring ref="ring" @ringUpdate="ringUpdate"></iro-ring>
    <v-layout row wrap>
      <v-flex fill-height xs12 sm12 md12>
        <iro-color-picker label="__wave.background__" :color="backgroundColor"
                          @colorChange="colorValue => changeColor('backgroundColor', colorValue)"></iro-color-picker>
      </v-flex>
      <v-flex fill-height xs12 sm12 md12>
        <iro-color-picker label="__wave.gradient.start__" :color="gradientStart"
                          @colorChange="colorValue => changeColor('gradientStart', colorValue)"></iro-color-picker>
      </v-flex>
      <v-flex fill-height xs12 sm12 md12>
        <iro-color-picker label="__wave.gradient.end__" :color="gradientEnd"
                          @colorChange="colorValue => changeColor('gradientEnd', colorValue)"></iro-color-picker>
      </v-flex>
    </v-layout>
  </v-card-actions>
</template>

<script>
  import IroRing from '@/components/IroRing.vue';
  import IroColorPicker from '@/components/IroColorPicker.vue';
  import Color from '@/tools/color';

  export default {
    name: 'iro-wave-mode',

    components: {
      IroRing,
      IroColorPicker,
    },

    data: () => ({
      backgroundColor: '#202020',
      gradientStart: '#9c27b0',
      gradientEnd: '#5b44b3',
    }),

    methods: {
      changeColor(colorProp, colorValue) {
        this[colorProp] = colorValue;
        this.updateModeParameters();
      },
      updateModeParameters() {
        const { leds } = this.$refs.ring;
        for (let i = 0; i < leds.length; i++) {
          const led = leds[i];
          led.color = this.backgroundColor;
        }
        const trailSize = 12;
        for (let i = 0; i < trailSize; i++) {
          leds[i].color = Color.rgbToHTMLColor(
            Color.lerpColor(
              Color.htmlColorToRGB(this.gradientStart),
              0,
              Color.htmlColorToRGB(this.gradientEnd),
              trailSize,
              i
            )
          );
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
      getConfig() {
        return {
          name: 'wave',
          params: {
            background: this.backgroundColor,
            gradient: {
              end: this.gradientEnd,
              start: this.gradientStart,
            },
          },
        };
      },
    },

    mounted() {
      this.updateModeParameters();
    },
  };
</script>

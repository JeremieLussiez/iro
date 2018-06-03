<template>
  <v-card-actions>
    <iro-ring ref="ring" @ringUpdate="ringUpdate"></iro-ring>
  </v-card-actions>
</template>

<script>
  import IroRing from '@/components/IroRing.vue';
  import Color from '@/tools/color';

  export default {
    name: 'iro-rainbow-mode',

    components: {
      IroRing,
    },

    methods: {
      updateModeParameters() {
        const { leds } = this.$refs.ring;
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
            leds[ledIndex].color = Color.rgbToHTMLColor(
              Color.lerpColor(
                Color.htmlColorToRGB(rainbow[i]),
                0,
                Color.htmlColorToRGB(rainbow[i + 1]),
                steps,
                j
              )
            );
            ledIndex++;
          }
        }
        for (let j = 0; j < steps; j++) {
          leds[ledIndex].color = Color.rgbToHTMLColor(
            Color.lerpColor(
              Color.htmlColorToRGB(rainbow[rainbow.length - 1]),
              0,
              Color.htmlColorToRGB(rainbow[0]),
              steps,
              j
            )
          );
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
      getConfig() {
        return {
          name: 'rainbow',
        };
      },
    },

    mounted() {
      this.updateModeParameters();
    },
  };
</script>

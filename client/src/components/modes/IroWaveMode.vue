<template>
  <iro-ring ref="ring" @ringUpdate="ringUpdate"></iro-ring>
</template>
<script>
  import IroRing from '@/components/IroRing.vue';
  import Color from '@/tools/color';

  export default {

    name: 'iro-wave-mode',

    components: {
      IroRing,
    },

    data: () => ({
      gradient: {
        start: '#2196f3',
        end: '#eeeeee',
      },
    }),

    methods: {
      updateModeParameters() {
        const {
          leds,
        } = this.$refs.ring;
        for (let i = 0; i < leds.length; i++) {
          const led = leds[i];
          led.color = '#eeeeee';
        }
        const trailSize = 12;
        for (let i = 0; i < trailSize; i++) {
          leds[i].color = Color.rgbToHTMLColor(Color.lerpColor(Color.htmlColorToRGB(this.gradient.start), 0, Color.htmlColorToRGB(this.gradient.end), trailSize, i));
        }
      },
      setGradient(start, end) {
        this.gradient = {
          start,
          end,
        };
        this.updateModeParameters();
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

  };

</script>

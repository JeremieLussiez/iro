<template>
  <iro-ring ref="ring" @ledClick="onLedClick" @ringUpdate="ringUpdate"></iro-ring>
</template>
<script>
  import IroRing from '@/components/IroRing.vue';
  import Color from '@/tools/color';

  export default {

    name: 'iro-gauge-mode',

    components: {
      IroRing,
    },

    data: () => ({
      value: 17,
      gradient: {
        start: '#ffffff',
        end: '#ffffff',
      },
    }),

    methods: {
      onLedClick(ledIndex) {
        if (ledIndex + 1 === this.value) {
          this.value = 0;
        } else {
          this.value = ledIndex + 1;
        }
        this.updateModeParameters();
      },
      setGradient(start, end) {
        this.gradient = {
          start,
          end,
        };
        this.updateModeParameters();
      },
      updateModeParameters() {
        const {
          leds,
        } = this.$refs.ring;
        for (let i = 0; i < this.value; i++) {
          leds[i].color = Color.rgbToHTMLColor(Color.lerpColor(Color.htmlColorToRGB(this.gradient.start), 0, Color.htmlColorToRGB(this.gradient.end), leds.length - 1, i));
        }
        for (let i = this.value; i < leds.length; i++) {
          const led = leds[i];
          led.color = '#eeeeee';
        }
      },
      ringUpdate() {
      },
    },

    mounted() {
      this.updateModeParameters();
    },

  };

</script>

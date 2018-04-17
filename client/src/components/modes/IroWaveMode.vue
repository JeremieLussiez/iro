<template>
  <iro-ring ref="ring" @ringUpdate="ringUpdate"></iro-ring>
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
    }),

    methods: {
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

  };

</script>

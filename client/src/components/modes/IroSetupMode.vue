<template>
  <iro-ring ref="ring" @ringUpdate="ringUpdate"></iro-ring>
</template>
<script>
  import IroRing from '@/components/IroRing.vue';

  export default {
    name: 'iro-setup-mode',

    components: {
      IroRing,
    },

    methods: {
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

  };

</script>

<template>
  <v-card-actions>
    <iro-ring ref="ring" @ringUpdate="ringUpdate"></iro-ring>
    <v-layout row wrap>
      <v-flex fill-height xs12 sm12 md12>
        <iro-color-picker label="__gauge.background__" :color="backgroundColor"
                          @colorChange="colorValue => changeColor('backgroundColor', colorValue)"></iro-color-picker>
      </v-flex>
    </v-layout>
  </v-card-actions>
</template>

<script>
  import IroRing from '@/components/IroRing.vue';
  import IroColorPicker from '@/components/IroColorPicker.vue';

  export default {
    name: 'iro-fill-mode',

    components: {
      IroRing,
      IroColorPicker,
    },

    data: () => ({
      backgroundColor: '#eeeeee',
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
      },
      ringUpdate() {
      },
      getConfig() {
        return {
          name: 'fill',
          params: {
            background: this.backgroundColor,
          },
        };
      },
    },
    mounted() {
      this.updateModeParameters();
    },
  };

</script>

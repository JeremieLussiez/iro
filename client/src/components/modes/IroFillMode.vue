<template>
  <v-card>
    <v-card-actions>
      <iro-ring ref="ring" @ringUpdate="ringUpdate"></iro-ring>
    </v-card-actions>
    <v-card-actions>
      <v-layout row wrap>
        <v-flex fill-height xs12 sm12 md12>
          <iro-color-picker label="__gauge.background__" :color="backgroundColor" @colorChange="colorValue => changeColor('backgroundColor', colorValue)"></iro-color-picker>
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
        const {leds} = this.$refs.ring;
        for (let i = 0; i < leds.length; i++) {
          const led = leds[i];
          led.color = this.backgroundColor;
        }
      },
      ringUpdate() {
      },
      send() {
        const params = {
          background: this.backgroundColor,
        };
        this.$emit('sendToServer', 'fill', params);
      },
    },

    mounted() {
      this.updateModeParameters();
    },
  };

</script>

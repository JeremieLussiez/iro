<template>
  <v-menu bottom offset-y>
    <v-btn :style="{ backgroundColor: currentColor }" slot="activator">{{label}}</v-btn>
    <v-card dark color="secondary">
      <v-layout row wrap>
        <v-btn v-for="(code,name) in colors" :key="code" fab :color="name" @click="changeCurrentColor(code)">&nbsp;</v-btn>
      </v-layout>
    </v-card>
  </v-menu>
</template>

<script>
import Color from '@/tools/color';

export default {
  name: 'iro-color-picker',
  props: ['label', 'color'],
  data: () => ({
    colors: Color.colors,
    currentColor: this.color || '#ffffff',
  }),
  methods: {
    changeCurrentColor(code) {
      this.currentColor = code;
      this.$emit('colorChange', this.currentColor);
    },
  },
};
</script>

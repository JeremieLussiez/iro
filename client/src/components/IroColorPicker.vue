<template>
  <v-menu bottom offset-y>
    <v-btn :color="currentColor.name" slot="activator">{{label}}</v-btn>
    <v-card dark color="secondary">
      <v-layout row wrap>
        <v-btn v-for="(code,name) in colors" :key="code" fab :color="name" @click="changeCurrentColor(name,code)">&nbsp;</v-btn>
      </v-layout>
    </v-card>
  </v-menu>
</template>

<script>
  import Color from '@/tools/color';

  export default {
    name: 'iro-color-picker',
    props: ['label'],
    data: () => ({
      currentColor: {
        code: '#ffffff',
        name: 'white',
      },
      colors: Color.colors,
    }),
    methods: {
      changeCurrentColor(name, code) {
        this.currentColor = {
          name,
          code,
        };
        this.$emit('colorChange', this.currentColor);
      },
    },
  };
</script>

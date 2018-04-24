<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex fill-height xs12 sm6 md6>
        <v-card>
          <slot></slot>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>   
</template>

<script>

export default {
  name: 'iro-mode',
  props: {},
  data: () => ({}),
  methods: {
  },
};
</script>

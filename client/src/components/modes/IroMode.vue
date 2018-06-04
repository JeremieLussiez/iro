<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex fill-height xs12 sm12 offset-md3 md6>
        <v-card>
          <slot></slot>
          <v-card-actions>
            <v-menu top>
              <v-btn flat color="orange" slot="activator">Send to</v-btn>
              <v-card>
                <v-btn @click="send('IRO00001')">iro1</v-btn>
                <v-btn @click="send('IRO00002')">iro2</v-btn>
              </v-card>
            </v-menu>
          </v-card-actions>
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
      send(targetIroId) {
        const modeData = this.$slots.default[0].componentInstance.getConfig();
        const messageParams = {
          to: targetIroId
        };

        this.$emit('sendToServer', modeData.name, modeData.params, messageParams);
      }
    },
  };
</script>

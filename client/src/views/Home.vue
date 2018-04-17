<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <iro-menu></iro-menu>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Iro client</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-tabs show-arrows v-model="active" color="cyan" dark slider-color="yellow">
        <v-tab v-for="n in 10" :key="n" ripple>
          Item {{ n }}
        </v-tab>
        <v-tab-item>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex fill-height xs12 sm6 md6>
                <v-card>
                  <v-card-media>
                    <iro-rainbow-mode></iro-rainbow-mode>
                    <iro-gauge-mode ref="gauge"></iro-gauge-mode>
                  </v-card-media>
                  <v-card-actions>
                    <v-btn flat color="orange">Send to</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-card fill-height>
                  <v-card-actions>
                    <v-layout row wrap>
                      <v-flex fill-height xs12 sm12 md12>
                        <iro-color-picker label="gauge.gradient.start" @colorChange="changeStartColor"></iro-color-picker>
                      </v-flex>
                      <v-flex fill-height xs12 sm12 md12>
                        <iro-color-picker label="gauge.gradient.end" @colorChange="changeEndColor"></iro-color-picker>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs>
      <!--v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <v-carousel :cycle="false">
              <v-carousel-item>
                <iro-ring></iro-ring>
              </v-carousel-item>
              <v-carousel-item>
                <iro-setup-mode></iro-setup-mode>
              </v-carousel-item>
              <v-carousel-item>
                <iro-rainbow-mode></iro-rainbow-mode>
              </v-carousel-item>
              <v-carousel-item>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md6>
                      <iro-gauge-mode ref="gauge"></iro-gauge-mode>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <iro-color-picker @colorChange="changeStartColor"></iro-color-picker>
                      <iro-color-picker @colorChange="changeEndColor"></iro-color-picker>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-btn flat color="orange">Send to</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-container-->
    </v-content>
  </v-app>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';
  import IroRing from '@/components/IroRing.vue';
  import IroGaugeMode from '@/components/modes/IroGaugeMode.vue';
  import IroSetupMode from '@/components/modes/IroSetupMode.vue';
  import IroRainbowMode from '@/components/modes/IroRainbowMode.vue';
  import IroColorPicker from '@/components/IroColorPicker.vue';
  import IroMenu from '@/views/IroMenu.vue';
  import Color from '@/tools/color';

  export default {
    name: 'home',
    props: {
      source: String,
    },
    components: {
      IroColorPicker,
      IroRing,
      IroGaugeMode,
      HelloWorld,
      IroSetupMode,
      IroRainbowMode,
      IroMenu,
    },
    data: () => ({
      drawer: null,
      endColor: '#ffffff',
      startColor: '#ffffff',
      colors: Color.colors,
      notifications: false,
      sound: true,
      widgets: false,
      active: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    methods: {
      changeStartColor(startColor) {
        this.startColor = startColor.code;
        this.$refs.gauge.setGradient(this.startColor, this.endColor);
      },
      changeEndColor(endColor) {
        this.endColor = endColor.code;
        this.$refs.gauge.setGradient(this.startColor, this.endColor);
      },
      next() {
        const active = parseInt(this.active, 10);
        this.active = (active < 2 ? active + 1 : 0).toString();
      },
    },
  };
</script>

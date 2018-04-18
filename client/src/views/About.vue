<template>

  <v-app light>
    <v-toolbar class="white">
      <img src="assets/logo.svg" alt="IRO" height="32">
      <v-toolbar-title v-text="'my-iro.com'"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax src="assets/background-top.jpg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="assets/logo-white.svg" alt="IRO" height="400" style="opacity: 0.8">
            <h1 class="white--text mb-2 display-1 text-xs-center"></h1>
            <div class="subheading mb-3 text-xs-center">Colors... And beyond !</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="#/login"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The easiest way to visual notifications !</h2>
              <span class="subheading">
                If there is such a thing as "visual notification". Otherwise, "dibs" !
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Choose your colors !</div>
                    </v-card-title>
                    <v-card-text>
                      Select you animation and colors in the beautiful Material Design palette and make them shine all over your place ! Will you discover the IRO inside you ?
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Minimal configuration</div>
                    </v-card-title>
                    <v-card-text>
                      If you can browse this page, your IRO should be able to see the world too. You only have to setup your wifi and login with your account and the rest is up to us ! Don't waste your time and start sending colorful animations right now !
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Who said only humans can notify you ?</div>
                    </v-card-title>
                    <v-card-text>
                      Here at IRO, we think devices and applications should be able to talk to you, to tell you what they are doing using fabulous colors and mesmerizing animations. We are exposing a nice REST API allowing you to send messages to your favorite IRO from anything capable of using it !
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="assets/background-section.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Who thought that sending visual notifications was so easy ?</div>
            <em>It's time to find your IRO</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="#/login"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  We are not a company, yet. But, if you're looking to buy us, we're open to discuss it right now. Seriously, think of how many things you could do with such a great technology and how many new ideas we would be able to fund with some money... It would be awesome !
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  For obvious reasons and given all the web crawlers lurking all over the place, we are not providing everything here. Yet... Oh, by the way, don't phone us, use our non-existent email !
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Jérémie +33XXXXXXXXX</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Lucille +33XXXXXXXXX</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Lille, FR</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>no-reply@my-iro.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
  </v-app>
</template>

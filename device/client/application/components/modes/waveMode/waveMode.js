import Vue from "vue/dist/vue.common.js";
import "./waveMode.scss";
import template from "./waveMode.html";
import IroRing from "../../iroRing/iroRing";
import Translator from "../../../translate/translator";
import Color from "../../../tools/color";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let component = Vue.component("iro-wave-mode", {

    template: template,

    components: [IroRing],

    methods: {
        translate(label) {
            return translatorInstance.getTranslatedLabel(label);
        },
        updateModeParameters() {
            let leds = this.$refs.ring.leds;
            for (let i = 0; i < leds.length; i++) {
                const led = leds[i];
                led.color = "#eeeeee";
            }
            const trailSize = 12;
            for (let i = 0; i < trailSize; i++) {
                leds[i].color = Color.rgbToHTMLColor(Color.lerpColor(Color.htmlColorToRGB("#2196f3"), 0, Color.htmlColorToRGB("#eeeeee"), trailSize, i));
            }
        },
        ringUpdate(leds) {
            const firstLedColor = leds[0].color;
            for (let i = 0; i < leds.length - 1; i++) {
                const led = leds[i];
                const nextLed = leds[(i + 1) % leds.length];
                led.color = nextLed.color;
            }
            leds[leds.length - 1].color = firstLedColor;
        }
    },

    mounted() {
        this.updateModeParameters();
    }

});

export default {
    routes: {
        path: '/iroWaveMode',
        component: component
    },
    component: component
};

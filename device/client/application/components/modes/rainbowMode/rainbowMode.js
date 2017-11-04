import Vue from "vue/dist/vue.common.js";
import "./rainbowMode.scss";
import template from "./rainbowMode.html";
import IroRing from "../../iroRing/iroRing";
import Translator from "../../../translate/translator";
import Color from "../../../tools/color";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let component = Vue.component("iro-rainbow-mode", {

    template: template,

    components: [IroRing],

    methods: {
        translate(label) {
            return translatorInstance.getTranslatedLabel(label);
        },
        updateModeParameters() {
            let leds = this.$refs.ring.leds;
            const rainbow = [
                "#2196f3",
                "#3f51b5",
                "#9c27b0",
                "#ff5722",
                "#ffeb3b",
                "#4baf4f"
            ];
            let ledIndex = 0;
            const steps = leds.length / rainbow.length;
            for (let i = 0; i < rainbow.length - 1; i++) {
                for (let j = 0; j < steps; j++) {
                    leds[ledIndex].color = Color.rgbToHTMLColor(Color.lerpColor(Color.htmlColorToRGB(rainbow[i]), 0, Color.htmlColorToRGB(rainbow[i + 1]), steps, j));
                    ledIndex++;
                }
            }
            for (let j = 0; j < steps; j++) {
                leds[ledIndex].color = Color.rgbToHTMLColor(Color.lerpColor(Color.htmlColorToRGB(rainbow[rainbow.length - 1]), 0, Color.htmlColorToRGB(rainbow[0]), steps, j));
                ledIndex++;
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
        path: '/iroRaimbowMode',
        component: component
    },
    component: component
};

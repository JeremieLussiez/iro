import Vue from "vue/dist/vue.common.js";
import "./gaugeMode.scss";
import template from "./gaugeMode.html";
import IroRing from "../../iroRing/iroRing";
import Translator from "../../../translate/translator";
import Color from "../../../tools/color";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let component = Vue.component("iro-gauge-mode", {

    template: template,

    components: [IroRing],

    data: () => ({
        value: 17
    }),

    methods: {
        translate(label) {
            return translatorInstance.getTranslatedLabel(label);
        },
        updateModeParameters() {
            let leds = this.$refs.ring.leds;
            for (let i = this.value; i < leds.length; i++) {
                const led = leds[i];
                led.color = "#eeeeee";
            }
            for (let i = 0; i < this.value - 1; i++) {
                leds[i].color = Color.rgbToHTMLColor(Color.lerpColor(Color.htmlColorToRGB("#ffeb3b"), 0, Color.htmlColorToRGB("#ff5722"), leds.length, i));
            }
        },
        ringUpdate(leds) {
        }
    },

    mounted() {
        this.updateModeParameters();
    }

});

export default {
    routes: {
        path: '/iroSetupMode',
        component: component
    },
    component: component
};

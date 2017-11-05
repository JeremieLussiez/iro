import Vue from "vue/dist/vue.common.js";
import "./setupMode.scss";
import template from "./setupMode.html";
import IroRing from "../../iroRing/iroRing";
import Translator from "../../../translate/translator";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let component = Vue.component("iro-setup-mode", {

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
            leds[0].color = "#2196f3";
            leds[6].color = "#ff0000";
            leds[12].color = "#ffeb3b";
            leds[18].color = "#4baf4f";
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
        path: '/iroSetupMode',
        component: component
    },
    component: component
};

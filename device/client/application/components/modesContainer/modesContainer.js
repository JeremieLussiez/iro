import Vue from "vue/dist/vue.common.js";
import "./modesContainer.scss";
import template from "./modesContainer.html";
import Translator from "../../translate/translator";
import WaveMode from "../modes/waveMode/waveMode";
import RainbowMode from "../modes/rainbowMode/rainbowMode";
import SetupMode from "../modes/setupMode/setupMode";
import GaugeMode from "../modes/gaugeMode/gaugeMode";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let component = Vue.component("iro-modes-container", {
    props: [],
    template: template,

    components: [WaveMode.component, RainbowMode.component, SetupMode.component, GaugeMode.component],

    data: () => ({}),

    methods: {
        translate(label) {
            return translatorInstance.getTranslatedLabel(label);
        }
    }

});

export default {
    routes: {
        path: '/iroModes',
        component: component
    },
    component: component
};

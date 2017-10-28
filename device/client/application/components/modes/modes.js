import Vue from "vue/dist/vue.common.js";
import "./modes.scss";
import template from "./modes.html";
import Translator from "../../translate/translator";
import Iro from "../iro/iro";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let component = Vue.component("iro-modes", {
    props: [],
    template: template,

    components: [Iro],

    data: () => ({
        modes: [
            "#00bcd4",
            "#2196f3",
            "#3f51b5",
            "#00bcd4",
            "#2196f3",
            "#3f51b5",
        ]
    }),

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

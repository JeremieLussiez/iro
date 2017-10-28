import Vue from "vue/dist/vue.common.js";
import "./iro.scss";
import template from "./iro.html";
import Translator from "../../translate/translator";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let component = Vue.component("iro-iro", {
    props: ["title", "definition"],
    template: template,

    data: () => ({
        time: 0,
        ledRadius: 10,
        ringRadius: 80,
        leds: [
            {color: "#00bcd4"},
            {color: "#2196f3"},
            {color: "#3f51b5"},
            {color: "#673ab7"},
            {color: "#9c27b0"},
            {color: "#e91e63"},
            {color: "#f44336"},
            {color: "#ff5722"},
            {color: "#ff9800"},
            {color: "#ffc107"},
            {color: "#ffeb3b"},
            {color: "#cddc39"},
            {color: "#8bc34a"},
            {color: "#4baf4f"},
            {color: "#009688"},
            {color: "#00bcd4"},
            {color: "#2196f3"},
            {color: "#3f51b5"},
            {color: "#673ab7"},
            {color: "#9c27b0"},
            {color: "#e91e63"},
            {color: "#f44336"},
            {color: "#f44336"},
            {color: "#ff5722"},
        ]
    }),

    methods: {
        translate(label) {
            return translatorInstance.getTranslatedLabel(label);
        }
    },

    computed: {
        viewBox() {
            const actualRadius = (this.ringRadius + this.ledRadius) * 2;
            return `0 0 ${actualRadius} ${actualRadius}`;
        }
    },

    destroyed() {
        window.clearInterval(this.timer);
    },

    mounted() {
        for (let i = 0; i < this.leds.length; i++) {
            const led = this.leds[i];
            led.x = Math.cos(Math.PI * 2 / this.leds.length * i) * this.ringRadius + this.ledRadius + this.ringRadius;
            led.y = Math.sin(Math.PI * 2 / this.leds.length * i) * this.ringRadius + this.ledRadius + this.ringRadius;
        }
        this.timer = window.setInterval(() => {
            const firstLedColor = this.leds[0].color;
            for (let i = 0; i < this.leds.length - 1; i++) {
                const led = this.leds[i];
                const nextLed = this.leds[(i + 1) % this.leds.length];
                led.color = nextLed.color;
            }
            this.leds[this.leds.length - 1].color = firstLedColor;
            this.$forceUpdate();
        }, 50);
        this.$forceUpdate();
    }

});

export default {
    routes: {
        path: '/iro',
        component: component
    },
    component: component
};

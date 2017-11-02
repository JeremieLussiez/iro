import Vue from "vue/dist/vue.common.js";
import "./iro.scss";
import template from "./iro.html";
import Translator from "../../translate/translator";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

function lerp(source, start, target, end, time) {
    return source + (target - source) * (time - start) * (1.0 / (end - start));
}

function lerpColor(source, start, target, end, time) {
    return {
        r: Math.round(lerp(source.r, start, target.r, end, time)),
        g: Math.round(lerp(source.g, start, target.g, end, time)),
        b: Math.round(lerp(source.b, start, target.b, end, time))
    }
}

function htmlColorToRGB(htmlColor) {
    const value = parseInt("0x" + htmlColor.substring(1, 7));
    return {
        r: (value >> 16) & 0xFF,
        g: (value >> 8) & 0xFF,
        b: value & 0xFF
    }
}

function rgbToHTMLColor(rgbColor) {
    return `#${Number(rgbColor.r).toString(16)}${Number(rgbColor.g).toString(16)}${Number(rgbColor.b).toString(16)}`;
}

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

        const rainbow = [
            "#2196f3",
            "#3f51b5",
            "#9c27b0",
            "#ff5722",
            "#ffeb3b",
            "#4baf4f"
        ];

        /*const rainbow = [
            "#e91e63",
            "#ffeb3b",
        ];*/

        let ledIndex = 0;
        const steps = this.leds.length / rainbow.length;
        for (let i = 0; i < rainbow.length - 1; i++) {
            for (let j = 0; j < steps; j++) {
                this.leds[ledIndex].color = rgbToHTMLColor(lerpColor(htmlColorToRGB(rainbow[i]), 0, htmlColorToRGB(rainbow[i + 1]), steps, j));
                ledIndex++;
            }
        }
        for (let j = 0; j < steps; j++) {
            this.leds[ledIndex].color = rgbToHTMLColor(lerpColor(htmlColorToRGB(rainbow[rainbow.length - 1]), 0, htmlColorToRGB(rainbow[0]), steps, j));
            ledIndex++;
        }

        /* for (let i = 0; i < this.leds.length; i++) {
             const led = this.leds[i];
             led.color = "#eeeeee";
         }

         const trailSize = 12;
         for (let i = 0; i <trailSize; i++) {
             this.leds[i].color = rgbToHTMLColor(lerpColor(htmlColorToRGB("#2196f3"), 0, htmlColorToRGB("#eeeeee"), trailSize, i));
         }*/


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

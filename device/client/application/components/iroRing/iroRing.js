import Vue from "vue/dist/vue.common.js";
import "./iroRing.scss";
import template from "./iroRing.html";
import Color from "../../tools/color";

let component = Vue.component("iro-ring", {
    template: template,

    data: () => ({
        time: 0,
        ledRadius: 10,
        ringRadius: 80,
        leds: []
    }),

    methods: {
        ledClick(ledId) {
            this.$emit("ledClicked", ledId);
        },
        resetLeds(leds) {
            console.log("Hello", leds);
            this.leds = leds;
            this.$forceUpdate();
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
        const ringSize = 24;
        for (let i = 0; i < ringSize; i++) {
            this.leds.push({
                color: "#eeeeee",
                x: Math.cos(Math.PI * 2 / ringSize * i) * this.ringRadius + this.ledRadius + this.ringRadius,
                y: Math.sin(Math.PI * 2 / ringSize * i) * this.ringRadius + this.ledRadius + this.ringRadius
            });
        }

        for (let i = 0; i < this.leds.length; i++) {
            const led = this.leds[i];
            led.color = "#eeeeee";
        }

        this.timer = window.setInterval(() => {
            this.$emit("ringUpdate", this.leds);
            this.$forceUpdate();
        }, 50);
        this.$forceUpdate();
    }

});

export default component;

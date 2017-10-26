import Vue from "vue/dist/vue.common.js"
import "./loadingScreenComponent.scss";
import template from "./loadingScreenComponent.html";

import EventRouter from "../../event/eventRouter";

let eventRouter = new EventRouter();

Vue.component("loading-screen", {
    props: [],
    template: template,

    mounted: function () {
        eventRouter.listen("StartLoading", this);
        eventRouter.listen("StopLoading", this);
    },

    data: function () {
        return {
            isLoading: false,
            delay: 250
        }
    },

    //TODO: Loading ownership
    methods: {
        onStartLoading() {
            if (!this.isLoading) {
                this.loadingDelay = window.setTimeout(() => {
                    this.isLoading = true;
                    this.$forceUpdate();
                }, this.delay);
            }
        },
        onStopLoading() {
            window.setTimeout(() => {
                window.clearTimeout(this.loadingDelay);
                this.isLoading = false;
                this.$forceUpdate();
            }, this.delay);
        }
    }
});

import Vue from "vue/dist/vue.common.js"
import "./messagePlayerComponent.scss";
import template from "./messagePlayerComponent.html";

import EventRouter from "../../event/eventRouter";

let eventRouterInstance = new EventRouter();

export default Vue.component("message-player", {

    template: template,

    mounted: function () {
        eventRouterInstance.listen("PlayMessage", this);
    },

    data() {
        return {
            message: ""
        }
    },

    methods: {
        onPlayMessage(message) {
            this.message = message;
            this.$refs.messageHolder.open();
        }
    }

});


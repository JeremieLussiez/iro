import moment from "moment";
import Vue from "vue/dist/vue.common.js";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.css";
import "./components/login/interceptors";

import EventRouter from "./event/eventRouter";

import "./components/loading/loadingScreenComponent";
import "./components/messagePlayer/messagePlayerComponent";
import LoginScreenComponent from "./components/login/loginScreenComponent";
import OverviewComponent from "./components/overview/overviewComponent";

import Translator from "./translate/translator";
import fr from "./labels/fr";
import en from "./labels/en";

import configuration from "./configuration";

let eventRouterInstance = new EventRouter();
let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);
Vue.filter("translate", label => translatorInstance.getTranslatedLabel(label));

Vue.filter("date", date => {
    let format = translatorInstance.getTranslatedLabel("date.format");
    return moment(date).format(format);
});

Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.material.registerTheme("default", {
    primary: "blue",
    accent: "blue",
    warn: "red",
    background: "white"
});

let routes = [];

routes.push(LoginScreenComponent.routes);
routes.push(OverviewComponent.routes);
routes.push({path: "*", redirect: "/login"});

const router = new VueRouter({
    routes
});

Vue.router = router;

let app = new Vue({
    router,
    el: "#iro-app"
});

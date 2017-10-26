import Vue from "vue/dist/vue.common.js";
import "./loginScreenComponent.css";
import template from "./loginScreenComponent.html";
import Translator from "../../translate/translator";
import LoginService from "./loginService";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let loginServiceInstance = new LoginService();

let component = Vue.component("login-screen", {
    props: [],
    template: template,

    data: function () {
        return {
            ssid: "",
            password: "",
            accessPoints: [],
            selectedAccessPoint: ""
        }
    },

    mounted() {
        Vue.http
            .get(`/api/networks`)
            .then(response => {
                console.log(response);
                this.accessPoints = response.body;
            });
    },

    methods: {
        connect() {
            loginServiceInstance.login(this.login, this.password, this.client);
        }
    }

});

export default {
    routes: {
        path: "/login",
        component: component
    },
    component: component
};

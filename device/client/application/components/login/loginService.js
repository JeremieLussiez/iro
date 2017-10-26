//const Vue = () => System.import("vue/dist/vue.common.js").then(module => module.default);
import Vue from "vue/dist/vue.common.js";
import configuration from "../../configuration";
import Translator from "../../translate/translator";
import EventRouter from "../../event/eventRouter";
import fr from "./labels/fr";
import en from "./labels/en";

let translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

let eventRouterInstance = new EventRouter();

let instance = null;

class LoginService {

    constructor() {

        if (instance === null) {
            instance = this;
        }

        return instance;

    }

    login(login, password, client) {
        //Vue.http.headers.common["myHeaderKey"] = client;
        eventRouterInstance.emit("StartLoading");
        this.currentUser = {
            login: login
        };
        return Vue.http.post(
            `${configuration["AUTHENTICATION_URL"]}?login=${login}&password=${password}`
        ).then(
            response => {
                sessionStorage.setItem("authorizationData", JSON.stringify(
                    {
                        token: response.data.guid,
                        login: login,
                        client: client
                    }
                ));
                Vue.router.push("/tagging/dashboard");
                eventRouterInstance.emit("StopLoading");
                return response;
            },
            failure => {
                eventRouterInstance.emit("StopLoading");
                eventRouterInstance.emit("PlayMessage", translatorInstance.getTranslatedLabel("login.screen.denied"));
                return failure;
            }
        );
    }

}

export default LoginService;

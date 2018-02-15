// const Vue = () => System.import('vue/dist/vue.common.js').then(module => module.default);
import Vue from 'vue/dist/vue.common';
import configuration from '../../configuration';
import Translator from '../../translate/translator';
import EventRouter from '../../event/eventRouter';
import fr from './labels/fr';
import en from './labels/en';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

const eventRouterInstance = new EventRouter();

let instance = null;

class LoginService {
  constructor() {
    if (instance === null) {
      instance = this;
    }
    return instance;
  }

  login(login, password, client) {
    // Vue.http.headers.common['myHeaderKey'] = client;
    eventRouterInstance.emit('StartLoading');
    this.currentUser = {
      login,
    };
    return Vue.http.post(`${configuration['AUTHENTICATION.URL']}?login=${login}&password=${password}`)
      .then(
        (response) => {
          sessionStorage.setItem('authorizationData', JSON.stringify({
            token: response.data.guid,
            login,
            client,
          }));
          Vue.router.push('/tagging/dashboard');
          eventRouterInstance.emit('StopLoading');
          return response;
        },
        (failure) => {
          eventRouterInstance.emit('StopLoading');
          eventRouterInstance.emit('PlayMessage', translatorInstance.getTranslatedLabel('login.screen.denied'));
          return failure;
        },
      );
  }
}

export default LoginService;

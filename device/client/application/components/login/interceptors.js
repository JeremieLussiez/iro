import Vue from 'vue/dist/vue.common';
import VueResource from 'vue-resource';
import Translator from '../../translate/translator';
import EventRouter from '../../event/eventRouter';
import fr from './labels/fr';
import en from './labels/en';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

// let loginServiceInstance = new LoginService();

const eventRouterInstance = new EventRouter();

Vue.use(VueResource);
Vue.http.interceptors.push((request, next) => {
  request.headers.set('authorization', 'Bearer 4d598dce-8406-4858-a1f5-fb9b7dc3cae0');
  request.headers.set('accept', 'application/json');

  /*
   if (request.url.split('?')[0].indexOf('/authentication') < 0) {
   let authData = JSON.parse(sessionStorage.getItem('authorizationData'));
   if (authData) {
   request.headers.set('Authorization', `Bearer ${authData.token}`);
   }
   }
   */

  next((response) => {
    if (response.status === 401) {
      Vue.router.push('/login');
      eventRouterInstance.emit('PlayMessage', translatorInstance.getTranslatedLabel('login.screen.expired'));
    }
    if (response.status === 400) {
      eventRouterInstance.emit('PlayMessage', translatorInstance.getTranslatedLabel('login.screen.badRequest'));
    }
  });
});

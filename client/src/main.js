import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import moment from 'moment';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';
import Translator from './tools/translate/translator';
import fr from './labels/fr';
import en from './labels/en';

import './registerServiceWorker';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);
Vue.filter('translate', label => translatorInstance.getTranslatedLabel(label));

Vue.filter('date', (date) => {
  const format = translatorInstance.getTranslatedLabel('date.format');
  return moment(date).format(format);
});

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueResource);
/*
Vue.http.get('http://localhost:3000/api/iros').then((response) => {
  console.log('RESULT', response.body);
}, (error) => {
  console.error('ERROR', error);
});
*/

new Vue({
  router,
  store,
  translator: translatorInstance,
  render: h => h(App),
}).$mount('#app');


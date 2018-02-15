import Vue from 'vue/dist/vue.common';
import './overviewComponent.scss';
import Translator from '../../translate/translator';
import template from './overviewComponent.html';
import fr from './labels/fr';
import en from './labels/en';

const translatorInstance = new Translator();
translatorInstance.addLanguageLabels(fr, en);

const component = Vue.component('jel-overview', {
  props: [],
  template,

  data: () => ({
    nutrition: [
      {
        dessert: 'Frozen yogurt',
        type: 'ice_cream',
        calories: '159',
        fat: '6.0',
        comment: 'Icy',
      },
      {
        dessert: 'Ice cream sandwich',
        type: 'ice_cream',
        calories: '237',
        fat: '9.0',
        comment: 'Super Tasty',
      },
      {
        dessert: 'Eclair',
        type: 'pastry',
        calories: '262',
        fat: '16.0',
        comment: '',
      },
      {
        dessert: 'Cupcake',
        type: 'pastry',
        calories: '305',
        fat: '3.7',
        comment: '',
      },
      {
        dessert: 'Gingerbread',
        type: 'other',
        calories: '356',
        fat: '16.0',
        comment: '',
      },
    ],
  }),

  methods: {
    translate(label) {
      return translatorInstance.getTranslatedLabel(label);
    },
  },

});

export default {
  routes: {
    path: '/overview',
    component,
  },
  component,
};

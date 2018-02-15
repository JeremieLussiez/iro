import Vue from 'vue/dist/vue.common';
import './messagePlayerComponent.scss';
import EventRouter from '../../event/eventRouter';
import template from './messagePlayerComponent.html';

const eventRouterInstance = new EventRouter();

export default Vue.component('message-player', {

  template,

  mounted() {
    eventRouterInstance.listen('PlayMessage', this);
  },

  data() {
    return {
      message: '',
    };
  },

  methods: {
    onPlayMessage(message) {
      this.message = message;
      this.$refs.messageHolder.open();
    },
  },

});


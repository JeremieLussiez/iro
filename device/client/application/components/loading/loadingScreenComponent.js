import Vue from 'vue/dist/vue.common';
import './loadingScreenComponent.scss';
import EventRouter from '../../event/eventRouter';
import template from './loadingScreenComponent.html';

const eventRouter = new EventRouter();

Vue.component('loading-screen', {
  props: [],
  template,

  mounted() {
    eventRouter.listen('StartLoading', this);
    eventRouter.listen('StopLoading', this);
  },

  data() {
    return {
      isLoading: false,
      delay: 250,
    };
  },

  // TODO: Loading ownership
  methods: {
    onStartLoading() {
      if (!this.isLoading) {
        this.loadingDelay = setTimeout(() => {
          this.isLoading = true;
          this.$forceUpdate();
        }, this.delay);
      }
    },
    onStopLoading() {
      setTimeout(() => {
        clearTimeout(this.loadingDelay);
        this.isLoading = false;
        this.$forceUpdate();
      }, this.delay);
    },
  },
});

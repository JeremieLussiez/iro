import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router.js';

Vue.use(Vuex);

export const SET_AUTHENTICATION_TOKEN = 'SET_AUTHENTICATION_TOKEN';
export const AUTHENTICATE_USER = 'authenticateUser';

export const store = new Vuex.Store({
  state: {
    authenticationToken: localStorage.getItem('user-token') || '',
    userData: localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : {}
  },
  getters: {
    authenticationToken: state => state.authenticationToken,
    userData: state => state.userData
  },
  mutations: {
    [SET_AUTHENTICATION_TOKEN](state, data) {
      localStorage.setItem('user-token', data.id);
      localStorage.setItem('user-data', JSON.stringify(data.userData));
      state.authenticationToken = data.id;
      state.userData = data.userData;
    },
  },
  actions: {
    authenticateUser({
      commit,
    }, authenticationData) {
      axios.post('/api/users/login', authenticationData)
        .then(
          (result) => {
            commit(SET_AUTHENTICATION_TOKEN, result.data);
            router.push({
              path: '/home',
              params: {
                mode: 'update',
              },
            });
          },
          (error) => {
            localStorage.removeItem('user-token');
            console.log(error);
          },
      );
    },
  },
});

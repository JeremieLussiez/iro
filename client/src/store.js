import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router.js';

Vue.use(Vuex);

export const SET_AUTHENTICATION_TOKEN = 'SET_AUTHENTICATION_TOKEN';
export const AUTHENTICATE_USER = 'authenticateUser';

export const store = new Vuex.Store({
  state: {
    authenticationToken: '',
  },
  getters: {
    authenticationToken: state => state.authenticationToken,
  },
  mutations: {
    [SET_AUTHENTICATION_TOKEN](state, authenticationToken) {
      state.authenticationToken = authenticationToken;
    },
  },
  actions: {
    authenticateUser({commit}, authenticationData) {
      console.log(email, password);
      axios.post('http://localhost:3000/api/users/login', authenticationData).then(
        (result) => {
          console.log(result);
          commit(SET_AUTHENTICATION_TOKEN, result.data.id);
          router.push({path: '/home', params: {mode: 'update'}});
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
});

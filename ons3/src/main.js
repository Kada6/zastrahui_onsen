import Vue from 'vue'
import App from './App.vue'
//import router from './router'
import Vuex from 'vuex'
//import Vuetify from 'vuetify'
import axios from 'axios'
import b64toa from 'btoa-lite'
import LocalForage from 'localforage'
import 'localforage-getitems'
import 'localforage-setitems'
//import 'babel-polyfill'
import VueOffline from 'vue-offline'
import VueOnsen from 'vue-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
//import '../static/css/theme.css'
import VeeValidate, { Validator } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'

Validator.localize('ru', ru)
Vue.use(VueOnsen)
var _ = require('lodash')
Vue.use(VueOffline)
Vue.use(Vuex)
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  },
  locale: 'ru',
});

const api = axios.create(
{
  baseURL: `https://api.xn--80aatk7afhkr.com:443/v1`
})
LocalForage.config(
{
  driver: LocalForage.LOCALSTORAGE,
  name: 'pwa',
  version: 1.0,
  storeName: 'pwa_store'
});

Vue.prototype.$api = api
Vue.config.productionTip = false

const persistPlugin = store =>
{
  store.subscribe((mutations, state) =>
  {
    LocalForage.setItems(state)
  })
}
var initialState = {
  authorized: false,
  is_calculating: false,
  loadings: 0,
  menu_toggle: false,
  pageStack: [],
  token: '',
  osago:
  {
    id: '',
    region_id: '',
    power: '',
    is_multidrive: false,
    rating: [],
    drivers: [
    {
      first_name: '',
      second_name: '',
      last_name: '',
      birth_date: '',
      doc_number: '',
      doc_serial: '',
      experience: ''
    }],
    owner:
    {
      first_name: '',
      second_name: '',
      last_name: '',
      birth_date: '',
      doc_number: '',
      doc_serial: '',
      plate_number: ''
    }
  },
  kasko:
  {
    id: '',
    power: '',
    capacity: '',
    car_mark_id: '',
    car_model_id: '',
    car_year: '',
    gearbox_type: '',
    car_price: '',
    is_credit: false,
    has_mileage: true,
    is_guarantee: true,
    drivers: [
    {
      first_name: '',
      second_name: '',
      last_name: '',
      birth_date: '',
      doc_number: '',
      doc_serial: '',
      experience: '',
      male: ''
    }]
  },
  realty:
  {
    id: '',
    age: '',
    price: '',
    is_working: false
  },
  health:
  {
    id: '',
    price: '',
    is_rented: false,
    region_id: ''
  },
  marks: [],
  models: [],
  regions: [],
  property_regions: []
}
async function initializeApp()
{

  const savedState = await LocalForage.getItems()
  const mergedStates = _.merge(
  {}, initialState, savedState)
  const store = new Vuex.Store(
  {
    plugins: [persistPlugin],
    state: mergedStates,
    getters:
    {
      Authorized: state =>
      {
        return state.authorized;
      },
      isCalculating: state =>
      {
        return state.is_calculating;
      }
    },
    mutations:
    {
      pushPage(state, page) {
        state.pageStack = [
          ...state.pageStack,
          ...(page instanceof Array ? page : [page])
        ];
      },
      popPage(state) {
        if (state.pageStack.length > 1) {
          state.pageStack.pop();
        }
      },
      replacePage(state, page) {
        state.pageStack.pop();
        state.pageStack.push(page);
      },
      resetPageStack(state) {
        state.pageStack = [state.pageStack[0]];
      },
      unauthorize(state)
      {
        delete(api.defaults.headers.common['Authorization'])
        state.authorized = false
      },
      authorize(state, token)
      {
        api.defaults.headers.common['Authorization'] = 'Basic ' + b64toa(token + ':')
        state.authorized = true
      },
      showCalculating(state)
      {
        state.is_calculating = true
      },
      hideCalculating(state)
      {
        state.is_calculating = false
      },
      loading(state)
      {
        state.loadings++
      },
      unloading(state)
      {
        state.loadings--
      },
    }
  })
  api.interceptors.request.use(
    (config) =>
    {
      store.commit('loading')
      return config
    },
    (error) =>
    {
      return Promise.reject(error)
    }
  )
  api.interceptors.response.use(
    (response) =>
    {
      store.commit('unloading')
      return response
    },
    (error) =>
    {
      store.commit('unloading')
      if (error.response.status === 401)
      {
        store.commit('unauthorize')
      }
      return Promise.reject(error)
    }
  )

  new Vue(
  {
    store,
  //  router,
    render: h => h(App)
  }).$mount('#app')
}
initializeApp()

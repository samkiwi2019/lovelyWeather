import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  CityList: () => import('../../components/CityList.vue' /* webpackChunkName: "components/city-list" */).then(c => wrapFunctional(c.default || c)),
  CountryList: () => import('../../components/CountryList.vue' /* webpackChunkName: "components/country-list" */).then(c => wrapFunctional(c.default || c)),
  ScrollWrapper: () => import('../../components/ScrollWrapper.vue' /* webpackChunkName: "components/scroll-wrapper" */).then(c => wrapFunctional(c.default || c)),
  WeatherConditionList: () => import('../../components/WeatherConditionList.vue' /* webpackChunkName: "components/weather-condition-list" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}

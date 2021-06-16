import { wrapFunctional } from './utils'

export { default as CityList } from '../../components/CityList.vue'
export { default as CountryList } from '../../components/CountryList.vue'
export { default as ScrollWrapper } from '../../components/ScrollWrapper.vue'
export { default as WeatherConditionList } from '../../components/WeatherConditionList.vue'

export const LazyCityList = import('../../components/CityList.vue' /* webpackChunkName: "components/city-list" */).then(c => wrapFunctional(c.default || c))
export const LazyCountryList = import('../../components/CountryList.vue' /* webpackChunkName: "components/country-list" */).then(c => wrapFunctional(c.default || c))
export const LazyScrollWrapper = import('../../components/ScrollWrapper.vue' /* webpackChunkName: "components/scroll-wrapper" */).then(c => wrapFunctional(c.default || c))
export const LazyWeatherConditionList = import('../../components/WeatherConditionList.vue' /* webpackChunkName: "components/weather-condition-list" */).then(c => wrapFunctional(c.default || c))

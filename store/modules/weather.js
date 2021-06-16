import * as R from 'ramda';
import { getWeatherItems } from '~/api/weather';
const state = {
    cities: [],
    countries: [],
    weatherTypes: [],
    sortBy: 'alphabet', // alphabet || temperature || updatedAt
};

const getters = {};

const actions = {
    /**
     * @param {Array} payload  cities with weather info
     */
    convertData({ commit }, payload) {
        // sorted by A-Z and removed items that have no weather condition
        const cities = payload
            .filter(x => x._weatherCondition && x._weatherTemp)
            .sort((a, b) => a._name - b._name);

        // classified by country id
        const countries = R.uniqBy(
            x => x._countryID,
            cities.map(x => x._country).sort((a, b) => a._name - b._name)
        );
        // classified by weather condition and removed invalid value
        const weatherTypes = [
            ...new Set(cities.map(x => x._weatherCondition).sort((a, b) => a - b)),
        ];

        commit('SET_CITIES', cities);
        commit('SET_COUNTRIES', countries);
        commit('SET_WEATHERTYPES', weatherTypes);
    },

    // The function might have been called in both server side and client side.
    // server side  ==> init in nuxtServerInit function.
    // client side  ==> update when users pull down the list.
    async getCitiesWeather({ dispatch }) {
        try {
            const {
                data: { data },
            } = await getWeatherItems(); // this endpoind doesn't configure CORS policy, So, in the client, to request the api will get an CORS error.
            if (data.length) {
                dispatch('convertData', data);
            }
        } catch (error) {
            console.log('getCitiesWeather error ==>', error);
        }
    },
};

const mutations = {
    SET_CITIES(state, payload) {
        state.cities = payload;
    },
    SET_COUNTRIES(state, payload) {
        state.countries = payload;
    },
    SET_WEATHERTYPES(state, payload) {
        state.weatherTypes = payload;
    },
    SET_SORTBY(state, payload) {
        state.sortBy = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

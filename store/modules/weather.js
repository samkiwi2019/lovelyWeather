import * as R from 'ramda';
import { getWeatherItems } from '~/api/weather';
const state = {
    cities: [],
    countries: [],
    weatherTypes: [],
    sortBy: 'alphabet', // alphabet || temperature || updatedAt
    filterBy: {
        type: '', // countryId || weatherTypes
        value: '', // id || name
    },
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
            cities
                .map(x => ({
                    ...x._country,
                    count: cities.filter(item => item._country._countryID === x._country._countryID) // get number of cities for curr country
                        .length,
                }))
                .sort((a, b) => a._name - b._name)
        );
        // classified by weather condition and removed invalid value
        const weatherTypes = R.uniqBy(
            x => x.condition,
            cities
                .map(x => ({
                    condition: x._weatherCondition,
                    count: cities.filter(item => item._weatherCondition === x._weatherCondition)
                        .length,
                }))
                .sort((a, b) => a.condition - b.condition)
        );

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
            } = await getWeatherItems(); // this endpoint doesn't configure CORS policy, So, in the client, to request the api will get an CORS error.
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
    SET_FILTERBY(state, payload) {
        state.filterBy = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

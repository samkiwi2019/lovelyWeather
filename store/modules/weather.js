import * as R from 'ramda';

const state = {
    cities: [],
    countries: [],
    weatherTypes: [],
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

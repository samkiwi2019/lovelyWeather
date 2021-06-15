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
        // sorted by A-Z
        const cities = payload.sort((a, b) => a._name - b._name);

        // classified by country id
        const countries = R.uniqBy(
            x => x._countryID,
            payload.map(x => x._country).sort((a, b) => a._name - b._name)
        );
        // classified by weather condition and removed invalid value
        const weatherTypes = [
            ...new Set(
                payload
                    .map(x => x._weatherCondition)
                    .filter(x => !!x)
                    .sort((a, b) => a - b)
            ),
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

import Vuex from 'vuex';
import weather from './modules/weather';
import { getWeatherItems } from '~/api/weather';

const createStore = () => {
    return new Vuex.Store({
        modules: {
            weather,
        },
        state: {},
        mutations: {},
        actions: {
            // only be called in server side with 2 situations
            // 1. first screen
            // 2. users refreshed their browser.
            async nuxtServerInit({ dispatch }) {
                const {
                    data: { data },
                } = await getWeatherItems();
                dispatch('weather/convertData', data);
            },
        },
    });
};
export default createStore;

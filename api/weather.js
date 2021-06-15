import axios from './api.request';

export const getWeatherItems = () => {
    return axios.request({
        url: '/venues/weather.json',
        method: 'get',
    });
};

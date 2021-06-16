<template>
    <div class="container-scroll-standard">
        <ScrollWrapper :pull-down-handle="getCitiesWeather">
            <WeatherConditionList :items="weatherTypes" :handle-actions="searchByWeatherTypes" />
        </ScrollWrapper>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ScrollWrapper from '~/components/ScrollWrapper.vue';
import WeatherConditionList from '~/components/WeatherConditionList.vue';
export default {
    name: 'weather-condition',
    components: { ScrollWrapper, WeatherConditionList },
    computed: {
        ...mapState({
            weatherTypes: state => state.weather.weatherTypes,
        }),
    },
    methods: {
        ...mapMutations({
            setFilterBy: 'weather/SET_FILTERBY',
        }),
        ...mapActions({
            getCitiesWeather: 'weather/getCitiesWeather',
        }),
        searchByWeatherTypes(weatherType) {
            this.setFilterBy({
                type: 'weatherTypes',
                value: weatherType,
            });
            this.$router.push('/');
        },
    },
};
</script>
<style lang="scss" scoped>
.container-scroll-standard {
    height: calc(100vh - 104px); //header 48   footer 56
}
</style>

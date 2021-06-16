<template>
    <div class="container-scroll-standard">
        <ScrollWrapper :pull-down-handle="getCitiesWeather">
            <CountryList :items="countries" :handle-actions="searchByCountry" />
        </ScrollWrapper>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ScrollWrapper from '~/components/ScrollWrapper.vue';
import CountryList from '~/components/CountryList.vue';
export default {
    name: 'country',
    components: { ScrollWrapper, CountryList },
    computed: {
        ...mapState({
            countries: state => state.weather.countries,
        }),
    },
    methods: {
        ...mapMutations({
            setFilterBy: 'weather/SET_FILTERBY',
        }),
        ...mapActions({
            getCitiesWeather: 'weather/getCitiesWeather',
        }),
        searchByCountry(countryId) {
            this.setFilterBy({
                type: 'countryId',
                value: countryId,
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

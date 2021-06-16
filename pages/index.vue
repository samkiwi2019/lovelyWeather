<template>
    <div>
        <v-tabs center-active @change="handleTabs">
            <v-tab>A-Z</v-tab>
            <v-tab>Temperature</v-tab>
            <v-tab>Last updated</v-tab>
        </v-tabs>
        <div class="container-scroll-with-tabs">
            <ScrollWrapper :pull-down-handle="getCitiesWeather">
                <CityList :items="cities" :sort-by="sortBy" :filter-by="filterBy" />
            </ScrollWrapper>
        </div>
    </div>
</template>

<script>
import ScrollWrapper from '~/components/ScrollWrapper.vue';
import CityList from '~/components/CityList.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    components: {
        CityList,
        ScrollWrapper,
    },
    computed: {
        ...mapState({
            cities: state => state.weather.cities,
            sortBy: state => state.weather.sortBy,
            filterBy: state => state.weather.filterBy,
        }),
    },
    methods: {
        ...mapMutations({
            setSortBy: 'weather/SET_SORTBY',
        }),
        ...mapActions({
            getCitiesWeather: 'weather/getCitiesWeather',
        }),
        handleTabs(tab) {
            // 0 alphabet 1 temperature  2 updatedAt
            const value = tab === 1 ? 'temperature' : tab === 2 ? 'updatedAt' : 'alphabet';
            this.setSortBy(value);
        },
    },
};
</script>
<style lang="scss" scoped>
.container-scroll-with-tabs {
    height: calc(100vh - 152px); // header + footer + tabs
}
</style>

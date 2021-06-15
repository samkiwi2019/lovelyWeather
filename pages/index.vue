<template>
    <div>
        <v-tabs center-active @change="handleTabs">
            <v-tab>A-Z</v-tab>
            <v-tab>Temperature</v-tab>
            <v-tab>Last updated</v-tab>
        </v-tabs>
        <div class="container-scroll-with-tabs">
            <ScrollWrapper>
                <CityList :items="cities" :sort-by="sortBy" />
            </ScrollWrapper>
        </div>
    </div>
</template>

<script>
import ScrollWrapper from '~/components/ScrollWrapper.vue';
import CityList from '~/components/CityList.vue';
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            mescrollDown: {
                callback: mescroll => {
                    setTimeout(() => {
                        mescroll.endSuccess();
                    }, 2000);
                },
                textInOffset: 'Pull down to refresh',
                textLoading: 'Refreshing...',
                textOutOffset: 'Update after release',
            },
        };
    },
    components: {
        CityList,
        ScrollWrapper,
    },
    computed: {
        ...mapState({
            cities: state => state.weather.cities,
            sortBy: state => state.weather.sortBy,
        }),
    },
    methods: {
        ...mapMutations({
            setSortBy: 'weather/SET_SORTBY',
        }),
        handleTabs(tab) {
            // 0 alphabet 1 temperature  2 updatedAt
            const value = tab === 1 ? 'temperature' : tab === 2 ? 'updatedAt' : 'alphabet';
            this.setSortBy(value);
        },
    },
    // server side request
    // async asyncData({ app }) {
    //     const { data } = await app.$axios.$get(
    //         'http://dnu5embx6omws.cloudfront.net/venues/weather.json'
    //     );
    //     return { items: data };
    // },
};
</script>
<style lang="scss" scoped>
.container-scroll-with-tabs {
    height: calc(100vh - 152px); // header + footer + tabs
}
</style>

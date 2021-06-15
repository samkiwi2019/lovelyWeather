<template>
    <div>
        <v-tabs background-color="deep-purple accent-4" center-active dark>
            <v-tab>A-Z</v-tab>
            <v-tab>Temperature</v-tab>
            <v-tab>Last updated</v-tab>
        </v-tabs>
        <mescroll-vue ref="mescroll" :down="mescrollDown">
            <List />
        </mescroll-vue>
    </div>
</template>

<script>
import List from '~/components/List.vue';
import MescrollVue from 'mescroll.js/mescroll.vue';
import { mapState } from 'vuex';
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
        List,
        MescrollVue,
    },
    computed: {
        ...mapState({
            test: state => state.weather.items,
        }),
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

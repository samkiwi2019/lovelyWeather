<template>
    <div class="container-scroll-standard">
        <ScrollWrapper>
            <CountryList :items="cities" :sort-by="sortBy" />
        </ScrollWrapper>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import ScrollWrapper from '~/components/ScrollWrapper.vue';
import CountryList from '~/components/CountryList.vue';
export default {
    name: 'country',
    components: { ScrollWrapper, CountryList },
    computed: {
        ...mapState({
            cities: state => state.weather.cities,
            sortBy: state => state.weather.sortBy,
        }),
    },
};
</script>
<style lang="scss" scoped>
.container-scroll-standard {
    height: calc(100vh - 104px); //header 48   footer 56
}
</style>

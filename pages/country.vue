<template>
    <div>Country</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'country',
    computed: {
        ...mapState({
            items: state => state.weather.items,
        }),
    },
};
</script>

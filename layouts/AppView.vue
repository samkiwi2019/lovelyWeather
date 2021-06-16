<template>
    <v-main>
        <div class="main-container">
            <nuxt />
        </div>
        <v-bottom-navigation :value="value" color="primary" dark fixed>
            <v-btn to="/country" nuxt value="/country" color="#2e2e2e">
                <span>Filter By Country </span>
                <v-icon>mdi-map-search</v-icon>
            </v-btn>
            <v-btn to="/" nuxt value="/" color="#2e2e2e">
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn to="/weatherCondition" nuxt value="/weatherCondition" color="#2e2e2e">
                <span>Filter By Weather</span>
                <v-icon>mdi-weather-windy-variant</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-main>
</template>

<script>
export default {
    name: 'AppView',
    data: () => ({ value: '/' }),
};
</script>
<style lang="scss">
.main-container {
    padding-top: 48px;
    padding-bottom: 52px;
    min-height: calc(100vh - 116px); // header 64px  footer 52px
}
</style>

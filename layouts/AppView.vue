<template>
    <v-main>
        <div class="main-container">
            <nuxt />
        </div>
        <v-bottom-navigation :value="value" color="primary" fixed>
            <v-btn to="/country" nuxt value="/country">
                <span>Filter By Country </span>
                <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn to="/" nuxt value="/">
                <span>Home</span>
                <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn to="/weatherCondition" nuxt value="/weatherCondition">
                <span>Filter By Weather</span>
                <v-icon>mdi-heart</v-icon>
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

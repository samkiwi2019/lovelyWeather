<template>
    <v-app dark>
        <app-bar />
        <app-view />
    </v-app>
</template>

<script>
export default {
    name: 'default-layout',
    components: {
        AppBar: () => import('./AppBar'),
        AppView: () => import('./AppView'),
    },
};
</script>

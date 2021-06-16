<template>
    <v-card max-width="1024" class="mx-auto">
        <v-container>
            <v-row dense>
                <v-col v-for="item in items" :key="item" cols="12">
                    <v-card color="#4CAF50" dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div class="ml-5">
                                <v-card-title class="text-h5" v-text="item"></v-card-title>
                                <v-card-actions class="mt-10 ml-2">
                                    <v-btn outlined @click="handleActions(item)"
                                        ><span>see all cities</span></v-btn
                                    >
                                </v-card-actions>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
export default {
    name: 'country-list',
    props: {
        items: {
            required: true,
            type: Array,
        },
        handleActions: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

<template>
    <v-card max-width="1024" class="mx-auto">
        <v-container>
            <v-row dense>
                <v-col v-for="item in items" :key="item._countryID" cols="12">
                    <v-card color="#4CAF50" dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                    class="text-h6 text-no-wrap"
                                    v-text="item._name"
                                ></v-card-title>
                                <v-card-actions class="mt-10 ml-2">
                                    <v-btn outlined @click="handleActions(item._countryID)"
                                        ><span>see all cities</span></v-btn
                                    >
                                </v-card-actions>
                            </div>

                            <v-avatar class="ma-3" size="140" tile>
                                <span
                                    class="white--text text-h3 font-weight-bold"
                                    v-text="item.count"
                                ></span
                                ><span class="white--text ml-2 text-h6">Cities</span>
                            </v-avatar>
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

<template>
    <v-card max-width="1024" class="mx-auto">
        <v-container>
            <v-row dense>
                <v-col v-for="item in items" :key="item._countryID" cols="12">
                    <v-card :color="color(item._countryID)" dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div class="ml-5">
                                <v-card-title class="text-h5" v-text="item._name"></v-card-title>
                                <v-card-actions class="mt-10 ml-2">
                                    <v-btn outlined @click="handleActions(item._countryID)"
                                        ><span>see all cities</span></v-btn
                                    >
                                </v-card-actions>
                            </div>

                            <v-avatar class="ma-3" size="160" tile>
                                <span
                                    class="white--text text-h3 font-weight-bold"
                                    v-text="item._countryID"
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
import * as R from 'ramda';

export default {
    name: 'country-list',
    props: {
        items: {
            required: true,
            type: Array,
        },
        sortBy: {
            required: true,
            type: String,
        },
        handleActions: {
            type: Function,
            default: () => {},
        },
    },
    computed: {
        sortedItems() {
            const items = R.clone(this.items);
            // alphabet || temperature || updatedAt
            if (this.sortBy === 'temperature') {
                return items.sort((a, b) => a._weatherTemp - b._weatherTemp);
            }
            if (this.sortBy === 'updatedAt') {
                return items.sort((a, b) => b._weatherLastUpdated - a._weatherLastUpdated);
            }

            // alphabet
            return items;
        },
    },
    methods: {
        color(temperature) {
            if (+temperature < 10) {
                return '#1F7087';
            }
            if (+temperature >= 10 && +temperature < 20) {
                return '#4CAF50';
            }
            if (+temperature >= 20 && +temperature < 25) {
                return '#FF9800';
            }

            // >= 25
            return '#952175';
        },
        formatDate(date) {
            const time = new Date(date * 1000);
            return `${time.toLocaleDateString()}  ${time.toLocaleTimeString()}`;
        },
    },
};
</script>

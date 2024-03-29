<template>
    <v-card max-width="1024" class="mx-auto">
        <v-container>
            <v-row dense>
                <v-col v-for="item in filteredItems" :key="item._venueID" cols="12">
                    <v-card :color="color(item._weatherTemp)" dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                    class="text-h5 text-no-wrap"
                                    v-text="item._name"
                                ></v-card-title>

                                <v-card-subtitle class="d-flex flex-column">
                                    <span v-text="item._weatherCondition"></span>
                                    <span v-text="formatDate(item._weatherLastUpdated)"></span
                                ></v-card-subtitle>

                                <v-card-actions>
                                    <v-btn text><span v-text="item._country._name"></span></v-btn>
                                </v-card-actions>
                            </div>

                            <v-avatar class="ma-3" size="125" tile>
                                <span
                                    class="white--text text-h2 font-weight-bold"
                                    v-text="item._weatherTemp"
                                ></span
                                ><span class="white--text text-h5 mt-5 ml-2">℃</span>
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
    name: 'city-list',
    props: {
        items: {
            required: true,
            type: Array,
        },
        sortBy: {
            required: true,
            type: String,
        },
        filterBy: {
            required: true,
            type: Object,
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
        // based on sorted items.
        filteredItems() {
            if (R.isEmpty(this.filterBy.value)) return this.sortedItems;
            const items = R.clone(this.sortedItems);
            let func = x => x;
            if (this.filterBy.type === 'countryId') {
                func = x => x._country._countryID === this.filterBy.value;
            }
            if (this.filterBy.type === 'weatherTypes') {
                func = x => x._weatherCondition === this.filterBy.value;
            }
            return items.filter(func);
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

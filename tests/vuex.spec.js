import constants from '~/tests/constants';
import * as R from 'ramda';

describe('store/weather', () => {
    let NuxtStore;
    let store;

    beforeAll(async () => {
        const storePath = `${constants.buildDirRootPath}/store.js`;
        NuxtStore = await import(storePath);
    });

    beforeEach(async () => {
        store = await NuxtStore.createStore();
    });

    describe('getters', () => {
        let cities, sortBy, filterBy;

        beforeEach(() => {
            cities = store.getters['weather/cities'];
            sortBy = store.getters['weather/sortBy'];
            filterBy = store.getters['weather/filterBy'];
        });

        test('getters are valid', () => {
            expect(R.is(Array, cities)).toBe(true);
            expect(R.is(String, sortBy)).toBe(true);
            expect(R.is(Object, cities)).toBe(true);
        });
    });
});

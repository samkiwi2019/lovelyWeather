import constants from '~/tests/constants';
const { Nuxt } = require('nuxt');
const nuxtConfig = require('../nuxt.config.js');

let nuxt = null;

// Init Nuxt.js and create a server listening on localhost:4000
beforeAll(async () => {
    nuxt = new Nuxt({ ...nuxtConfig, buildDir: constants.buildDir });

    await nuxt.server.listen(constants.port, 'localhost');
}, 300000);

// Example of testing only generated html
describe('GET /', () => {
    test('Route / exits and render HTML', async () => {
        const { html } = await nuxt.server.renderRoute('/', {});

        expect(html).toContain('weather');
    });
});

// Close server and ask nuxt to stop listening to file changes
afterAll(() => {
    nuxt.close();
});

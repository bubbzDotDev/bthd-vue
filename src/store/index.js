import { createStore } from 'vuex'

import dataModule from './modules/data/index.js'
import authModule from './modules/auth/index.js'

const store = createStore({
    modules: {
        data: dataModule,
        auth: authModule
    }
});

export default store;
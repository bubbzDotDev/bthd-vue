import { createStore } from 'vuex'

import dataModule from './modules/data/index.js'
import authModule from './modules/auth/index.js'
import usersModule from './modules/users/index.js'

const store = createStore({
    modules: {
        data: dataModule,
        auth: authModule,
        users: usersModule
    }
});

export default store;
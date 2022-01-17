import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ClansDb from './firebase/clans-db.js'
import LeadershipDb from './firebase/leadership-db.js'

import BaseCard from './components/ui/BaseCard.vue'
import BaseHeader from './components/ui/BaseHeader.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseLoader from './components/ui/BaseLoader.vue'
import BaseButton from './components/ui/BaseButton.vue'

const app = createApp(App);

const clansDb = new ClansDb();
clansDb.setListener();

const leadershipDb = new LeadershipDb();
leadershipDb.setListener();

app.use(store);
app.use(router);

app.component('base-card', BaseCard);
app.component('basecard-header', BaseHeader);
app.component('base-dialog', BaseDialog);
app.component('base-loader', BaseLoader);
app.component('base-button', BaseButton);

app.mount('#app');

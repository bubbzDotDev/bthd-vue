import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import firebase from 'firebase'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseCardHeader from '@/components/ui/BaseCardHeader.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "bthd-13c1e.firebaseapp.com",
  databaseURL: "https://bthd-13c1e-default-rtdb.firebaseio.com",
  projectId: "bthd-13c1e",
  storageBucket: "bthd-13c1e.appspot.com",
  messagingSenderId: "205527413041",
  appId: "1:205527413041:web:a78d5be516c837e6934010",
  measurementId: "G-QG6V5FDWTE"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-card', BaseCard);
app.component('basecard-header', BaseCardHeader);
app.component('base-dialog', BaseDialog);
app.component('base-loader', BaseLoader);
app.component('base-button', BaseButton);

app.mount('#app');

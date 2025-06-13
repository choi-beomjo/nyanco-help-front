import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.min.css';

createApp(App).use(router).mount('#app')
//use(vuetify)

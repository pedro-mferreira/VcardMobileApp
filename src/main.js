import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
//import 'bootstrap/dist/css/bootstrap.min.css'
import Toaster from "@meforma/vue-toaster"
import axios from 'axios'
import { IonicVue } from '@ionic/vue';

import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';


let toastOptions = {
  position: 'bottom',
  timeout: 3000,
  pauseOnHover: true
 }

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(Toaster, toastOptions).use(BootstrapIcon);


router.isReady().then(() => {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api"
  app.config.globalProperties.$axios = axios
  app.mount('#app');
});

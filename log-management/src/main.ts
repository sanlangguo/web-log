import { createApp } from 'vue'
import routers from '@/routers'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
const app = createApp(App);
app.use(routers);
app.use(ElementPlus)
app.mount('#app');

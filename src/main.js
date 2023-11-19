import { createApp } from 'vue'
import './style.css'
//import App from './Tabla.vue'
//import App from './components/Barra_busqueda.vue'
//import App from './components/Caja_persona.vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

import { createRouter, createWebHistory } from 'vue-router'
import Tabla from './Tabla.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/tabla', component: Tabla },
        { path: '/app', component: App }
    ]
})
const app = createApp(App);
app.component('v-select', vSelect);
app.use(router).mount('#app');
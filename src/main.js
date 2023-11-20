import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Formulario from './components/Formulario.vue'
import Inicio from './components/Inicio.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import "vue-select/dist/vue-select.css";


import { createRouter, createWebHistory } from 'vue-router'
import Tabla from './Tabla.vue';

const routes = [
    { path: '/', component: Inicio },
    { path: '/tabla', component: Tabla },
    { path: '/formulario', component: Formulario }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
const app = createApp(App);
app.use(router).mount('#app');
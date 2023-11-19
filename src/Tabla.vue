<script>
import Barra_busqueda from './components/Barra_busqueda.vue';
import ComponentePer from './components/ComponentePer.vue';
import componenteDetProd from './components/componentedetprod.vue';
import componenteProducto from './components/componenteProducto.vue';
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const pruebas = ref([])
        onMounted(async () => {
            const response = await fetch('http://localhost:3000/api/tipopersona');
            pruebas.value = await response.json();
        })
        return {
            pruebas
        }
    },
    data() {
        return {
            personas: [],
            tipoPersona: [],
            productos: [],
            tipoFactura: '',
            persona: [],
            listaProd: [],

        };
    },
    methods: {
        evaluarFactura() {
            if (cargo == 'auxiliar de compras') {
                this.tipoFactura = 'CO'
            } else if (cargo == 'gerente de compras') {
                this.activacion = 'DC'
            } else if (cargo == 'representante de ventas') {
                this.activacion = 'DV'
            } else if (cargo == 'vendedor') {
                this.activacion = 'VE'
            }
        },
        async traerTipoPersona() {
            const response = await fetch('http://localhost:3000/api/tipopersona');
            const data = await response.json();
            console.log(data);
            this.tipoPersona = data
        },
        async traerProducto(datos) {
            const response = await fetch(`http://localhost:3000/api/productos/${datos}`);
            try {
                const data = await response.json();
                this.productos.push(data)
                this.listaProd.push(datos)

            } catch (error) {

                window.alert('El producto no existe');

            }
        },
        traerPersona(datos){
            this.persona = datos
            console.log(this.persona[0])
        },
        cantidadProd(){
            console.log(this.$refs.prod0.$props.productos)
        }
    },
    components: {
        ComponentePer,
        Barra_busqueda,
        componenteDetProd,
        componenteProducto
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center">Busqueda</h1>
                <h4 class="text-center">por </h4>
                <Barra_busqueda :tipoPersonas="pruebas" @datosPersona="traerPersona"/>
            </div>

            <div class="col-6">
                <componenteDetProd @Codigo="traerProducto" />
                <p>los datos recibidos son: {{ productos }}</p>

            </div>

            <div class="col-6 d-flex justify-content-center align-items-center bg-success p-0">
                <button type="button" class="btn btn-primary" @click="cantidadProd()">Total</button>
            </div>

            <div class="col-12 overflow-auto" style="max-height: 700px;">
                <div class="col-12" v-for="(producto, index) in productos">
                    <componenteProducto :productos="producto" :label="labelComp" :key="index" :ref="`prod${index}`"/>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style></style>
  

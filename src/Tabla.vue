<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Barra_busqueda from './components/Barra_busqueda.vue';
import ComponentePer from './components/ComponentePer.vue';
import componenteDetProd from './components/componenteDetProd.vue';
import componenteProducto from './components/componenteProducto.vue';
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const pruebas = ref([])
        onMounted(async () => {
            const response = await fetch('http://localhost:3000/api/tipopersona');
            pruebas.value = await response.json()
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
            contador: 0,
            tabla: true,
            cargo: JSON.parse(localStorage.getItem('empleado'))[0][1],
            lisCant: []
        };
    },
    methods: {
        evaluarFactura() {
            this.cargo = JSON.parse(localStorage.getItem('empleado'))[0][1]
            if (this.cargo == 'auxiliar de compras') {
                this.tipoFactura = 'CO'
            } else if (this.cargo == 'Gerente de compras') {
                this.tipoFactura = 'DC'
            } else if (this.cargo == 'Representante de ventas') {
                this.tipoFactura = 'DV'
            } else if (this.cargo == 'Vendedor') {
                this.tipoFactura = 'VE'
            }
        }, async traerTipoPersona() {
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
        traerPersona(datos) {
            this.persona = datos

        },
        cantidadProd(datos) {
            this.lisCant[datos[0]] = datos[1]
            console.log(this.lisCant[0])
        },
        async crearFactura() {
            this.evaluarFactura()
            const data = {
                tipoFac: this.tipoFactura,
                tipoPersona: this.persona[0][1],
                tipoDoc: this.persona[0][2],
                nDocumento: this.persona[0][3],
                codEmpleado: JSON.parse(localStorage.getItem('empleado'))[0][0],
                productos: this.listaProd,
                cantidades: this.lisCant

            };
            const jsonData = JSON.stringify(data);
            const response = await fetch("http://localhost:3000/api/facturas",
                {
                    method: "POST",
                    body: jsonData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            const blob = await response.blob();
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga         
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'documento.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    },
    components: {
        ComponentePer,
        Barra_busqueda,
        componenteDetProd,
        componenteProducto
    }
};
</script>
<template>
    <div class="bg-white">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center">{{ this.cargo }}</h1>
                <Barra_busqueda :tipoPersonas="pruebas" @datosPersona="traerPersona" />
            </div>

            <div class="col-6">
                <componenteDetProd @Codigo="traerProducto" />

            </div>

            <div class="col-6 d-flex justify-content-center align-items-center bg-success p-0">
                <button type="button" class="btn btn-primary" @click="crearFactura()">Total</button>
            </div>

            <div class="col-12 overflow-auto" style="max-height: 700px;">
                <div class="col-12" v-for="(producto, index) in productos">
                    <componenteProducto :productos="producto" :label="labelComp" :index="index"
                        @datoCantidad="cantidadProd" />
                </div>
            </div>
        </div>

    </div>
</template>
<style></style>

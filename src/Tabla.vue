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
            tipoPersona: localStorage.getItem('tipoPersona'),
            productos: [],
            tipoFactura: localStorage.getItem('tipoFactura'),
            persona: [],
            listaProd: [],
            contador: 0,
            tabla: true,
            cargo: JSON.parse(localStorage.getItem('empleado'))[0][1],
            lisCant: [],
            productoDiv: false,
            ref: ''
        };
    },
    methods: {
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
            this.persona = datos.personas
            this.productoDiv = datos.activacion
            console.log(this.persona)

        },
        cantidadProd(datos) {
            this.lisCant[datos[0]] = datos[1]
            console.log(this.lisCant[0])
        },
        async crearFactura() {
            let data
            if (this.tipoFactura === 'DV' || this.tipoFactura === 'DC') {
                let tipoRef = (this.tipoFactura === 'DV') ? 'VE' : 'CO'
                data = {
                    tipoFac: this.tipoFactura,
                    tipoPersona: this.persona[0][1],
                    tipoDoc: this.persona[0][2],
                    nDocumento: this.persona[0][3],
                    codEmpleado: JSON.parse(localStorage.getItem('empleado'))[0][0],
                    productos: this.listaProd,
                    cantidades: this.lisCant,
                    nFacturaRef: this.ref,
                    tipoFacRef: tipoRef
                }
            } else {
                data = {
                    tipoFac: this.tipoFactura,
                    tipoPersona: this.persona[0][1],
                    tipoDoc: this.persona[0][2],
                    nDocumento: this.persona[0][3],
                    codEmpleado: JSON.parse(localStorage.getItem('empleado'))[0][0],
                    productos: this.listaProd,
                    cantidades: this.lisCant
                }
            }
            const jsonData = JSON.stringify(data);
            console.log(jsonData)
            const response = await fetch("http://localhost:3000/api/facturas",
                {
                    method: "POST",
                    body: jsonData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            if (response.status === 400 || response.status === 404) {
                const error = await response.json()
                window.alert(error.error)
                console.log(error.error)
            } else if (response.status === 200) {
                const blob = await response.blob();
                // Crear un enlace temporal y hacer clic en él para iniciar la descarga         
                const url = window.URL.createObjectURL(blob);
                /*const a = document.createElement('a');
                a.href = url;
                a.download = `Factura.pdf`
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                const blob = await response.blob();
                */

                window.open(url, 'Factura');
                // Revocar el objeto URL después de abrir el enlace
                window.URL.revokeObjectURL(url);

            }

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
    <div class="bg-info vh-100 d-flex justify-content-center align-items-center ">
        <div class="bg-light shadow-lg rounded-5" style="height: 90%; width: 80%">
            <!--parte de busqueda-->
            <div class="">
                <div class="text-secondary py-4">
                    <h1 class="text-center fw-bold">{{ this.cargo }}</h1>
                </div>
                <div class="d-flex justify-content-center">
                    <Barra_busqueda class="w-75" :tipoPersonas="pruebas" @datosPersona="traerPersona" />
                </div>
            </div>
            <div v-if="productoDiv">
                <!--parte de agregacion de productos-->
                <div class="d-flex justify-content-center pb-4">
                    <div class="w-75 d-flex justify-content-center">
                        <!--Funcion de agregaion de productos-->
                        <div class="w-50">
                            <componenteDetProd @Codigo="traerProducto" />
                        </div>
                        <!--Barra Componente con noton total -->
                        <div class="w-50 d-flex justify-content-center">
                            <div v-if="tipoFactura === 'DV' || tipoFactura === 'DC'" class="w-100 px-4 ">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Ref</span>
                                    <input type="text" class="form-control" placeholder="Codigo Factura"
                                        aria-label="Codigo producto" aria-describedby="basic-addon2" v-model="ref">
                                </div>
                            </div>
                            <!--Boton de totalizar-->
                            <div class="w-25 ">
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-warning w-100" @click="crearFactura()">Total</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--parte lista de producto-->
                <div class="d-flex justify-content-center ">
                    <div class="w-75">
                        <div class=" overflow-auto rounded-5 border border-1 border-secondary" style="max-height: 590px;">
                            <div class="c" v-for="(producto, index) in productos">
                                <componenteProducto :productos="producto" :label="labelComp" :index="index"
                                    @datoCantidad="cantidadProd" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </div>
</template>
<style></style>

<script>
//vamos a plantear una funcioque nos permita  recibir un arreglo de datos 

export default {
    data() {
        return {
            activacion: [true, true, true, true],
            cargo: '', //fecht cargo
            cantidad: 0,
            listaCant: []
        };
    },
    props: {
        productos: {
            type: Array, // Indica que personas debe ser un Array
            required: true // Opcional: indica que el prop es obligatorio
        },
        index: {
            type: Number,
            required: true
        }
    },

    methods: {
        async validarcantidad() {
            const response = await fetch(`http://localhost:3000/api/productos/existencia/${this.productos[0][1]}`);
            const data = await response.json();
            this.cargo = JSON.parse(localStorage.getItem('empleado'))[0][1]
            if (this.cargo == 'Vendedor' || this.cargo == 'Gerente de compras') {
                let nuevaCantidad = +data - 1 - this.cantidad
                if (nuevaCantidad < 0) {
                    window.alert('No hay suficiente cantidad del producto seleccionado');
                } else {
                    this.cantidad = this.cantidad + 1
                }
            } else {
                this.cantidad = this.cantidad + 1
            }
            this.enviarDatos()
        },

        enviarDatos() {
            let lisCant = [this.index, this.cantidad]
            this.$emit('datoCantidad', lisCant)
        }
    }
}

</script>
<template>
    <div class="container">
        <div class="row bg-primary p-3">
            <article class="col-md-7">
                <div class="row">
                    <div class="col-12 pb-2">
                        <h2>{{ productos[0][2] }}</h2>
                    </div>
                    <div class="col-12 fs-3">
                        <p><strong>Precio: </strong> ${{ productos[0][3] }}</p>
                    </div>
                    <div class="col-12">
                        <p><strong>Referencia: </strong> {{ productos[0][1] }}</p>
                    </div>
                    <div class="col-12">
                        <p><strong>Categoria: </strong> {{ productos[0][0] }} </p>
                    </div>
                </div>
            </article>
            <article class="col-5 d-flex justify-content-end">
                <div class="input-group w-25">
                    <button type="button" class="btn btn-warning"
                        @click="(cantidad != 0) ? cantidad = cantidad - 1 : cantidad = cantidad; enviarDatos()">-</button>
                    <input type="text" class="form-control text-center" placeholder="" aria-label="Cantidad"
                        aria-describedby="basic-addon2" v-model="cantidad" readonly>
                    <button type="button" class="btn btn-warning" @click="validarcantidad()">+</button>
                </div>
            </article>
        </div>
    </div>
</template>
<style></style>
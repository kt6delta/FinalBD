<script>
//vamos a plantear una funcioque nos permita  recibir un arreglo de datos 

export default {
    data() {
        return {
            activacion: [true, true, true, true],
            cargo: '',
            codigo: ''
        };
    },
    props: {
    },
    methods: {
        evaluarBoton() {
            if (cargo == 'auxiliar de compras') {
                this.activacion = [true, false, false, false]
            } else if (cargo == 'gerente de compras') {
                this.activacion = [true, false, false, true]
            } else if (cargo == 'representante de ventas') {
                this.activacion = [false, true, true, false]
            } else if (cargo == 'vendedor') {
                this.activacion = [false, true, false, false]
            }
        },
        enviarCodigo() {
            let datos = this.codigo
            this.$emit('Codigo', datos)
        }

    }
}

</script>
<template>
    <div class="">
        <div class="">
            <article class="">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Codigo producto" aria-label="Codigo producto"
                        aria-describedby="basic-addon2" v-model="codigo">
                    <button type="button" class="btn btn-info text-white" @click="enviarCodigo()">Añadir</button>
                </div>
            </article>
        </div>
    </div>
</template>
<style></style>
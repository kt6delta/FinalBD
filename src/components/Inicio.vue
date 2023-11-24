<script>
export default {
    data() {
        return {
            codigo: ''
        };
    },
    methods: {
        ejecutar() {
            this.EnviarData()
        },
        async EnviarData() {
            let prueba = false
            try {
                const response = await fetch(`http://localhost:3000/api/empleados/${this.codigo}`);
                const data = await response.json();
                localStorage.setItem('empleado', JSON.stringify(data));
                console.log(data)
                let cargo = JSON.parse(localStorage.getItem('empleado'))[0][1]
                let tipoFactura, tipoPersona = "Cliente"
                if (cargo == 'auxiliar de compras') {
                    tipoFactura = 'CO'
                    tipoPersona = "Proveedor"
                } else if (cargo == 'Gerente de compras') {
                    tipoPersona = "Proveedor"
                    tipoFactura = 'DC'
                } else if (cargo == 'Representante de ventas') {
                    tipoFactura = 'DV'
                } else if (cargo == 'Vendedor') {
                    tipoFactura = 'VE'
                }
                localStorage.setItem('tipoPersona', tipoPersona);
                localStorage.setItem('tipoFactura', tipoFactura);

                prueba = true
                this.$router.push('./Tabla')
            } catch (error) {
                window.alert(error)
            }
        }
    }
};
</script>

<template>
    <div class="bg-info d-flex justify-content-center align-items-center vh-100">
            <div class="bg-light shadow-lg py-5 h-50 w-25 rounded-5">
                <div class="pb-3">
                    <div class="d-flex  justify-content-center pb-1">
                        <img src="../assets/login-icon.svg" alt="login-icon" style="height: 10rem"/>
                    </div>
                    <div class="text-secondary">
                        <p class="text-center fs-1 fw-bold">Inicio de sesion</p>
                    </div>
                </div>
                <div class="px-5">
                    <div>
                        <input class="form-control form-control-lg text-center mt-2" type="text" placeholder="codigo Empleado"
                        aria-label=".form-control-lg example" v-model="codigo">
                    </div>
                    <div class="pt-2 d-flex justify-content-center">
                        <button @click="EnviarData" class="btn btn-info text-white w-100">Ingresar</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped>
</style>

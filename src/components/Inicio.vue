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
    <div id="booking">
        <div id="inicio" class="booking-cta m-0 p-0 mt-5">
            <h1 class="text-uppercase text-center">INICIO DE SESION</h1>
            <div class="w-100 h-100 bg-white p-5" id="bloque">
                <!--ICON de persona en negro-->
                <picture>
                    <img src="../img/person.jpg" class="rounded mx-auto d-block" id="size" alt="person">
                </picture>

                <div class="col-sm-12">
                    <input class="form-control form-control-lg text-center mt-2" type="text" placeholder="codigo Empleado"
                        aria-label=".form-control-lg example" v-model="codigo">
                </div>

                <div id="btn" class="row g-3 m-auto">
                    <div class="col align-self-center">
                        <button @click="EnviarData" class="btn btn-primary me-3">Ingresar</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
img#size {
    width: 20%;
    height: auto;
}

#btn {
    text-align: center;
}

#inicio {
    position: absolute;
    top: 20%;
    left: 25%;
    right: 25%;
}

#inicio h1 {
    color: rgb(247, 247, 247);
    font-size: 60px;
    font-weight: 700;
    margin-bottom: 20px;
}

#bloque {
    border-radius: 10px;
}

/* Estilo de la paguina de fondos de inicio */
#booking {
    width: 100vw;
    height: 100vh;
    background-image: url(./img/background.png);
    background-size: cover;
}
</style>

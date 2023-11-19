<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        OcultarInicio() {
            //this.EnviarData();
            this.$emit('oculta-inicio', false);
        },
        async EnviarData() {
            try {
                const response = await axios.post('https://your-api-url.com', {
                    email: this.email,
                    password: this.password
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
    }
};
</script>

<template>
    <div id="inicio" class="booking-cta m-0 p-0">
        <h1 class="text-uppercase text-center">INICIO DE SESION</h1>
        <div id="bloque-white" class="w-100 h-100">
            <!--ICON de persona en negro-->
            <picture>
                <img src="../img/person.jpg" class="rounded mx-auto d-block" id="size" alt="person">
            </picture>
            <form class="row g-3 mt-1 w-100 h-100">

                <div class="col-sm-6">
                    <input class="form-control form-control-lg" type="email" placeholder="email"
                        aria-label=".form-control-lg example" v-model="email">
                </div>


                <div class="col-sm-6">
                    <input class="form-control form-control-lg" type="password" placeholder="password"
                        aria-label=".form-control-lg example" v-model="password">
                </div>

                <div id="btn" class="row g-3 m-auto">
                    <div class="col align-self-center">
                        <button @click="OcultarInicio" class="btn btn-primary me-3">Enviar</button>
                    </div>
                </div>
            </form>
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

#bloque-white {
    background-color: rgb(247, 247, 247);
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    height: 30vh;
}

</style>

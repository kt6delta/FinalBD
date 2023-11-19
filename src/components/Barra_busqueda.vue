<script>
export default {
    data() {
        return {
            personas: [],
            datos: []
        };
    },
    props: ['tipoPersonas'],
    methods: {

        async traerPersonas(tipo) {
            const response = await fetch(`http://localhost:3000/api/personas/${tipo}`);
            const personas = await response.json();
            this.personas = personas
            console.log(personas)
        },
        enviarDatos(){
            this.$emit('datosPersona', this.personas);
        }
    }

}
</script>
<template>
    <div class="container">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">tipoPersona</button>
        <ul class="dropdown-menu">
            <li v-for="tipoPersona in tipoPersonas"><a class="dropdown-item" href="#"
                    @click="traerPersonas(tipoPersona[1])">{{ tipoPersona[1] }}</a></li>
        </ul>
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">Persona</button>
        <ul class="dropdown-menu">
            <li v-for="persona in personas"><a class="dropdown-item" href="#" @click="enviarDatos()">{{ persona[0] }}</a></li>
        </ul>
    </div>
</template>
<style></style>
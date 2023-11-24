<script>
export default {
    data() {
        return {
            personas: [],
            datos: [],
            nombre: '',
            tipoPersona: localStorage.getItem('tipoPersona'),
            boton: true
        };
    },
    props: ['tipoPersonas'],
    methods: {

        async traerPersonas(tipo) {
            let response
            try {
                if (this.personas.length == 0) {
                    response = await fetch(`http://localhost:3000/api/personas/${tipo}`);
                } else {
                    response = await fetch(`http://localhost:3000/api/personas/${tipo}/${this.nombre.toLocaleLowerCase()}`);
                }
                const personas = await response.json();
                this.personas = personas
                if (personas.length == 1) {
                    this.boton = false
                }else{
                    this.boton = true
                }
                console.log(personas)
            } catch (error) {
                console.log(error)
                window.alert("persona no encontrada")
            }
        },
        enviarDatos() {
            console.log(this.personas)
            this.$emit('datosPersona', this.personas);
        },
        enrutarPersona(){
            this.$router.push('./Formulario')
        }
    }

}
</script>
<template>
    <div class="container">
        <div>
            <div class="input-group mb-3 ">
                <span class="input-group-text">{{ tipoPersona }}</span>
                <input class="form-control" list="datalistOptions" id="exampleDataList"
                    :placeholder="`digite su ${tipoPersona}`" @input="traerPersonas(tipoPersona)" v-model="nombre">
                <datalist id="datalistOptions">
                    <option v-for="persona in personas">{{ persona[0] }}</option>
                </datalist>
                <button class="btn btn-outline-primary" type="button" :disabled="this.boton" @click="enviarDatos()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    Seleccionar
                </button>
                <button class="btn btn-outline-success" type="button" @click="enrutarPersona()">Añadir</button>
            </div>
        </div>
    </div>
</template>
<style></style>
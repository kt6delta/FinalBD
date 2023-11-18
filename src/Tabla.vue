<script>
export default {
    data() {
        return {
            contador: 0,
        };
    },
    methods: {
        async traerTipo() {
            const response = await fetch('http://localhost:3000/api/tipodoc')
            const data = await response.json()

            console.log(data)
            var miTipo = document.getElementById('tipos');

            for (let i = 0; i < data.length; i++) {
                miTipo.innerHTML += crearTipo(data[i])
            }
        },
        crearTipo(tipo) {
            return `<option value="${tipo[0]}">${tipo[1]}</option>`
        },
        async traerPersonas() {
            const response = await fetch('http://localhost:3000/api/personas')
            const data = await response.json()
            console.log(data)
            var miTabla = document.getElementById('tabla');
            while (miTabla.firstChild) {
                miTabla.removeChild(miTabla.firstChild);
            }
            for (let i = 0; i < data.length; i++) {
                miTabla.innerHTML += crearPersona(data[i])
            }
        },

        crearPersona(datoPersona) {
            contador += 1
            if (contador % 2 == 0) {
                return `<tr id="persona" class="info">
            <td >${datoPersona[0]}</td>
            <td>${datoPersona[1]}</td>
            <td>${datoPersona[2]}</td>
            <td>${datoPersona[3]}</td>
            <td>${datoPersona[4]}</td>
            <td>${datoPersona[5]}</td>
            <td>${datoPersona[6]}</td>
        </tr>`
            } else {
                return `<tr id="persona">
            <td >${datoPersona[0]}</td>
            <td>${datoPersona[1]}</td>
            <td>${datoPersona[2]}</td>
            <td>${datoPersona[3]}</td>
            <td>${datoPersona[4]}</td>
            <td>${datoPersona[5]}</td>
            <td>${datoPersona[6]}</td>
        </tr>`
            }

        },
        async traerPersona() {

            const selectElement = document.getElementById("tipos");
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            const selectedValue = selectedOption.value;
            const response = await fetch(`http://localhost:3000/api/personas/${selectedValue}/${document.getElementById("documento").value}`)
            const data = await response.json()

            console.log(data)
            var miTabla = document.getElementById('tabla');
            while (miTabla.firstChild) {
                miTabla.removeChild(miTabla.firstChild);
            }

            for (let i = 0; i < data.length; i++) {
                miTabla.innerHTML += crearPersona(data[i])
            }
        }
    }
};
// Llama a la función cuando se carga la página
//window.onload = traerPersonas();
</script>

<template>

    
    <div id="contenedor">
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <h1 class="text-center">Actividad Bases de Datos</h1>
            </div>
            <div class="panel-body">
                <form class="form-inline">
                    <div class="form-group">
                        <label class="sr-only" for="documento">Documento</label>
                        <input type="number" class="form-control" id="documento" placeholder="Documento" name="documento">
                    </div>
                    <div class="form-group" id="group">
                        <span class="form-label">Tipo</span>
                        <select id="tipos" class="form-control" name="tipoDoc"></select>
                        <span class="select-arrow"></span>
                    </div>
                </form>
                <button @onclick="traerPersona()" class="btn btn-primary">Buscar</button>
                <button @onclick="traerPersonas()" class="btn btn-info ">Todos</button>
                <button @onclick="location.href = './index.html'" class="btn btn-success">Agregar</button>
            </div>

            <!-- Table -->
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Direccion</th>
                            <th>Correo</th>
                            <th>Celular</th>
                        </tr>
                    </thead>
                    <tbody id="tabla"></tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
div#contenedor {
    padding-left: 50px;
    padding-right: 50px;
}

form {
    margin-bottom: 20px
}

div#group {
    margin-left: 50px;
}
</style>

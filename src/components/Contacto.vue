<script>
export default {
  async beforeMount() {

    try {
      const response = await fetch(`http://localhost:3000/api/tipocontacto`);
      const data = await response.json();
      this.tipoContacto = data

    } catch (error) {
    }
  },
  data() {
    return {
      contacto: '',
      dato: '',
      mostrarCorreo: true,
      tipoContacto: [],
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    enviarDatos() {
      let lisContacto = [this.index, this.dato, this.contacto]
      this.$emit('datoContacto', lisContacto)
    }
  }
};
</script>

<template>
  <div class="w-100" v-if="tipoContacto.length != 0">
    <div class="d-flex justify-content-center align-items-center">

      <!-- informacion de contacto -->

      <div class="w-50 p-1">
        <div class="w-100 form-group">
          <p class="w-25 fs-5 m-0 text-secondary">Datos</p>
          <input class="form-control" type="email" :placeholder="`ingrese el dato de contacto`" v-model="dato" name="correo"
            @change="enviarDatos()" :disabled="(this.contacto === '')  ? true:false">
        </div>
      </div>
  
      <!-- tipo de contacto -->

      <div class="w-50 p-1">
        <div class="w-100 form-group">
          <p class="w-25 fs-5 m-0 text-secondary">Contacto</p>
          <select id="tipos" class="form-control" name="tipoDoc" v-model="contacto">
            <option v-for="i in tipoContacto" :value="[i[0], i[1]]">{{ i[1] }}</option>
          </select>
          <span class="select-arrow"></span>
        </div>
      </div>

    </div>

  </div>
</template>

<style></style>

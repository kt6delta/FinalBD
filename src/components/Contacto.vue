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
  <div class="row" v-if="tipoContacto.length != 0">
    <div class="col-sm-8">
      <div class="form-group">
        <span class="form-label">Datos</span>
        <input class="form-control" type="email" :placeholder="`ingrese el dato de contacto`" v-model="dato" name="correo"
          @change="enviarDatos()" :disabled="(this.contacto === '')  ? true:false">
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <span class="form-label">Contacto</span>
        <select id="tipos" class="form-control" name="tipoDoc" v-model="contacto">
          <option v-for="i in tipoContacto" :value="[i[0], i[1]]">{{ i[1] }}</option>
        </select>
        <span class="select-arrow"></span>
      </div>
    </div>
  </div>
</template>

<style></style>

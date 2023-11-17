<script>
export default {
  data() {
    return {
      contacto: "correo",
      mostrarCorreo: true,
    };
  },
  methods: {
    CambiarContacto() {
      if (this.contacto == "correo") {
        this.mostrarCorreo = true;
      } else {
        this.mostrarCorreo = false;
      }
    },
    AgregarContacto() {

    }
  }
};
</script>

<template>
    <div class="row">
        <div class="col-sm-8" v-show=mostrarCorreo>
            <div class="form-group">
                <span class="form-label">Correo</span>
                <input class="form-control" type="email" placeholder="Correo" name="correo" required>
            </div>
        </div>
        <div class="col-sm-8" v-show=!mostrarCorreo>
            <div class="form-group">
                <span class="form-label">Celular</span>
                <input class="form-control" type="number" name="celular" placeholder="Celular">
            </div>
        </div>
        <div class="col-sm-4">
            <div class="form-group">
                <span class="form-label">Contacto</span>
                <select id="tipos" class="form-control" name="tipoDoc" required="required" v-model="contacto"
                    @change="CambiarContacto()">
                    <option value="correo">correo</option>
                    <option value="numero">celular</option>
                </select>
                <span class="select-arrow"></span>
            </div>
        </div>
    </div>
</template>

<style></style>

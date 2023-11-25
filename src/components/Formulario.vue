<script>
import Contacto from './Contacto.vue';
import Direcciones from './Direcciones.vue';
export default {
  data() {
    return {
      //atributos del formulario
      cont: 1,
      cont2: 1,
      direccion: {},
      contacto: {},

      TipeUser: "",
      Name: "",
      Apellido: "",
      nDoc: "",
      tipoDoc: "",
    };
  },
  methods: {
    AddDireccion() {
      this.cont2 = this.cont2 + 1;
      // this.direccion.push({
      //   
      //   
      // });
    },
    //se encarga de agregar varios contactos
    LessDireccion() {
      if (this.cont2 > 1) {
        this.cont2 = this.cont2 - 1;
      }
    },
    AgregarContacto() {
      this.cont = this.cont + 1;
      // this.contacto.push({
      //   contacto: 'correo',
      //   mostrarCorreo: true,
      // });
    },
    //se encarga de agregar varios contactos
    QuitarContacto() {
      if (this.cont > 1) {
        this.cont = this.cont - 1;
      }
    },
    //actualiza info a la bd
    Bd_put() {
      console.log('put');
      this.$router.push('/Tabla');
    },
    //envia info a la bd
    Bd_post() {
      console.log('post');
      this.$router.push('/Tabla');
    }
  },
  components: {
    Contacto,
    Direcciones
  },
};
</script>
<template>
  <div class="bg-info row mt-5">
    <div class="col-md-7 col-md-push-5">
      <div class="booking-cta">
        <h1>Para Usar el Servicio</h1>
        <p id="text">Porfavor llenar el siguiente formulario para ingresar o actualizar datos en la
          base de datos, en caso
          de que exista el ususario se le dara un aviso
        </p>
      </div>
      <!--Muestra todas las alertas-->
      <div class="alert alert-danger alerta" id="alerta-d" role="alert"><strong>¡Error!</strong>
        Información faltante
      </div>
      <div class="alert alert-warning alerta" id="alerta-w" role="alert">
        <strong>¡Peligro!</strong> El usuario ya existe,
        ¿desea
        actulizar?
        <a @click="Bd_put()" class="alert-link text-center">SI</a>
        <br>En caso contrario por
        favor ingrese un documento que no este repetido.
      </div>
      <div class="alert alert-success alerta" id="alerta-s" role="alert">
        <strong>¡Exito!</strong>
        Persona creada correctamente
      </div>

    </div>
    <div class="col-md-5 col-md-pull-7">
      <div class="booking-form px-4 py-3">
        <!--Formulario para ingresar/actualizar la info-->
        <form>
          <!--agrega en el html varios espacios de direccion-->
          <div v-for="i in cont2" v-bind:key="i">
            <Direcciones :cont2Pop="i" />
          </div>

          <!--ingresar info de tipo Usuario-->
          <div class="row">
            <div class="col-sm-8">
              <div class="form-group">
                <span class="form-label">Tipo usuario</span>
                <select id="tipos" class="form-control" name="tipoDoc" required="required" v-model="TipeUser">
                  <option value="cliente">cliente</option>
                  <option value="provedor">provedor</option>
                </select>
                <span class="select-arrow"></span>
              </div>
            </div>
            <!--botones para controlar cantidad de direcciones-->
            <div class="col-sm-4 d-flex justify-content-center align-items-start">
              <div class="form-group">
                <div id="add" class="form-btn text-end">
                  <button type="button" class="btn btn-primary me-2 fs-4 px-2 py-0" @click="AddDireccion()">+</button>
                  <button type="button" class="btn btn-primary fs-4 px-2 py-0" @click="LessDireccion()">-</button>
                </div>
              </div>
            </div>
          </div>

          <!--ingresar info de Nombre-->
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <span class="form-label">Nombre</span>
                <input class="form-control" type="text" placeholder="Nombre" name="nombre" required v-model="Name">
              </div>
            </div>
            <!--ingresar info de Apellido-->
            <div class="col-sm-6">
              <div class="form-group">
                <span class="form-label">Apellido</span>
                <input class="form-control" type="text" placeholder="Apellido" name="apellido" required
                  v-model="Apellido">
              </div>
            </div>
          </div>
          <!--ingresar info de Numero de Doc-->
          <div class="row">
            <div class="col-sm-8">
              <div class="form-group">
                <span class="form-label">Numero de documento</span>
                <input class="form-control" type="text" name="nDoc" placeholder="Numero de documento" required
                  v-model="nDoc">
              </div>
            </div>
            <!--ingresar info de Tipo-->
            <div class="col-sm-4">
              <div class="form-group">
                <span class="form-label">Tipo</span>
                <select id="tipos" class="form-control" name="tipoDoc" required="required" v-model="tipoDoc">
                  <option value="id">id</option>
                  <option value="cc">cc</option>
                </select>
                <span class="select-arrow"></span>
              </div>
            </div>
          </div>
          <!--agrega en el html varios espacios de contacto-->
          <div v-for="i in cont" v-bind:key="i">
            <Contacto />
          </div>
          <div id="add" class="form-btn text-end mb-2">
            <button type="button" class="btn btn-primary me-2 fs-4 px-2 py-0" @click="AgregarContacto()">+</button>
            <button type="button" class="btn btn-primary fs-4 px-2 py-0" @click="QuitarContacto()">-</button>
          </div>

          <div class="form-btn text-center">
            <button @click="Bd_post()" class="submit-btn me-3">Agregar</button>
            <button tag="button" class="submit-btn">Volver</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alerta {
  font-size: 20px;
}

p#text {
  font-size: 20px;
}
</style>

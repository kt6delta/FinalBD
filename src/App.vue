<script>
import Inicio from './components/Inicio.vue';
import Contacto from './components/Contacto.vue';
export default {
  data() {
    return {
      cont: 1,
      contacto: []
    };
  },
  methods: {
    AgregarContacto() {
      this.cont = this.cont + 1;
      // this.contacto.push({
      //   contacto: 'correo',
      //   mostrarCorreo: true,
      // });
    },
    QuitarContacto() {
      if (this.cont > 1) {
        this.cont = this.cont - 1;
      }
    }
  },
  components: {
    Inicio,
    Contacto
  },
};
</script>

<template>
  <div id="booking" class="section">
    <router-view></router-view>
    <Inicio v-if="false" />
    <div v-else>
      <div class="section-center">
        <div class="container">
          <div class="row">
            <div class="col-md-7 col-md-push-5">
              <div class="booking-cta">
                <h1>Para Usar el Servicio</h1>
                <p style="font-size: 20px;">Porfavor llenar el siguiente formulario para ingresar o actualizar datos en la
                  base de datos, en caso
                  de que exista el ususario se le dara un aviso
                </p>
              </div>
              <!--alert-->
              <div class="alert alert-danger" id="alerta-d" role="alert" style="font-size: 20px;"><strong>¡Error!</strong>
                Información faltante
              </div>
              <div class="alert alert-warning" id="alerta-w" role="alert" style="font-size: 20px;">
                <strong>¡Peligro!</strong> El usuario ya existe,
                ¿desea
                actulizar?<a href="#" onclick="Bd_put()" class="alert-link text-center"> SI</a><br>En caso contrario por
                favor ingrese un documento que no este repetido.
              </div>
              <div class="alert alert-success" id="alerta-s" role="alert" style="font-size: 20px;">
                <strong>¡Exito!</strong>
                Persona creada correctamente
              </div>

            </div>
            <div class="col-md-5 col-md-pull-7">
              <div class="booking-form">
                <form>
                  <div class="row">
                    <div class="col-sm-8">
                      <div class="form-group">
                        <span class="form-label">Direccion</span>
                        <input class="form-control" type="text" name="direccion" placeholder="Direccion">
                      </div>
                    </div>

                    <div class="col-sm-4">
                      <div class="form-group">
                        <span class="form-label">Tipo usuario</span>
                        <select id="tipos" class="form-control" name="tipoDoc" required="required">
                          <option value="cliente">cliente</option>
                          <option value="provedor">provedor</option>
                        </select>
                        <span class="select-arrow"></span>
                      </div>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <span class="form-label">Nombre</span>
                        <input class="form-control" type="text" placeholder="Nombre" name="nombre" required>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <span class="form-label">Apellido</span>
                        <input class="form-control" type="text" placeholder="Apellido" name="apellido" required>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-8">
                      <div class="form-group">
                        <span class="form-label">Numero de documento</span>
                        <input class="form-control" type="text" name="nDoc" placeholder="Numero de documento" required>
                      </div>
                    </div>

                    <div class="col-sm-4">
                      <div class="form-group">
                        <span class="form-label">Tipo</span>
                        <select id="tipos" class="form-control" name="tipoDoc" required="required">
                          <option value="id">id</option>
                          <option value="cc">cc</option>
                        </select>
                        <span class="select-arrow"></span>
                      </div>
                    </div>
                  </div>
                  <div v-for="i in cont" v-bind:key="i">
                    <Contacto />
                  </div>
                  <div id="add" class="form-btn text-end">
                    <button type="button" class="btn btn-primary me-2" @click="AgregarContacto()">+</button>
                    <button type="button" class="btn btn-primary" @click="QuitarContacto()">-</button>
                  </div>

                  <div class="form-btn text-center">
                    <button class="submit-btn me-3">Agregar</button>
                    <button type="button" class="submit-btn">Volver</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>  /* cyrillic-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }

  /* cyrillic */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }

  /* vietnamese */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
  }

  /* latin-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* latin */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }

  /* cyrillic */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }

  /* vietnamese */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
  }

  /* latin-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* latin */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(./fonts/montserrat.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
</style>

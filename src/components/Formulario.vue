<script>
import Contacto from './Contacto.vue';
import Direcciones from './Direcciones.vue';
export default {
  async beforeMount() {
    try {
      const response = await fetch(`http://localhost:3000/api/tipodoc`);
      const data = await response.json();
      this.tipoDoc = data

    } catch (error) {
    }
  },
  data() {
    return {
      //atributos del formulario
      cont: 1,
      cont2: 1,
      direccion: {},
      contactos: [],

      TipeUser: "",
      Name: "",
      Apellido: "",
      nDoc: "",
      tipoDoc: [],
      tipoDocPh: ''
    };
  },
  methods: {
    AddDireccion() {
      this.cont2 = this.cont2 + 1;
    },
    //se encarga de agregar varios contactos
    LessDireccion() {
      if (this.cont2 > 1) {
        this.cont2 = this.cont2 - 1;
      }
    },
    AgregarContacto() {
      this.cont = this.cont + 1;
    },
    //se encarga de agregar varios contactos
    QuitarContacto() {
      if (this.cont > 1) {
        this.cont = this.cont - 1;
      }
    },
    //actualiza info a la bd
    enrutarTabla() {
      console.log('put');
      this.$router.push('/Tabla');
    },
    //envia info a la bd
    async Bd_post() {
      let e = true
      const data = {
        nombre: this.Name,
        apellido: this.Apellido,
        tipoPersona: (localStorage.getItem('tipoPersona') == "Cliente") ? "CL" : "PR",
        tipoDoc: this.tipoDocPh,
        nDocumento: this.nDoc
      }
      const jsonData = JSON.stringify(data);
      console.log(jsonData)
      const response = await fetch("http://localhost:3000/api/personas",
        {
          method: "POST",
          body: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      if (response.status !== 201) {
        const error = await response.json()
        window.alert(error.error)
        console.log(error.error)
        e = false
      }
      let response2
      for (const contacto of this.contactos) {
        console.log(contacto)
        const data = {
          tipoContacto: contacto[1][0],
          descTipoContacto: contacto[1][1],
          tipoPersona: (localStorage.getItem('tipoPersona') == "Cliente") ? "CL" : "PR",
          tipoDoc: this.tipoDocPh,
          nDocumento: this.nDoc,
          descContacto: contacto[0]
        }
        const jsonData = JSON.stringify(data);
        console.log(jsonData)
        response2 = await fetch("http://localhost:3000/api/contactos",
          {
            method: "POST",
            body: jsonData,
            headers: {
              'Content-Type': 'application/json'
            }
          })
        if (response2.status !== 201) {
          const error = await response2.json()
          window.alert(error.error)
          console.log(error.error)
          e = false
        }
      }
      let posAnterior = 0
      for (let i = 1; i < 21; i++) {
        const direccion = this.direccion[i]
        if (direccion[0] != "") {
          let dir = {
            posicion: i,
            tipoPersona: (localStorage.getItem('tipoPersona') == "Cliente") ? "CL" : "PR",
            tipoDoc: this.tipoDocPh,
            nDocumento: this.nDoc
          }
          if (direccion[1] === true) {
            dir.valor = direccion[0]
          }
          else {
            dir.nomenclatura = direccion[0]
          }
          if (posAnterior != 0) {
            dir.posicionRef = posAnterior
          }
          const jsonDir = JSON.stringify(dir);
          console.log(jsonDir)
          const response3 = await fetch("http://localhost:3000/api/direcciones",
            {
              method: "POST",
              body: jsonDir,
              headers: {
                'Content-Type': 'application/json'
              }
            })
          if (response3.status !== 201) {
            const error = await response2.json()
            window.alert(error.error)
            console.log(error.error)
            e = false
          }
          posAnterior = i
        }
      }
      if (e) {
        window.alert("Persona añadida correctamente")
      }
    },
    traerDireccion(datos) {
      this.direccion = datos
      console.log(datos)
    },
    traerContactos(datos) {
      this.contactos[datos[0]] = [datos[1], datos[2]]
      console.log(this.contactos)
    }
  },
  components: {
    Contacto,
    Direcciones
  },
};
</script>
<template>

  <div class="bg-danger d-flex justify-content-center align-items-center vh-100">
    <div class="bg-info h-75 w-50 rounded-5 d-flex justify-content-center align-items-center">
      <div class="bg-success ">

      </div>
    </div>

  </div>
  <div class="bg-info vh-100">
    <div class="d-flex justify-content-center align-items-center w-100 h-100 ">
      <div class="booking-form px-4 py-3 rounded-5">
        <!--Formulario para ingresar/actualizar la info-->

        <!--agrega en el html varios espacios de direccion-->
        <div v-for="i in cont2" v-bind:key="i">
          <Direcciones :cont2Pop="i" @datosDireccion="traerDireccion" :index="i" />
        </div>

        <!--ingresar info de tipo Usuario-->
        <div class="row">
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
              <input class="form-control" type="text" placeholder="Nombre" name="nombre" v-model="Name">
            </div>
          </div>
          <!--ingresar info de Apellido-->
          <div class="col-sm-6">
            <div class="form-group">
              <span class="form-label">Apellido</span>
              <input class="form-control" type="text" placeholder="Apellido" name="apellido" v-model="Apellido">
            </div>
          </div>
        </div>
        <!--ingresar info de Numero de Doc-->
        <div class="row">
          <div class="col-sm-8">
            <div class="form-group">
              <span class="form-label">Numero de documento</span>
              <input class="form-control" type="text" name="nDoc" :placeholder="`Numero de ${tipoDocPh}`" v-model="nDoc">
            </div>
          </div>
          <!--ingresar info de Tipo-->
          <div class="col-sm-4">
            <div class="form-group">
              <span class="form-label">Tipo</span>
              <select id="tipos" class="form-control" name="tipoDoc" v-model="tipoDocPh">
                <option v-for="i in tipoDoc" :value="i[0]">{{ i[1] }}</option>
              </select>
              <span class="select-arrow"></span>
            </div>
          </div>
        </div>
        <!--agrega en el html varios espacios de contacto-->
        <div v-for="i in cont" v-bind:key="i">
          <Contacto :index="(i - 1)" @datoContacto="traerContactos" />
        </div>
        <div id="add" class="form-btn text-end mb-2">
          <button type="button" class="btn btn-primary me-2 fs-4 px-2 py-0" @click="AgregarContacto()">+</button>
          <button type="button" class="btn btn-primary fs-4 px-2 py-0" @click="QuitarContacto()">-</button>
        </div>

        <div class="form-btn text-center">
          <button @click="Bd_post()" class="btn btn-outline-primary me-3">Agregar</button>
          <button @click="enrutarTabla()" tag="button" class="btn btn-outline-primary">Volver</button>
        </div>

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

/* color del form*/
.booking-form {
  background-color: #fff;
  -webkit-box-shadow: 0 5px 20px -5px rgba(0, 0, 0, .3);
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, .3);
  border-radius: 4px
}

/* btn del form*/
.booking-form .form-group {
  position: relative;
  margin-bottom: 30px
}

/* marco externo form*/
.booking-form .form-control {
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px
}

/* inputs form*/
.booking-form .form-control::-webkit-input-placeholder {
  color: rgba(62, 72, 92, .3)
}

.booking-form .form-control:-ms-input-placeholder {
  color: rgba(62, 72, 92, .3)
}

.booking-form .form-control::placeholder {
  color: rgba(62, 72, 92, .3)
}

.booking-form input[type=date].form-control:invalid {
  color: rgba(62, 72, 92, .3)
}

.booking-form select.form-control {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none
}

/* flechas del select form*/
.booking-form select.form-control+.select-arrow {
  position: absolute;
  right: 0;
  bottom: 4px;
  width: 32px;
  line-height: 32px;
  height: 32px;
  text-align: center;
  pointer-events: none;
  color: rgba(62, 72, 92, .3);
  font-size: 14px
}

.booking-form select.form-control+.select-arrow:after {
  content: '\279C';
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg)
}

/* labels form*/
.booking-form .form-label {
  display: inline-block;
  color: #3e485c;
  font-weight: 700;
  margin-bottom: 6px;
  margin-left: 7px
}

/* btn form*/
.booking-form .submit-btn {
  display: inline-block;
  color: #fff;
  background-color: #1e62d8;
  font-weight: 700;
  padding: 12px 25px;
  border-radius: 4px;
  border: none;
  -webkit-transition: .2s all;
  transition: .2s all
}

.booking-form .submit-btn:hover,
.booking-form .submit-btn:focus {
  opacity: .9
}

/* titulo del form*/
.booking-cta h1 {
  font-size: 52px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700
}

/* text del form*/
.booking-cta p {
  font-size: 16px;
  color: #fff;
}
</style>

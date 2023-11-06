<script setup>
import Inicio from './components/Inicio.vue';
</script>

<template>
  <div id="global">
    <div id="title">
      <h1>INICIO DE SESION</h1>
      <form class="row g-3">
        <div class="col-auto">
          <label for="staticEmail2" class="visually-hidden">Email</label>
          <input type="text" class="form-control" id="staticEmail2" placeholder="Email">
        </div>
        <div class="col-auto">
          <label for="inputPassword2" class="visually-hidden">Password</label>
          <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
        </div>
        <div class="row g-3">
          <button type="submit" class="btn btn-primary mb-3 w-25 mx-auto">Enviar</button>
        </div>
      </form>
    </div>
    <img src="./assets/fondo1.jpg" class="d-block h-90" alt="img1">
  </div>
</template>

<style scoped>
div#global {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgb(110, 24, 24);
}

#title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.5rem;
}

#title h1 {
  font-size: 5rem;
  color: rgb(154, 34, 34);
  font-family: 'Times New Roman', Times, serif;
}

#title form {
  text-align: center;
  justify-content: center
}

#title button{
  background-color: rgb(13, 8, 8);
  border-color: rgb(13, 8, 8);
}
</style>

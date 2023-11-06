<script setup>

</script>

<template>
    <div id="inicio" class="booking-cta">
        <h1 class="text-uppercase text-center">INICIO DE SESION</h1>
        <div id="bloque-white">
            <form class="row g-3 mt-1 w-100 h-100">

                <div class="col-sm-6">
                    <input class="form-control form-control-lg" type="email" placeholder="email"
                        aria-label=".form-control-lg example">
                </div>


                <div class="col-sm-6">
                    <input class="form-control form-control-lg" type="password" placeholder="password"
                        aria-label=".form-control-lg example">
                </div>

                <div id="btn" class="row g-3 m-auto">
                    <div class="col align-self-center">
                        <button type="submit" class="btn btn-primary me-3">Enviar</button>
                        <button type="button" class="btn btn-primary">Volver</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
#btn{
    text-align: center;
}
#inicio {
    position: absolute;
    top: 20%;
    left: 25%;
    right: 25%;
}

#inicio h1 {
    color: rgb(247, 247, 247);
    font-size: 60px;
    font-weight: 700;
    margin-bottom: 20px;
}

#bloque-white {
    background-color: rgb(247, 247, 247);
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    height: 30vh;
}
</style>

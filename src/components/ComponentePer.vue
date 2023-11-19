<script>
//vamos a plantear una funcioque nos permita  recibir un arreglo de datos 

export default {
    data() {
        return {
            activacion: [true, true, true, true],
            cargo: ''
        };
    },
    props: ['personas'],
    methods: {
        evaluarBoton() {
            if (cargo == 'auxiliar de compras') {
                this.activacion = [true, false, false, false]
            } else if (cargo == 'gerente de compras') {
                this.activacion = [true, false, false, true]
            } else if (cargo == 'representante de ventas') {
                this.activacion = [false, true, true, false]
            } else if (cargo == 'vendedor') {
                this.activacion = [false, true, false, false]
            }
        }

    }
}

</script>
<template>
    <div class="container">
        <div class="row bg-primary p-3">
            <article class="col-md-7">
                <div class="row">
                    <div class="col-12 pb-2">
                        <h2>{{ personas[0] }}</h2>
                    </div>
                    <div class="col-12">
                        <p><strong>Documento: </strong> {{ personas[1] }}</p>
                    </div>
                    <div class="col-12">
                        <p><strong>Categoria: </strong> hi</p>
                    </div>
                </div>
            </article>
            <article class="col-md-5 d-flex align-items-center justify-content-center">

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-danger" :disabled="!activacion[0]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag"
                            viewBox="0 0 16 16">
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </button>
                    <button type="button" class="btn btn-warning" :disabled="!activacion[1]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-coin" viewBox="0 0 16 16">
                            <path
                                d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                        </svg>
                    </button>
                    <button type="button" class="btn btn-warning" :disabled="!activacion[2]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                            <path
                                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                    </button>
                    <button type="button" class="btn btn-success" :disabled="!activacion[3]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
                            <path
                                d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                            <path
                                d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                        </svg>
                    </button>
                </div>
            </article>
        </div>
    </div>
</template>
<style></style>
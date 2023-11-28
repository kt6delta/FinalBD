<script>
import { Modal } from 'bootstrap';
export default {
    async beforeMount() {

        try {
            const response = await fetch(`http://localhost:3000/api/direcciones/componente`);
            const data = await response.json();
            this.componentes = data

        } catch (error) {
        }
        try {
            for (let i = 1; i <= 21; i++) {
                const response = await fetch(`http://localhost:3000/api/direcciones/nomenclatura/${i}`);
                if (response.status != 204) {
                    const data = await response.json();
                    this.nomenclaturas[i] = data
                }
            }
        } catch (error) {
        }
        console.log(this.nomenclaturas)
    },
    data() {
        return {
            txtDireccion: "",
            direccion: {},
            selectedVia: "",
            idNum: "",
            prefijo: "",
            sufijo: "",
            letraVia: "",
            letraPrefijo: "",
            TipoCuadran: "",
            letraSufijo: "",
            letraViaG: "",
            NumViaG: "",
            NumPlaca: "",
            TipoCuadran2: "",
            TipoBarrio: "",
            NameBarrio: "",
            TipoManza: "",
            IdManzana: "",
            selectedUrban: "",
            NameUrban: "",
            selectedPredio: "",
            IdPredio: "",
            selectedComple: "",
            componentes: [],
            nomenclaturas: []
        };
    },
    methods: {
        async traerComponente() {
            console.log("entre")
            const response = await fetch(`http://localhost:3000/api/direcciones/componente`);
            try {
                const data = await response.json();
                this.componentes = data
            } catch (error) {
            }
            console.log(this.componentes)
        },
        ControlModal(bol) {
            console.log(bol)
            let modal = new Modal(document.getElementById(`direccionModal${this.index}`));
            if (bol) {
                modal.show();
            } else {
                modal.hide();
            }
        },

        SendDirec() {
            this.direccion = {
                selectedVia: this.selectedVia,
                idNum: this.idNum,
                prefijo: this.prefijo,
                sufijo: this.sufijo,
                letraVia: this.letraVia,
                letraPrefijo: this.letraPrefijo,
                TipoCuadran: this.TipoCuadran,
                letraSufijo: this.letraSufijo,
                letraViaG: this.letraViaG,
                NumViaG: this.NumViaG,
                NumPlaca: this.NumPlaca,
                TipoCuadran2: this.TipoCuadran2,
                TipoBarrio: this.TipoBarrio,
                NameBarrio: this.NameBarrio,
                TipoManza: this.TipoManza,
                IdManzana: this.IdManzana,
                selectedUrban: this.selectedUrban,
                NameUrban: this.NameUrban,
                selectedPredio: this.selectedPredio,
                IdPredio: this.IdPredio,
                selectedComple: this.selectedComple,
            }
            this.txtDireccion = this.selectedVia + " " + this.idNum + " " + this.letraVia + " " + this.prefijo + " " +
                this.letraPrefijo + " " + this.TipoCuadran + " " + this.NumViaG + " " + this.letraViaG + " " + this.sufijo + " "
                + this.letraSufijo + " " + this.NumPlaca + " " + this.TipoCuadran2 + " " + this.TipoBarrio + " " + this.NameBarrio + " " +
                this.TipoManza + " " + this.IdManzana + " " + this.selectedUrban + " " + this.NameUrban + " " + this.selectedPredio +
                " " + this.IdPredio + " " + this.selectedComple;
            this.ControlModal(false);
        },
        obtenerNomenclaturas(index) {
            let lista = [];
            this.nomenclaturas[index].forEach(element => {
                lista.push({ code: element[0], Via: element[1] });
            });
            return lista;
        },
        enviarDatos() {
            this.SendDirec()
            let datos = {
                1: [this.selectedVia, false],
                2: [this.idNum, true],
                3: [this.letraVia, true],
                4: [this.prefijo, true],
                5: [this.letraPrefijo, true],
                6: [this.TipoCuadran, false],
                7: [this.NumViaG, true],
                8: [this.letraViaG, true],
                9: [this.sufijo, true],
                10: [this.letraSufijo, true],
                11: [this.NumPlaca, true],
                12: [this.TipoCuadran2, false],
                13: [this.TipoBarrio, false],
                14: [this.NameBarrio, true],
                15: [this.TipoManza, false],
                16: [this.IdManzana, true],
                17: [this.selectedUrban, false],
                18: [this.NameUrban, true],
                19: [this.selectedPredio, false],
                20: [this.IdPredio, true],
                21: [this.selectedComple, false],
            }

            this.$emit('DatosDireccion', datos);
        }
    },
    props: {
        cont2Pop: {
            type: Number,
            required: true,
        },
        index: {
            type: Number,
            required: true
        }
    },
};
</script>
<template>
    <!--ingresar info de Direccion-->
    <div class="w-100 py-1">
        <div class="w-100">
            <div class="w-100 form-group ">
                <!-- Input que abre la subpestaña -->
                <input class="w-100 form-control" type="text" name="direccion" placeholder="Direccion " @click="ControlModal(true)"
                    v-model="txtDireccion" readonly>
            </div>
        </div>
    </div>

    <!-- Subpestaña -->
    <div class="modal fade" :id="`direccionModal${this.index}`" tabindex="-1" aria-labelledby="direccionModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content bg-info">
                <div class="modal-header">
                    <h5 class="modal-title" id="direccionModalLabel">Direccion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="w-100 modal-body">
                    <form v-if="componentes.length != 0" class="w-100">

                        <div class="row">
                            <!--Selecciona via-->
                            <div class="col-4">
                                <label class="visually-hidden" for="specificSizeSelect">Tipo Via</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[0][1] }}</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="selectedVia">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[1]" :value="i[0]">{{
                                            i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--Selecciona # ó nombre Via-->
                            <div class="col-1">
                                <label class="visually-hidden" for="txt">idNum</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[1][1]" v-model="idNum">
                            </div>
                            <!--Selecciona letra Via-->
                            <div class="col-1">
                                <label class="visually-hidden" for="letra">letra</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[2][1]" v-model="letraVia"
                                    @input="this.letraVia = this.letraVia.replace(/[^a-zA-Z]/g, '');">
                            </div>
                            <!--Selecciona prefijo-->
                            <div class="col-4">
                                <label class="visually-hidden" for="prefijo">prefijo</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[3][1] }}</div>
                                    <input type="text" class="form-control" id="specificSizeInputName" v-model="prefijo"
                                        @input="this.prefijo = this.prefijo.toUpperCase();">
                                </div>
                            </div>
    
                            <!--Selecciona letra prefijo-->
                            <div class="col-1">
                                <label class="visually-hidden" for="letra prefijo">letra prefijo</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[4][1]" v-model="letraPrefijo"
                                    @input="this.letraPrefijo = this.letraPrefijo.replace(/[^a-zA-Z]/g, '');">
                            </div>
                            <!--Selecciona Tipo Cuadrante-->
                            <div class="col-4">
                                <label class="visually-hidden" for="specificSizeSelect">Cuadrante</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[5][1] }}</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="TipoCuadran">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[6]" :value="i[0]">{{ i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--Selecciona # via generadora-->
                            <div class="col-1">
                                <label class="visually-hidden" for="letra"># via generadora</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[6][1]" v-model="NumViaG"
                                    @input="this.NumViaG = this.NumViaG.replace(/[^0-9]/g, '');">
                            </div>
                            <!--Selecciona letraViaG-->
                            <div class="col-1">
                                <label class="visually-hidden" for="letra via generadora"></label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[7][1]" v-model="letraViaG"
                                    @input="this.letraViaG = this.letraViaG.replace(/[^a-zA-Z]/g, '');">
                            </div>
                            <!--Selecciona sufijo-->
                            <div class="col-3">
                                <label class="visually-hidden" for="letra prefijo">{{ componentes[8][1] }}</label>
                                <div class="input-group">
                                    <div class="input-group-text">Sufijo</div>
                                    <input type="text" class="form-control" id="specificSizeInputName" v-model="sufijo"
                                        @input="this.sufijo = this.sufijo.toUpperCase();">
                                </div>
                            </div>
                            <!--Selecciona letra Sufijo-->
                            <div class="col-1">
                                <label class="visually-hidden" for="letra prefijo">letra Sufijo</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[9][1]" v-model="letraSufijo"
                                    @input="this.letraSufijo = this.letraSufijo.replace(/[^a-zA-Z]/g, '');">
                            </div>
                            <!--Selecciona # placa-->
                            <div class="col-1">
                                <label class="visually-hidden" for="letra prefijo"># placa</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[10][1]" v-model="NumPlaca"
                                    @input="this.NumPlaca = this.NumPlaca.replace(/[^0-9]/g, '');">
                            </div>
                            <!--Selecciona Tipo Cuadrante-->
                            <div class="col-4">
                                <label class="visually-hidden" for="specificSizeSelect">Cuadrante</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[11][1] }}</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="TipoCuadran2">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[12]" :value="i[0]">{{
                                            i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--Selecciona Tipo Barrio-->
                            <div class="col-4">
                                <label class="visually-hidden" for="specificSizeSelect">Barrio</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[12][1] }}</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="TipoBarrio">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[13]" :value="i[0]">{{
                                            i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--Selecciona Name Barrio-->
                            <div class="col-4">
                                <label class="visually-hidden" for="letra prefijo">Nombre Barrio</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[13][1]" v-model="NameBarrio"
                                    @input="this.NameBarrio = this.NameBarrio.replace(/[^a-zA-Z]/g, '');">
                            </div>
                            <!--Selecciona Tipo Manzana-->
                            <div class="col-4">
                                <label class="visually-hidden" for="specificSizeSelect">Manzana</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[14][1] }}</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="TipoManza">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[15]" :value="i[0]">{{
                                            i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--Selecciona Identificador Manzana-->
                            <div class="col-2">
                                <label class="visually-hidden" for="txt">IdManzana</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[15][1]" v-model="IdManzana">
                            </div>
                            <!--Selecciona Tipo Urbanizacion-->
                            <div class="col-3">
                                <label class="visually-hidden" for="specificSizeSelect">Urbanizacion</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[16][1] }}</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="selectedUrban">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[17]" :value="i[0]">{{
                                            i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--Selecciona Urbanizacion-->
                            <div class="col-3">
                                <label class="visually-hidden" for="letra prefijo">Nombre Urbanizacion</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[17][1]" v-model="NameUrban"
                                    @input="this.NameUrban = this.NameUrban.replace(/[^a-zA-Z]/g, '');">
                            </div>
                            <!--Selecciona Tipo Predio-->
                            <div class="col-4">
                                <label class="visually-hidden" for="specificSizeSelect">Predio</label>
                                <div class="input-group">
                                    <div class="input-group-text">{{ componentes[18][1] }}</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="selectedPredio">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[19]" :value="i[0]">{{
                                            i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--Selecciona IdPredio-->
                            <div class="col-4">
                                <label class="visually-hidden" for="txt">IdPredio</label>
                                <input type="text" class="form-control" id="specificSizeInputName"
                                    :placeholder="componentes[19][1]" v-model="IdPredio">
                            </div>
                            <!--Selecciona Tipo Complemento-->
                            <div class="col-4">
                                <label class="visually-hidden" for="specificSizeSelect">{{ componentes[20][1] }}</label>
                                <div class="input-group">
                                    <div class="input-group-text">Complemento</div>
                                    <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                        v-model="selectedComple">
                                        <option v-if="nomenclaturas.length != 0" v-for="i in nomenclaturas[21]" :value="i[0]">{{
                                            i[2]
                                        }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 d-flex d-flex justify-content-center align-items-center">
                                <div class="w-50 fs-2 m-0 text-center">
                                    {{ selectedVia || '' }}
                                    {{ " " + idNum + " " + letraVia + " " + prefijo + " " +
                                        letraPrefijo + " " + TipoCuadran + " " + NumViaG + " " + letraViaG + " " + sufijo + " "
                                        +
                                        letraSufijo + " " +
                                        NumPlaca + " " + TipoCuadran2 + " " + TipoBarrio + " " + NameBarrio + " " +
                                        TipoManza + " " + IdManzana + " " }}
                                    {{ selectedUrban || '' }}
                                    {{ " " + NameUrban + " " }}
                                    {{ selectedPredio || '' }}
                                    {{ " " + IdPredio + " " }}
                                    {{ selectedComple || '' }}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="enviarDatos()" data-bs-dismiss="modal" class="btn btn-primary">Guardar cambios</button>
                </div>


            </div>
        </div>
    </div>
</template>

<style>
v-select#via {
    width: 60%;
}

v-select#urbanizacion {
    width: 50%;
}

v-select#complemento {
    width: 55%;
}

v-select#predio {
    width: 60%;
}
</style>

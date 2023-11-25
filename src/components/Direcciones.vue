<script>
import { Modal } from 'bootstrap';
export default {
    async beforeMount() {

        const response = await fetch(`http://localhost:3000/api/direcciones/componente`);
        try {
            const data = await response.json();
            this.componentes =  data

        } catch (error) {
        }

        console.log(this.componentes)
    },
    data() {
        return {
            txtDireccion: "",
            direccion: {},
            selectedVia: null,
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
            selectedUrban: null,
            NameUrban: "",
            selectedPredio: null,
            IdPredio: "",
            selectedComple: null,
            componentes: []
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
            let modal = new Modal(document.getElementById('direccionModal'));
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
            this.txtDireccion = this.txtDireccion = this.selectedVia || '' + " " + idNum + " " + letraVia + " " + prefijo + " " +
                letraPrefijo + " " + TipoCuadran + " " + NumViaG + " " + letraViaG + " " + sufijo + " "
                +
                letraSufijo + " " +
                NumPlaca + " " + TipoCuadran2 + " " + TipoBarrio + " " + NameBarrio + " " +
                TipoManza + " " + IdManzana + " " + selectedUrban || '' + " " + NameUrban + " " + selectedPredio || '' +
                " " + IdPredio + " " + selectedComple || '';
            console.log(this.direccion);
            this.ControlModal(false);

        }
    },
    props: {
        cont2Pop: {
            type: Number,
            required: true,
        }
    },
};
</script>
<template>
    <!--ingresar info de Direccion-->
    <div class="row">
        <div class="col-sm-8">
            <div class="form-group">
                <span class="form-label" v-if="this.cont2Pop == 1">Direccion</span>
                <!-- Input que abre la subpestaña -->
                <input class="form-control" type="text" name="direccion" placeholder="Direccion" @click="ControlModal(true)"
                    v-model="txtDireccion" readonly>
            </div>
        </div>
    </div>

    <!-- Subpestaña -->
    <div class="modal fade" id="direccionModal" tabindex="-1" aria-labelledby="direccionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="direccionModalLabel">Direccion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form v-if="componentes.length != 0" class="row gx-3 gy-2 align-items-center">
                        <!--Selecciona via-->
                        <div class="col-sm-3">
                            <label class="visually-hidden" for="specificSizeSelect">Tipo Via</label>
                            <div class="input-group" id="1">
                                <div class="input-group-text">{{ componentes[0][1] }}</div>
                                <v-select style="width: 68%;" aria-describedby="validationServer" :options="[
                                    { code: 'AU', Via: 'Autopista' },
                                ]" :reduce="Via => Via.code" label="Via" v-model="selectedVia">
                                </v-select>
                                <div class="invalid-feedback" v-if="selectedVia == null">
                                    Porfavor seleccionar una opcion.
                                </div>
                            </div>
                        </div>
                        <!--Selecciona # ó nombre Via-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="txt">idNum</label>
                            <input type="text" class="form-control" id="specificSizeInputName" :placeholder="componentes[1][1]"
                                v-model="idNum">
                        </div>
                        <!--Selecciona letra Via-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra">letra</label>
                            <input type="text" class="form-control" id="specificSizeInputName" :placeholder="componentes[2][1]"
                                v-model="letraVia" @input="this.letraVia = this.letraVia.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona prefijo-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="prefijo">prefijo</label>
                            <div class="input-group">
                                <div class="input-group-text">{{ componentes[3][1] }}</div>
                                <input type="text" class="form-control" id="specificSizeInputName" v-model="prefijo"
                                    @input="this.prefijo = this.prefijo.toUpperCase();">
                            </div>
                        </div>

                        <!--Selecciona letra prefijo-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra prefijo">letra prefijo</label>
                            <input type="text" class="form-control" id="specificSizeInputName" :placeholder="componentes[4][1]"
                                v-model="letraPrefijo"
                                @input="this.letraPrefijo = this.letraPrefijo.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona Tipo Cuadrante-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Cuadrante</label>
                            <div class="input-group-text">{{ componentes[5][1] }}</div>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                v-model="TipoCuadran">
                                <option value="ESTE">Este</option>
                                <option value="NORTE">Norte</option>
                                <option value="OESTE">Oeste</option>
                                <option value="SUR">Sur</option>
                            </select>
                        </div>
                        <!--Selecciona # via generadora-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra"># via generadora</label>
                            <input type="text" class="form-control" id="specificSizeInputName"
                                :placeholder="componentes[6][1]" v-model="NumViaG"
                                @input="this.NumViaG = this.NumViaG.replace(/[^0-9]/g, '');">
                        </div>
                        <!--Selecciona letraViaG-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra via generadora"></label>
                            <input type="text" class="form-control" id="specificSizeInputName" :placeholder="componentes[7][1]"
                                v-model="letraViaG" @input="this.letraViaG = this.letraViaG.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona sufijo-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo">{{ componentes[8][1] }}</label>
                            <div class="input-group">
                                <div class="input-group-text">Sufijo</div>
                                <input type="text" class="form-control" id="specificSizeInputName" v-model="sufijo"
                                    @input="this.sufijo = this.sufijo.toUpperCase();">
                            </div>
                        </div>
                        <!--Selecciona letra Sufijo-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra prefijo">letra Sufijo</label>
                            <input type="text" class="form-control" id="specificSizeInputName" :placeholder="componentes[9][1]"
                                v-model="letraSufijo"
                                @input="this.letraSufijo = this.letraSufijo.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona # placa-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo"># placa</label>
                            <input type="text" class="form-control" id="specificSizeInputName" :placeholder="componentes[10][1]"
                                v-model="NumPlaca" @input="this.NumPlaca = this.NumPlaca.replace(/[^0-9]/g, '');">
                        </div>
                        <!--Selecciona Tipo Cuadrante-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Cuadrante</label>
                            <div class="input-group-text">{{ componentes[11][1] }}</div>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                v-model="TipoCuadran2">
                                <option value="ESTE">Este</option>
                                <option value="NORTE">Norte</option>
                                <option value="OESTE">Oeste</option>
                                <option value="SUR">Sur</option>
                            </select>
                        </div>
                        <!--Selecciona Tipo Barrio-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Barrio</label>
                            <div class="input-group-text">{{ componentes[12][1] }}</div>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                v-model="TipoBarrio">
                                <option value="BR" >Barrio</option>
                                <option value="CD">Ciudadela</option>
                                <option value="SM">Supermanzana</option>
                            </select>
                        </div>
                        <!--Selecciona Name Barrio-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo">Nombre Barrio</label>
                            <input type="text" class="form-control" id="specificSizeInputName" :placeholder="componentes[13][1]"
                                v-model="NameBarrio" @input="this.NameBarrio = this.NameBarrio.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona Tipo Manzana-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Manzana</label>
                            <div class="input-group-text">{{ componentes[14][1] }}</div>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"
                                v-model="TipoManza">
                                <option value="MZ">Manzana</option>
                                <option value="CD">Interior</option>
                                <option value="SM">Sector</option>
                                <option value="ET">Etapa</option>
                                <option value="ED">Edificio</option>
                                <option value="MD">Modulo</option>
                                <option value="TO">Torre</option>
                            </select>
                        </div>
                        <!--Selecciona Identificador Manzana-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="txt">IdManzana</label>
                            <input type="text" class="form-control" id="specificSizeInputName"
                                :placeholder="componentes[15][1]" v-model="IdManzana">
                        </div>
                        <!--Selecciona Tipo Urbanizacion-->
                        <div class="col-sm-3">
                            <label class="visually-hidden" for="specificSizeSelect">Urbanizacion</label>
                            <div class="input-group">
                                <div class="input-group-text">{{ componentes[16][1] }}</div>
                                <v-select style="width: 55%;" aria-describedby="validationServer" :options="[
                                    { code: 'BQ', Tipo: 'Bloque' },
                                    { code: 'CU', Tipo: 'Celula' },
                                    { code: 'CO', Tipo: 'Conjunto Residencial' },
                                    { code: 'ET', Tipo: 'Etapa' },
                                    { code: 'UR', Tipo: 'Urbanizacion' },
                                    { code: 'SC', Tipo: 'Sector' },
                                    { code: 'TO', Tipo: 'Torre' },
                                    { code: 'ZN', Tipo: 'Zona' },
                                ]" :reduce="Tipo => Tipo.code" label="Tipo" v-model="selectedUrban">
                                </v-select>
                                <div class="invalid-feedback" v-if="selectedUrban == null">
                                    Porfavor seleccionar una opcion.
                                </div>
                            </div>
                        </div>
                        <!--Selecciona Urbanizacion-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo">Nombre Urbanizacion</label>
                            <input type="text" class="form-control" id="specificSizeInputName"
                                :placeholder="componentes[17][1]" v-model="NameUrban"
                                @input="this.NameUrban = this.NameUrban.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona Tipo Predio-->
                        <div class="col-sm-3">
                            <label class="visually-hidden" for="specificSizeSelect">Predio</label>
                            <div class="input-group">
                                <div class="input-group-text">{{ componentes[18][1] }}</div>
                                <v-select style="width: 70%;" aria-describedby="validationServer" :options="[
                                    { code: 'AL', Tipo: 'Altillo' },
                                    { code: 'AP', Tipo: 'Apartamento' },
                                    { code: 'BG', Tipo: 'Bodega' },
                                    { code: 'CS', Tipo: 'Casa' },
                                    { code: 'CN', Tipo: 'Consultorio' },
                                    { code: 'DP', Tipo: 'Deposito' },
                                    { code: 'DS', Tipo: 'Deposito Sotano' },
                                    { code: 'GA', Tipo: 'Garaje' },
                                    { code: 'GS', Tipo: 'Garaje Sotano' },
                                    { code: 'LC', Tipo: 'Local' },
                                    { code: 'LM', Tipo: 'Local Mezzanine' },
                                    { code: 'LT', Tipo: 'Lote' },
                                    { code: 'MIN', Tipo: 'Mezzanine' },
                                    { code: 'OF', Tipo: 'Oficina' },
                                    { code: 'PA', Tipo: 'Parqueadero' },
                                    { code: 'PN', Tipo: 'Pent-House' },
                                    { code: 'PL', Tipo: 'Planta' },
                                    { code: 'PD', Tipo: 'Predio' },
                                    { code: 'SS', Tipo: 'Semisotano' },
                                    { code: 'SO', Tipo: 'Sotano' },
                                    { code: 'ST', Tipo: 'Suite' },
                                    { code: 'TZ', Tipo: 'Terraza' },
                                    { code: 'UN', Tipo: 'Unidad' },
                                    { code: 'UL', Tipo: 'Unidad Residencial' },
                                ]" :reduce="Tipo => Tipo.code" label="Tipo" v-model="selectedPredio">
                                </v-select>
                                <div class="invalid-feedback" v-if="selectedPredio == null">
                                    Porfavor seleccionar una opcion.
                                </div>
                            </div>
                        </div>
                        <!--Selecciona IdPredio-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="txt">IdPredio</label>
                            <input type="text" class="form-control" id="specificSizeInputName"
                                :placeholder="componentes[19][1]" v-model="IdPredio">
                        </div>
                        <!--Selecciona Tipo Complemento-->
                        <div class="col-sm-4">
                            <label class="visually-hidden" for="specificSizeSelect">{{ componentes[20][1] }}</label>
                            <div class="input-group">
                                <div class="input-group-text">Complemento</div>
                                <v-select style="width: 60%;" aria-describedby="validationServer" :options="[
                                    { code: 'AD', Tipo: 'Administracion' },
                                    { code: 'AG', Tipo: 'Agrupacion' },
                                    { code: 'AL', Tipo: 'Altillo' },
                                    { code: 'AP', Tipo: 'Apartamento' },
                                    { code: 'BR', Tipo: 'Barrio' },
                                    { code: 'BQ', Tipo: 'Bloque' },
                                    { code: 'BG', Tipo: 'Bodega' },
                                    { code: 'CS', Tipo: 'Casa' },
                                    { code: 'CU', Tipo: 'Celula' },
                                    { code: 'CE', Tipo: 'Centro Comercial' },
                                    { code: 'CD', Tipo: 'Ciudadela' },
                                    { code: 'CO', Tipo: 'Conjunto Residencial' },
                                    { code: 'CN', Tipo: 'Consultorio' },
                                    { code: 'DP', Tipo: 'Deposito' },
                                    { code: 'DS', Tipo: 'Deposito Sotano' },
                                    { code: 'MD', Tipo: 'Modulo' },
                                    { code: 'OF', Tipo: 'Oficina' },
                                    { code: 'PQ', Tipo: 'Parque' },
                                    { code: 'PA', Tipo: 'Parqueadero' },
                                    { code: 'PN', Tipo: 'Pent-House' },
                                    { code: 'PI', Tipo: 'Piso' },
                                    { code: 'PL', Tipo: 'Planta' },
                                    { code: 'PR', Tipo: 'Porteria' },
                                    { code: 'PD', Tipo: 'Predio' },
                                    { code: 'PU', Tipo: 'Puesto' },
                                    { code: 'PR', Tipo: 'Round Point' },
                                    { code: 'ED', Tipo: 'Edificio' },
                                    { code: 'EN', Tipo: 'Entrada' },
                                    { code: 'EQ', Tipo: 'Esquina' },
                                    { code: 'ES', Tipo: 'Estacion' },
                                    { code: 'ET', Tipo: 'Etapa' },
                                    { code: 'EX', Tipo: 'Exterior' },
                                    { code: 'FI', Tipo: 'Finca' },
                                    { code: 'GA', Tipo: 'Garaje' },
                                    { code: 'GS', Tipo: 'Garaje Sotano' },
                                    { code: 'IN', Tipo: 'Interior' },
                                    { code: 'KM', Tipo: 'Kilometro' },
                                    { code: 'LC', Tipo: 'Local' },
                                    { code: 'LM', Tipo: 'Local Mezzanine' },
                                    { code: 'LT', Tipo: 'Lote' },
                                    { code: 'MZ', Tipo: 'Manzana' },
                                    { code: 'MN', Tipo: 'Mezzanine' },
                                    { code: 'SC', Tipo: 'Sector' },
                                    { code: 'SS', Tipo: 'Semisotano' },
                                    { code: 'SO', Tipo: 'Sotano' },
                                    { code: 'ST', Tipo: 'Suite' },
                                    { code: 'SM', Tipo: 'Supermanzana' },
                                    { code: 'TZ', Tipo: 'Terraza' },
                                    { code: 'TO', Tipo: 'Torre' },
                                    { code: 'UN', Tipo: 'Unidad' },
                                    { code: 'UL', Tipo: 'Unidad Residencial' },
                                    { code: 'UR', Tipo: 'Urbanizacion' },
                                    { code: 'ZN', Tipo: 'Zona' },
                                ]" :reduce="Tipo => Tipo.code" label="Tipo" v-model="selectedComple">
                                </v-select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-auto mx-auto mt-4 fs-3">
                                {{ this.selectedVia || '' }}
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
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="SendDirec()" class="btn btn-primary">Guardar cambios</button>
                </div>


            </div>
        </div>
    </div>
</template>

<style scoped></style>

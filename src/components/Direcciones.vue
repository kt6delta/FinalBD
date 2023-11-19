<template>
    <!--ingresar info de Direccion-->
    <div class="row">
        <div class="col-sm-8">
            <div class="form-group">
                <span class="form-label" v-if="this.cont2Pop == 1">Direccion</span>
                <!-- Input que abre la subpestaña -->
                <input class="form-control" type="text" name="direccion" placeholder="Direccion" @click="openModal"
                    v-model="direccion" readonly>
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
                    <form class="row gx-3 gy-2 align-items-center">
                        <!--Selecciona via-->
                        <div class="col-sm-3">
                            <label class="visually-hidden" for="specificSizeSelect">Tipo Via</label>
                            <div class="input-group">
                                <div class="input-group-text">Tipo Via</div>
                                <v-select style="width: 68%;" aria-describedby="validationServer" required :options="[
                                    { code: 'AU', Via: 'Autopista' },
                                    { code: 'AV', Via: 'Avenida' },
                                    { code: 'VI', Via: 'Via' },
                                    { code: 'TV', Via: 'Variante' },
                                    { code: 'TC', Via: 'Troncal' },
                                    { code: 'TV', Via: 'Transversal' },
                                    { code: 'PT', Via: 'Peatonal' },
                                    { code: 'PS', Via: 'Paseo' },
                                    { code: 'PJ', Via: 'Pasaje' },
                                    { code: 'DG', Via: 'Diagonal' },
                                    { code: 'CC', Via: 'Cuentas Corridas' },
                                    { code: 'CV', Via: 'Circunvalar' },
                                    { code: 'CQ', Via: 'Circular' },
                                    { code: 'CT', Via: 'Carretera' },
                                    { code: 'KR', Via: 'Carrera' },
                                    { code: 'CL', Via: 'Calle' },
                                    { code: 'BL', Via: 'Bulevar' },
                                    { code: 'AK', Via: 'Avenida Carrera' },
                                    { code: 'AC', Via: 'Avenida Calle' },
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
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="# ó nombre Via" v-model="idNum">
                        </div>
                        <!--Selecciona letra Via-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra">letra</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="letra Via"
                                v-model="letraVia" @input="this.letraVia = this.letraVia.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona prefijo-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="prefijo">prefijo</label>
                            <div class="input-group">
                                <div class="input-group-text">Prefijo</div>
                                <input type="text" class="form-control" id="specificSizeInputName" v-model="prefijo"
                                    @input="this.prefijo = this.prefijo.toUpperCase();">
                            </div>
                        </div>

                        <!--Selecciona letra prefijo-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra prefijo">letra prefijo</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="letra Prefijo"
                                v-model="letraPrefijo"
                                @input="this.letraPrefijo = this.letraPrefijo.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona Tipo Cuadrante-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Cuadrante</label>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer" v-model="TipoCuadran">
                                <option selected>Cuadrante</option>
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
                                placeholder="# via generadora" v-model="NumViaG"
                                @input="this.NumViaG = this.NumViaG.replace(/[^0-9]/g, '');">
                        </div>
                        <!--Selecciona letraViaG-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra via generadora"></label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="letraViaG"
                                v-model="letraViaG" @input="this.letraViaG = this.letraViaG.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona sufijo-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo">Sufijo</label>
                            <div class="input-group">
                                <div class="input-group-text">Sufijo</div>
                                <input type="text" class="form-control" id="specificSizeInputName" v-model="sufijo"
                                    @input="this.sufijo = this.sufijo.toUpperCase();">
                            </div>
                        </div>
                        <!--Selecciona letra Sufijo-->
                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra prefijo">letra Sufijo</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="letra Sufijo"
                                v-model="letraSufijo"
                                @input="this.letraSufijo = this.letraSufijo.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona # placa-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo"># placa</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="# placa"
                                v-model="NumPlaca" @input="this.NumPlaca = this.NumPlaca.replace(/[^0-9]/g, '');">
                        </div>
                        <!--Selecciona Tipo Cuadrante-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Cuadrante</label>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer" v-model="TipoCuadran2">
                                <option selected>Cuadrante</option>
                                <option value="ESTE">Este</option>
                                <option value="NORTE">Norte</option>
                                <option value="OESTE">Oeste</option>
                                <option value="SUR">Sur</option>
                            </select>
                        </div>
                        <!--Selecciona Tipo Barrio-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Barrio</label>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer"  v-model="TipoBarrio">
                                <option value="BR" selected>Barrio</option>
                                <option value="CD">Ciudadela</option>
                                <option value="SM">Supermanzana</option>
                            </select>
                        </div>
                        <!--Selecciona Name Barrio-->
                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo">Nombre Barrio</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="Nombre Barrio"
                                v-model="NameBarrio" @input="this.NameBarrio = this.NameBarrio.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona Tipo Manzana-->
                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Manzana</label>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer" v-model="TipoManza">
                                <option value="MZ" selected>Manzana</option>
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
                                placeholder="identificador Manzana" v-model="IdManzana">
                        </div>
                        <!--Selecciona Tipo Urbanizacion-->
                        <div class="col-sm-3">
                            <label class="visually-hidden" for="specificSizeSelect">Urbanizacion</label>
                            <div class="input-group">
                                <div class="input-group-text">Urbanizacion</div>
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
                                placeholder="Nombre Urbanizacion" v-model="NameUrban"
                                @input="this.NameUrban = this.NameUrban.replace(/[^a-zA-Z]/g, '');">
                        </div>
                        <!--Selecciona Tipo Predio-->
                        <div class="col-sm-3">
                            <label class="visually-hidden" for="specificSizeSelect">Predio</label>
                            <div class="input-group">
                                <div class="input-group-text">Predio</div>
                                <v-select style="width: 70%;" aria-describedby="validationServer" required :options="[
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
                                placeholder="identificador Predio" v-model="IdPredio">
                        </div>
                        <!--Selecciona Tipo Complemento-->
                        <div class="col-sm-4">
                            <label class="visually-hidden" for="specificSizeSelect">Complemento</label>
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


                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Modal } from 'bootstrap';
export default {
    data() {
        return {
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
        };
    },
    methods: {
        openModal() {
            let modal = new Modal(document.getElementById('direccionModal'));
            modal.show();
        },

    },
    props: {
        cont2Pop: {
            type: Number,
            required: true,
        }
    },
};
</script>
<style scoped></style>

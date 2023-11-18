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

                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Preference</label>
                            <select class="form-select is-invalid" id="specificSizeSelect"
                                aria-describedby="validationServer" required>
                                <option selected>Tipo Via</option>
                                <option value="AU">Autopista</option>
                                <option value="AV">Avenida</option>
                                <option value="AC">Avenida Calle</option>
                                <option value="AK">Avenida Carrera</option>
                                <option value="BL">Bulevar</option>
                                <option value="CL">Calle</option>
                                <option value="KR">Carrera</option>
                                <option value="CT">Carretera</option>
                                <option value="CQ">Circular</option>
                                <option value="CV">Circunvalar</option>
                                <option value="CC">Cuentas Corridas</option>
                                <option value="DG">Diagonal</option>
                                <option value="PJ">Pasaje</option>
                                <option value="PS">Paseo</option>
                                <option value="PT">Peatonal</option>
                                <option value="TV">Transversal</option>
                                <option value="TC">Troncal</option>
                                <option value="TV">Variante</option>
                                <option value="VI">Via</option>
                            </select>
                            <div class="invalid-feedback">
                                Porfavor seleccionar una opcion.
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <label class="visually-hidden" for="txt">txt</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="# ó nombre Via">
                        </div>

                        <div class="col-sm-1">
                            <label class="visually-hidden" for="letra">letra</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="letra Via">
                        </div>

                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Prefijo</label>
                            <v-select :options="[
                            { label: 'Opción 1' },
                            { label: 'Opción 2' },
                            { label: 'Opción 3' },
                            { label: 'Opción 4' }
                            ]">
                            </v-select>
                        </div>


                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra prefijo">letra prefijo</label>
                            <input type="text" class="form-control" id="specificSizeInputName" placeholder="letra prefijo">
                        </div>

                        <div class="col-auto">
                            <label class="visually-hidden" for="specificSizeSelect">Cuadrante</label>
                            <select class="form-select" id="specificSizeSelect" aria-describedby="validationServer">
                                <option selected>Cuadrante</option>
                                <option value="ESTE">Este</option>
                                <option value="NORTE">Norte</option>
                                <option value="OESTE">Oeste</option>
                                <option value="SUR">Sur</option>
                            </select>
                        </div>

                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra"># via generadora</label>
                            <input type="text" class="form-control" id="specificSizeInputName"
                                placeholder="# via generadora">
                        </div>

                        <div class="col-sm-2">
                            <label class="visually-hidden" for="letra via generadora"></label>
                            <input type="text" class="form-control" id="specificSizeInputName"
                                placeholder="letra via generadora">
                        </div>

                        <div class="col-sm-2">
                            <label class="visually-hidden" for="specificSizeInputGroupUsername">Sufijo</label>
                            <div class="input-group">
                                <div class="input-group-text">BIS</div>
                                <input type="text" class="form-control" id="specificSizeInputGroupUsername"
                                    placeholder="Sufijo">
                            </div>
                        </div>

                        <div class="col-auto">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
                                <label class="form-check-label" for="autoSizingCheck2">
                                    Remember me
                                </label>
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
            direccion: "",
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
<template>
  <q-page>
    <!--Titulo titulo="RECAUDACION" icono="business"></Titulo-->
    <q-card>
      <div class="container">
      <div class="row align-items-center justify-content-center">
        <q-banner  class="bg-primary text-white col-xs-12 col-md-12"  >
          <div class="row" style="display: flex; align-items: center; justify-content: center;">
          <div class="col-xs-4 col-md-2" >
            <img src="../assets/logo.png" style="width: 90%;"/>
          </div>
          <div class="col-xs-6 col-md-3 text-center" style="line-height: 0.9em;">

            <p style="font-size: 2em;">TELEPEAJE</p>
            <p>Sistema Inteligente de Peaje</p>
            <p>Ver. 1.0</p>
          </div>
          <!--div class="col-xs-7">
          </div-->
          <div class="col-xs-2 col-md-7">
            <div style="display: flex; align-items: right; justify-content: right;">
              <div>
                <div><strong>REGIONAL:  </strong> {{ datosUsuario.nombre_regional }} </div>
                <div><strong>ESTACION:  </strong> {{ datosUsuario.nombre_reten }} </div>
              </div>
          </div>
          </div>
        </div>
        </q-banner>
      </div>
      <q-card-section>
      <div class="col-xs-12 col-md-12">
      <q-form class="row col-xs-12 col-md-12 q-col-gutter-md q-col-gutter-y-md">
            <q-input
          filled
          class="col-xs-12 col-md-3"
          v-model="texto"
          label="campo"
        ></q-input>
      <div class="col-xs-2 col-md-1 " style="top: 10px">
        <q-btn color="secondary" label="Enviar" class="col-xs-6 col-md-5" type="submit" @click="constanteP(texto)">
          <q-tooltip>Campo</q-tooltip>
        </q-btn>
      </div>
      </q-form>
      </div>
      </q-card-section>
    </div>
      <div class="row text-center text-negative" v-if="valueCaja">
        <h1>NO EXISTE UNA CAJA APERTURADA PARA ESTE USUARIO</h1>
        <!--p style="font-size: 15px;">NO EXISTE UNA CAJA APERTURADA PARA ESTE USUARIO</p-->
      </div>
      <div class="row" v-if="!valueTarifario && !valueCaja ">
        <div class="col-xs-12">
          <q-stepper v-model="step" ref="stepper" alternative-labels color="primary" animated>
            <q-step :name="1" title="Seleccione categoria" icon="settings" :done="step > 1">
              <div class="container" >
                <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                  <div v-for="(item, index) of listCategorias" :key="index" align="center" class="col-grow">
                    <q-btn color="primary" :size="size" text-color="white" style="width: 150px; height: 150px;"
                      @click="selecionCategoria(item); $refs.stepper.next()">
                      {{ item.nombre_categoria }}
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-step>
            <q-step :name="2" title="Seleccione ruta" caption="Optional" icon="create_new_folder" :done="step > 2">
              <div class="container">
                <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                  <div v-for="(item, index) of tarifarios" :key="index" align="center" class="col-grow">
                    <q-btn color="primary" :size="size" text-color="white" style="width: 150px; height: 150px;"
                      @click="selecionRuta(item); $refs.stepper.next()">
                      {{ item.localidad_destino }} - {{ item.localidad_origen }} (Bs. {{ item.importe }})
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-step>
            <q-step :name="3" title="Finalizacion e impresion de boconsto" icon="add_comment">
              <q-card>
                <!--q-card-section class="text-center">
                  BOconstO PREVIO
                </q-card-section-->
                <q-card-section>
                  <div class="row q-col-gutter-md">
                    <div class="col-xs-6 col-md-6">
                      <q-form class="row q-col-gutter-md" @submit="print();">
                        <!--div class="container">
                          <div class="row q-col-gutter-x-md q-col-gutter-y-md"-->
                        <q-field outlined label="Regional" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.regional }}
                        </q-field>
                        <q-field outlined label="Estacion" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.estacion }}
                        </q-field>
                        <q-field outlined label="Carril" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.carril }}
                        </q-field>
                        <q-field outlined label="Categoria" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.categoria }}
                        </q-field>
                        <q-field outlined label="Ruta" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.ruta }}
                        </q-field>
                        <q-field outlined label="Importe" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.importe }}
                        </q-field>
                        <!--q-select v-model="valoresModel.turno" :options="chatas"
                          option-value="id" option-label="nombre" class="col-xs-12 col-md-12" label="Turno"
                          map-options emit-value /-->
                        <!--/div>
                        </div-->
                        <div class="col-xs-12 text-center">
                          <q-btn label="Imprimir" type="submit" color="primary" class="q-ml-sm" style="width: 200px; height: 100px;"/>
                        </div>
                      </q-form>
                    </div>
                    <div class="col-xs-6 col-md-6">
                      <q-img class="col-6" src='../assets/modelo.png' alt=""
                        style="width: 100%; height: 300px;" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <!--q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" /-->
                <q-btn v-if="step > 1" color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </div>
      </div>
      <div class="row" v-if="valueTarifario">
        <div class="col-xs-12">
          <q-stepper v-model="step" ref="stepper" alternative-labels color="primary" animated>
            <q-step :name="1" title="Seleccione categoria y tarifa" icon="settings" :done="step > 1">
              <div class="container" >
                <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                  <div v-for="(item, index) of listTarifario" :key="index" align="center" class="col-grow">
                    <q-btn color="primary" :size="size" text-color="white" style="width: 200px; height: 150px;"
                      @click="selecionRutaCat(item); $refs.stepper.next();">
                     ( {{ item.nombre_categoria}} ) {{ item.localidad_destino }} - {{ item.localidad_origen }} (Bs. {{ item.importe }})
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-step>
            <!--q-step :name="2" title="Seleccione ruta" caption="Optional" icon="create_new_folder" :done="step > 2">
              <div class="container">
                <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                  <div v-for="(item, index) of tarifarios" :key="index" align="center" class="col-grow">
                    <q-btn color="primary" :size="size" text-color="white" style="width: 150px; height: 150px;"
                      @click="selecionRuta(item); $refs.stepper.next()">
                      {{ item.localidad_destino }} - {{ item.localidad_origen }} (Bs. {{ item.importe }})
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-step-->
            <q-step :name="2" title="Finalizacion e impresion de boconsto" icon="add_comment">
              <q-card>
                <q-card-section>
                  <div class="row q-col-gutter-md">
                    <div class="col-xs-6 col-md-6">
                      <q-form class="row q-col-gutter-md" @submit="print();">
                        <q-field outlined label="Regional" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.regional }}
                        </q-field>
                        <q-field outlined label="Estacion" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.estacion }}
                        </q-field>
                        <q-field outlined label="Carril" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.carril }}
                        </q-field>
                        <q-field outlined label="Categoria" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.categoria }}
                        </q-field>
                        <q-field outlined label="Ruta" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.ruta }}
                        </q-field>
                        <q-field outlined label="Importe" stack-label class="col-xs-12 col-md-4">
                          {{ dataImpresion.importe }}
                        </q-field>
                        <div class="col-xs-12 text-center">
                          <q-btn label="Imprimir" type="submit" color="primary" class="q-ml-sm" style="width: 210px; height: 100px;" />
                        </div>
                      </q-form>
                    </div>
                    <div class="col-xs-6 col-md-6">
                      <q-img class="col-6" src='../assets/modelo.png' alt=""
                        style="width: 100%; height: 300px;" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <!--q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" /-->
                <q-btn v-if="step > 1" color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </div>
      </div>
      <div class="row align-items-center justify-content-center">
        <q-banner  class="bg-primary text-white col-xs-12 col-md-12"  >
          <div class="row" style="display: flex; align-items: center; justify-content: center;">
          <div class="col-xs-3 col-md-3" >
            <strong>USUARIO: </strong> {{ datosUsuario.usuario }}
          </div>
          <div class="col-xs-3 col-md-3 ">
            <strong>CARRIL: </strong> {{ datosUsuario.numero_carril }}
          </div>
          <div class="col-xs-3 col-md-3">
            <strong>FECHA: </strong> {{ datosUsuario.fecha_actual }}
          </div>
          <div class="col-xs-3 col-md-3" id="hora">
            <!--strong>HORA: </strong> <p id="hora"></p-->
            <!--div style="display: flex; align-items: right; justify-content: right;">
              <div>
                <div><strong>REGIONAL:  </strong> {{ dataImpresion.regional }} </div>
                <div><strong>ESTACION:  </strong> {{ dataImpresion.estacion }} </div>
              </div>
          </div-->
          </div>
        </div>
        </q-banner>
      </div>
    </q-card>
  </q-page>
  <!--template>
  <div id="boleto2" >
    <div style="width: 400px; height: 310px; background-color: lightblue;">
      <div
        style="width: 90%; height: 200px;  flex-wrap: nowrap; flex-direction: row; justify-content: right; align-items: right;">
        <div class="col-xs-12 col-md-12">
            <center><strong><label>SISTEMA INTELIGENTE DE PEAJE</label></strong></center>
          </div>
        <div class="row ">
          <div class="row col-xs-12 col-md-12">
            <div class="col-xs-5 col-md-5" style="">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<qrcode-vue :value="valueQR" style=" width: 110px; height: 110px; "></qrcode-vue>
            </div>
            <div class="col-xs-7 col-md-7" style=" line-height: 18px; font-size: 18px; ">
              <div class="row">
              <div class="col-xs-8 col-md-8">
              <div id="lbl_fecha" style="">
                <div style="">  </div>
              </div>
              <div id="txt_valor" style="">
                <strong></strong>
              </div>
              <div id="total_literal" style="">
              </div>
              <div id="lbl_carril" style=" font-size: 12px;">Carril :
              </div>
            </div>
            <div class="col-xs-4 col-md-4" >
              <img src="../assets/tele.png" style="width: 80px; height: 80px;"/>
            </div>
          </div>
              <div id="lbl_recaudador" style="width: 100%; font-size: 12px;">Recaudador: </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-md" style="line-height: 16px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="col-xs-12 col-md-12">
              <div id="lbl_reten" class="col-xs-12 col-md-12" style="">
                Estacion: <span > <strong></strong> </span>
              </div>
              <div class="col-xs-12 col-md-12" id="lbl_categoria" style="">Categoria: </div>
              <div id="txt_tramo" style=" ">
                Tramo: <strong></strong>
              </div>
              <div id="numero_boleto" class="col-xs-12 col-md-12" style="">
                <strong></strong>
          </div>
          <center><div class="col-xs-12 col-md-12" style="">---------------------------------------------------</div></center>
          <center><div style="font-size: 12px;  text-align: center; ">
            VIAS BOLIVIAL</div></center>
            <center><div id="txt_mensaje" style="font-size: 10px">Les desea Feliz Navidad y prospero Año Nuevo</div></center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template-->
  <template>
    <div id="boleto2">
      <div style="width: 400px; height: 310px; background-color: lightblue;">
        <div
          style="width: 90%; height: 200px;  flex-wrap: nowrap; flex-direction: row; justify-content: right; align-items: right;">
          <div class="col-xs-12 col-md-12">
            <center><strong><label>SISTEMA INTELIGENTE DE PEAJE</label></strong></center>
          </div>
          <div class="row ">
            <div class="row col-xs-12 col-md-12">
              <div class="col-xs-5 col-md-5" style="">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<qrcode-vue :value="valueQR"
                  style=" width: 110px; height: 110px; "></qrcode-vue>
              </div>
              <div class="col-xs-7 col-md-7" style=" line-height: 18px; font-size: 12px; ">
                <div class="row">
                  <div class="col-xs-8 col-md-8">
                    <div id="lbl_fecha" style="">
                      <div style=""> </div>
                    </div>
                    <div id="txt_valor" style="">
                      <strong></strong>
                    </div>
                    <div id="total_literal" style="width: 100%;">
                    </div>
                    <div id="lbl_reten" class="col-xs-12 col-md-12" style="width: 100%;">
                      Estacion: <span> <strong></strong> </span>
                    </div>
                    <div class="col-xs-12 col-md-12" id="lbl_categoria" style="">Categoria: </div>
                  </div>
                  <div class="col-xs-4 col-md-4">
                    <img src="../assets/tele.png" style="width: 80px; height: 80px;" />
                  </div>
                </div>
                <div id="lbl_recaudador" style="width: 100%; font-size: 12px;">Recaudador: </div>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md" style="line-height: 16px;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="col-xs-12 col-md-12">
              <div id="txt_tramo" style=" ">
                Tramo: <strong></strong>
              </div>
              <div id="numero_boleto" class="col-xs-12 col-md-12" style="">
                <strong></strong>
              </div>
              <center>
                <div class="col-xs-12 col-md-12" style="">---------------------------------------------------</div>
              </center>
              <center>
                <div style="font-size: 12px;  text-align: center; ">
                  <string>BOLETO NO VALIDO</string></div>
              </center>
              <!--center>
                <div id="txt_mensaje" style="font-size: 10px">Les desea Feliz Navidad y prospero Año Nuevo</div>
              </center-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import printJS from 'print-js'
import QrcodeVue from 'qrcode.vue'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_reten',
    type: 'input'
  },
  {
    label: 'Regional',
    field: 'id_regional',
    type: 'input'
  },
  {
    label: 'Cantidad de carriles',
    field: 'num_carril',
    type: 'input'
  }
]

export default {

  components: { QrcodeVue },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/transacciones/obtener_datos_estacion')
    const urlRegistro = ref('/transacciones/Registrar_Transaccion_Recaudador')
    const datosUsuario = ref([])
    const listCategorias = ref([])
    const listTarifario = ref([])
    const tarifarios = ref([])
    const saldoCuenta = ref([])
    const crudModal = ref(false)
    const step = ref(1)
    const hora = ref()
    const reasignarTag = ref(false)
    const size = ref('15px')
    const _storage = inject('storage')
    const valueQR = ref('')
    const valueCaja = ref(false)
    const valueTarifario = ref(false)
    const urlCampo = ref('/transacciones/Registrar_Transaccion_Roceta')
    const resetForm = () => {
    }
    const dataUsuario = ref({
      usuario: null,
      nombre_regional: null,
      nombre_reten: null,
      numero_carril: null,
      fecha_actual: null,
      username: null,
      first_name: null,
      last_name: null,
      nombre_cargo: null
    })
    const dataRegistro = ref({
      id_categoria: null,
      id_tarifario: null
    })
    const dataImpresion = ref({
      regional: null,
      estacion: null,
      carril: null,
      categoria: null,
      ruta: null,
      importe: null,
      nrotransaccion: null
    })
    const boleto = ref({
      fecha: null,
      hora: null,
      importe: null,
      literal: null,
      carril: null,
      estacion: null,
      recaudador: null,
      categoria: null,
      tramo: null,
      boleto: null,
      estado: null
    })
    const chatas = [
      {
        nombre: 'Un eje',
        id: '1'
      },
      {
        nombre: 'Dos ejes',
        id: '2'
      },
      {
        nombre: 'Tres ejes',
        id: '3'
      }
    ]
    const closeModal = (close) => {
      crudModal.value = false
      hora.value = false
      resetForm()
      close()
    }

    const selecionCategoria = async (item) => {
      const result = []
      dataRegistro.value.id_categoria = item.id_categoria
      dataImpresion.value.categoria = item.nombre_categoria
      listTarifario.value.forEach(element => {
        if (element.id_categoria === item.id_categoria) {
          result.push(element)
        }
      })
      tarifarios.value = result
    }
    const selecionRuta = async (item) => {
      dataRegistro.value.id_tarifario = item.id_tarifario
      dataImpresion.value.ruta = item.localidad_origen.toString() + '-' + item.localidad_destino.toString()
      dataImpresion.value.importe = item.importe
    }
    const selecionRutaCat = async (item) => {
      dataRegistro.value.id_tarifario = item.id_tarifario
      dataRegistro.value.id_categoria = item.id_categoria
      dataImpresion.value.ruta = item.localidad_origen.toString() + '-' + item.localidad_destino.toString()
      dataImpresion.value.importe = item.importe
      dataImpresion.value.categoria = item.nombre_categoria
    }
    const getDataE = async () => {
      const rows = await _http.get(`${url.value}`)
      if (!rows.message) {
        datosUsuario.value = rows.datos_estacion
        listCategorias.value = rows.categoria
        listTarifario.value = rows.lista_tarifario
        dataImpresion.value.regional = rows.datos_estacion.nombre_regional
        dataImpresion.value.carril = rows.datos_estacion.numero_carril
        dataImpresion.value.estacion = rows.datos_estacion.nombre_reten
        if (!listCategorias.value && listTarifario.value.length > 0) {
          valueTarifario.value = true
        }
      } else {
        valueCaja.value = true
      }
    }
    const getNombreCompconsto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const guardar = async (update, close) => {
      const rows = await _http.post(`${urlRegistro.value}`, dataRegistro.value)
      if (rows) {
        step.value = 1
        boleto.value = rows
        valueQR.value = rows.fecha.split('-')[0] + rows.fecha.split('-')[1] + rows.fecha.split('-')[2] + 'V' + dataRegistro.value.id_categoria + 'B' + rows.boleto + 'V' + dataRegistro.value.id_tarifario + 'B' + parseInt(rows.estacion, 16) + 'V' + parseInt(rows.categoria, 32) + rows.importe
        // console.log('rows', rows.estacion)
        // document.querySelector('#lbl_reten').innerHTML = 'Estacion: <span style="font-size: 16px; font-weight: bold;">' + boleto.value.tramo + '</span>'
        // this.print()
        // imprimirBoleto()
        // window.print()
      }
      return rows
      // _message.success('Actualizacion realizada de manera correcta.')
    }
    const imprimirBoleto = async (item) => {
      item.then(respo => {
        document.querySelector('#lbl_reten').innerHTML = 'Estacion: <span style=""><strong>' + respo.estacion + '</strong></span>'
        document.querySelector('#lbl_recaudador').innerHTML = 'Recaudador: ' + dataRegistro.value.id_categoria + dataRegistro.value.id_tarifario
      })
      /* document.querySelector('#boleto')
      const printableContent = document.getElementById('boleto')
      const printWindow = window.open('', '', 'height=1000,width=1000')
      printWindow.document.write(printableContent.innerHTML)
      printWindow.print() */
      /* document.querySelector('#lbl_reten').innerHTML = 'Estacion: <span style=""><strong>' + boleto.value.estacion + '</strong></span>'
      document.querySelector('#lbl_recaudador').innerHTML = 'Recaudador: ' + boleto.value.recaudador */
      // document.querySelector('#lbl_categoria').innerHTML = 'Categoria: ' + item.value.categoria
      /* document.querySelector('#total_literal').innerHTML = item.literal
      document.querySelector('#txt_valor').innerHTML = '<strong>' + item.importe + '</strong>'
      document.querySelector('#lbl_fecha').innerHTML = '<strong>' + item.fecha + '</strong>'
      document.querySelector('#lbl_carril').innerHTML = 'Carril: ' + item.carril
      document.querySelector('#numero_boleto').innerHTML = '<strong>' + item.boleto + '</strong>'
      document.querySelector('#txt_tramo').innerHTML = 'Tramo: ' + '<strong>' + item.tramo + '</strong>' */
      /* document.querySelector('#lbl_carril').innerHTML = 'Carril: ' + boleto.value.carril
      document.querySelector('#txt_valor').innerHTML = '<div style="font-size: 18px; font-weight: bold;">' + boleto.value.importe + '</div>' + '<div style="font-size: 12px; line-height: 18px; margin: 0px 5px 0px 2px;"> ' + boleto.value.importe + ' </div>' + '<div style="font-size: 18px; font-weight: bold;"> Bs.</div>'
      document.querySelector('#total_literal').innerHTML = boleto.value.literal + 'BS'
      document.querySelector('#lbl_recaudador').innerHTML = 'Recaudador: ' + boleto.value.recaudador
      document.querySelector('#lbl_categoria').innerHTML = 'Categoria: ' + boleto.value.categoria
      /* const printableContent = document.getElementById('boleto')
      const printWindow = window.open('', '', 'height=1000,width=1000')
      printWindow.document.write(printableContent.innerHTML)
      printWindow.print() */
      // this.print()
    }
    const IMG_URL = _storage.get('imgUrl')
    function horaActual () {
      const clock = new Date()
      const hour = clock.getHours()
      const minutes = clock.getMinutes()
      const seconds = clock.getSeconds()

      hora.value = hour + ':' + minutes + ':' + seconds
      document.querySelector('#hora').innerHTML = '<strong>HORA: </strong>' + hora.value

      // document.subida.hora.value = hora.value
      setTimeout(horaActual, 1000)
    }
    onMounted(async () => {
      // this.$refs.miInput.focus()
      // ref="miInput"
      getDataE()
      horaActual()
      // datosSaldo()
    })
    const constanteP = async (id) => {
      console.log('hola ANDRES tu codigo es', id)
      const body = {
        numero_roseta: id
      }
      const rows = await _http.post(`${urlCampo.value}`, body)
      console.log('rows const', rows)
    }
    return {
      filters,
      url,
      IMG_URL,
      datosUsuario,
      dataRegistro,
      dataImpresion,
      listCategorias,
      listTarifario,
      saldoCuenta,
      crudModal,
      hora,
      dataUsuario,
      urlRegistro,
      reasignarTag,
      size,
      tarifarios,
      step,
      chatas,
      boleto,
      valueQR,
      valueTarifario,
      valueCaja,
      urlCampo,
      constanteP,
      getNombreCompconsto,
      getDataE,
      closeModal,
      selecionCategoria,
      selecionRuta,
      selecionRutaCat,
      guardar,
      imprimirBoleto,
      horaActual
    }
  },
  methods: {
    print () {
      const data = this.guardar()
      data.then(respo => {
        /* document.querySelector('#lbl_reten').innerHTML = 'Estacion: <span style=""><strong>' + respo.estacion + '</strong></span>'
        document.querySelector('#lbl_recaudador').innerHTML = 'Recaudador: ' + respo.recaudador
        document.querySelector('#lbl_categoria').innerHTML = 'Categoria: ' + respo.categoria
        document.querySelector('#total_literal').innerHTML = respo.literal
        document.querySelector('#txt_valor').innerHTML = 'Importe: ' + '<strong>' + respo.importe + '</strong>'
        document.querySelector('#lbl_fecha').innerHTML = '<strong>' + respo.fecha + '</strong>' + '-' + respo.hora
        document.querySelector('#lbl_carril').innerHTML = 'Carril: ' + respo.carril
        document.querySelector('#numero_boleto').innerHTML = 'Cod. Boleto : ' + '<strong>' + respo.boleto + '</strong>'
        document.querySelector('#txt_tramo').innerHTML = 'Tramo: ' + '<strong>' + respo.tramo + '</strong>' */

        document.querySelector('#lbl_reten').innerHTML = '<strong>' + respo.estacion + '</strong>'
        document.querySelector('#lbl_recaudador').innerHTML = 'Recaudador: ' + respo.recaudador
        document.querySelector('#lbl_categoria').innerHTML = respo.categoria
        document.querySelector('#total_literal').innerHTML = respo.literal
        document.querySelector('#txt_valor').innerHTML = 'Importe: ' + '<strong>' + respo.importe + '</strong>'
        document.querySelector('#lbl_fecha').innerHTML = '<strong>' + respo.fecha + '</strong>' + '-' + respo.hora
        // document.querySelector('#lbl_carril').innerHTML = 'Carril: ' + respo.carril
        document.querySelector('#numero_boleto').innerHTML = 'Cod. Boleto : ' + '<strong>' + respo.boleto + '</strong>'
        document.querySelector('#txt_tramo').innerHTML = 'Tramo: ' + '<strong>' + respo.tramo + '</strong>'
        printJS({
          printable: 'boleto2',
          type: 'html',
          onPrintDialogClose: () => {
            // this.numPagesPrinted++
          }
        })
      })
      this.imprimirBoleto(data)
      /* printJS({
        printable: 'boleto2',
        type: 'html',
        onPrintDialogClose: () => {
          // this.numPagesPrinted++
        }
      }) */
    }
  }
}
</script>

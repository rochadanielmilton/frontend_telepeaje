<template>
  <q-card>
    <q-card-section class="col-xs-12 col-md-12">
      <q-banner class="bg-primary text-white">
        Diferencia: {{ valoresModel.diferencia }}
      </q-banner>
    </q-card-section>
    <q-card-section>
      <div class="container">
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <q-field outlined label="Total apertura" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.total_apertura }}
          </q-field>
          <q-field outlined label="Total cierre Sistema" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.total_cierre_sistema }}
          </q-field>
          <q-field outlined label="Total cierre recaudador" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.total_cierre_recaudador }}
          </q-field>
          <q-field outlined label="Turno" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.turno }}
          </q-field>
          <q-field outlined label="Fecha operaciones" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.fecha_operaciones }}
          </q-field>
          <q-field outlined label="Recaudador" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.nombre_recaudador }}
          </q-field>
          <q-field outlined label="Regional" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.nombre_regional }}
          </q-field>
          <q-field outlined label="Reten" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.nombre_reten }}
          </q-field>
          <q-field outlined label="Carril" stack-label class="col-xs-12 col-md-4">
            {{ valoresModel.registroCaja.numero_carril }}
          </q-field>
          <!--q-field outlined label="Regional" stack-label class="col-xs-12 col-md-4">
            {{ empresa.nombre_regional }}
          </q-field>
          <q-field outlined label="Razon social" stack-label class="col-xs-12 col-md-4">
            {{ empresa.razon_social }}
          </q-field>
          <q-field outlined label="Nit" stack-label class="col-xs-12 col-md-4">
            {{ empresa.nit }}
          </q-field>
          <q-field outlined label="Nombre" stack-label class="col-xs-12 col-md-4">
            {{ empresa.nombre }}
          </q-field>
          <q-field outlined label="Direccion" stack-label class="col-xs-12 col-md-4">
            {{ empresa.direccion }}
          </q-field>
          <q-field outlined label="Sector" stack-label class="col-xs-12 col-md-4">
            {{ empresa.sector }}
          </q-field>
          <q-field outlined label="Tipo Empresa " stack-label class="col-xs-12 col-md-4">
            {{ empresa.tipo_empresa }}
          </q-field>
          <q-field outlined label="Correo" stack-label class="col-xs-12 col-md-4">
            {{ empresa.correo }}
          </q-field>
          <q-field outlined label="Telefono" stack-label class="col-xs-12 col-md-4">
            {{ empresa.telefono }}
          </q-field>
          <q-field outlined label="Celular" stack-label class="col-xs-12 col-md-4">
            {{ empresa.celular }}
          </q-field>
          <q-field outlined label="Fecha Creaccion" stack-label class="col-xs-12 col-md-4">
            {{ empresa.created }}
          </q-field>
          <q-field outlined label="Saldo" stack-label class="col-xs-12 col-md-4">
            {{ saldoCuenta }}
          </q-field-->
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-xs-12 text-right">
      <q-btn
        label="Aceptar"
        @click="$emit('cancelar')"
      />
      <q-btn
        label="Imprimir"
        type="submit"
        color="primary"
        class="q-ml-sm"
        @click="exportar()"
      />
      <!--q-btn
        label="Generar PDF"
        type="submit"
        color="primary"
        class="q-ml-sm"
        @click="generate()"
      /-->
    </div>
    </q-card-section>
  </q-card>
</template>
<script>

import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
import { jsPDF as Pdf } from 'jspdf'
import json from '../../json/dataLogo.json'
import 'jspdf-autotable'
export default {
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    // const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const cierrecaja = ref([])
    const valoresRules = ref({})
    const _storage = inject('storage')
    const recaudadores = ref([])
    const base64Img = ref([])
    const urlResumenCaja = ref('/administracion/resumenCierreCaja')
    const estados = [
      {
        nombre: 'deshabilitado',
        id: 'deshabilitado'
      },
      {
        nombre: 'habilitado',
        id: 'habilitado'
      }
    ]
    const regionales = _storage.get('regionales')
    const retenes = _storage.get('retenes')
    const disloques = _storage.get('disloques')

    const generate = async () => {
      console.log('exportarcierre', valoresModel.value)
      const heading = 'REPORTE RESUMEN DE CIERRE DE CAJA'
      const datosCabecera = [
        ['USUARIO : ', valoresModel.value.usuario_actual, 'RECAUDADOR : ', valoresModel.value.registroCaja.nombre_recaudador, 'FECHA/HORA : ', valoresModel.value.fecha_actual],
        ['REGIONAL : ', valoresModel.value.regional, 'RETEN : ', valoresModel.value.reten, 'TURNO : ', valoresModel.value.registroCaja.turno]
      ]
      const datosResumen = [
        ['FECHA APERTURA : ', valoresModel.value.registroCaja.fecha_apertura.split('T')[0], 'FECHA CIERRE : ', valoresModel.value.registroCaja.fecha_cierre.split('T')[0], 'CARRIL : ', valoresModel.value.registroCaja.numero_carril],
        ['TOTAL APERTURA : ', valoresModel.value.registroCaja.total_apertura, 'TOTAL CIERRE SISTEMA : ', valoresModel.value.registroCaja.total_cierre_sistema, 'TOTAL CIERRE RECAUDADOR : ', valoresModel.value.registroCaja.total_cierre_recaudador],
        ['FECHA OPERACIONES : ', valoresModel.value.registroCaja.fecha_operaciones, 'DIFERENCIA : ', valoresModel.value.registroCaja.diferencia, 'EXCEDENTE : ', valoresModel.value.registroCaja.excedente],
        ['ENCARGADO APERTURA : ', valoresModel.value.registroCaja.encargado_apertura, 'OBSERVACIONES : ', valoresModel.value.registroCaja.observacion, 'CONSOLIDADO : ', valoresModel.value.registroCaja.consolidado]
      ]
      const doc = new Pdf({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })
      // doc.setFontSize(16).text('heading', 0.5, 1.0)
      doc.setFontSize(16).text(heading, 0.5, 1.0)
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1)
      const pageNumber = doc.internal.getNumberOfPages()
      doc.setPage(pageNumber)
      doc.autoTable({
        body: datosCabecera,
        margin: { left: 0.5, top: 1.25 }
      })
      doc.autoTable({
        body: datosResumen,
        margin: { left: 0.5, top: 1.25 }
      })
        .save(`${heading}.pdf`)
    }
    const exportar = async () => {
      base64Img.value = json[0].logoBase64
      const headRows = function () {
        return [{
          id: 'Codigo:',
          nombre_recaudador: 'Recaudador:',
          id_disloque: 'Numero Disloque:',
          nombre_reten: 'Regional:'
        }]
      }
      const bodyRows = function (rowCount) {
        rowCount = rowCount || 10
        const body = [{ id: valoresModel.value.registroCaja.id, nombre_recaudador: valoresModel.value.registroCaja.nombre_recaudador, id_disloque: valoresModel.value.registroCaja.id_disloque, nombre_regional: valoresModel.value.registroCaja.nombre_regional }]
        return body
      }
      const headRows1 = function () {
        return [{
          nombre_reten: 'Estacion:',
          numero_carril: 'Carril:',
          turno: 'Turno:',
          encargado_apertura: 'Encargado apertura:'
        }]
      }
      const bodyRows1 = function (rowCount) {
        rowCount = rowCount || 10
        const body = [{ nombre_reten: valoresModel.value.registroCaja.nombre_reten, numero_carril: valoresModel.value.registroCaja.numero_carril, turno: valoresModel.value.registroCaja.turno, encargado_apertura: valoresModel.value.registroCaja.encargado_apertura }]
        return body
      }
      const headRows2 = function () {
        return [{
          fecha_apertura: 'Fecha/hora Apertura:',
          fecha_cierre: 'Fecha/hora Cierre:',
          estado: 'Estado:',
          observacion: 'Observacion:'
        }]
      }
      const bodyRows2 = function (rowCount) {
        rowCount = rowCount || 10
        const body = [{ fecha_apertura: valoresModel.value.registroCaja.fecha_apertura.split('.')[0], fecha_cierre: valoresModel.value.registroCaja.fecha_cierre.split('.')[0], estado: valoresModel.value.registroCaja.estado, observacion: valoresModel.value.registroCaja.observacion }]
        return body
      }
      const headRows3 = function () {
        return [{
          total_apertura: 'Monto Apertura(Bs):',
          total_cierre_sistema: 'Monto Cierre Sistema(Bs):',
          total_cierre_recaudador: 'Total Segun Recaudador(Bs):',
          diferencia: 'Dif. Recaudador-Sistema(Bs):',
          excedente: 'Otro Ingresos:'
        }]
      }
      const bodyRows3 = function (rowCount) {
        rowCount = rowCount || 10
        const body = [{ total_apertura: valoresModel.value.registroCaja.total_apertura, total_cierre_sistema: valoresModel.value.registroCaja.total_cierre_sistema, total_cierre_recaudador: valoresModel.value.registroCaja.total_cierre_recaudador, diferencia: valoresModel.value.registroCaja.diferencia, excedente: valoresModel.value.registroCaja.excedente }]
        return body
      }
      const headRows4 = function () {
        return [{
          total_entrega: 'TOTAL A ENTREGAR (Bs):'
        }]
      }
      const bodyRows4 = function (rowCount) {
        rowCount = rowCount || 10
        const body = [{ total_entrega: parseFloat(valoresModel.value.registroCaja.total_cierre_sistema) + parseFloat(valoresModel.value.registroCaja.excedente) + parseFloat(valoresModel.value.registroCaja.total_apertura) }]
        return body
      }
      const doc = new Pdf({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })
      const totalPagesExp = '{total_pages_count_string}'
      doc.setFontSize(10)
      doc.autoTable({
        head: headRows(),
        body: bodyRows(),
        startY: 2.1,
        didDrawPage: function (data) {
        // Header
          doc.setFontSize(16)
          doc.setTextColor(20)
          // doc.setFontStyle('normal')
          if (base64Img.value) {
            doc.addImage(base64Img.value, 'JPEG', data.settings.margin.left, 0.1, 1.5, 1.5)
          }
          doc.text('VIAS BOLIVIA', data.settings.margin.left + 3.7, 0.75, 'center')
          doc.setFontSize(7.7)
          doc.text('Entidad Renovada, Tecnificada y Transparente para una eficiente', data.settings.margin.left + 3.7, 0.9, 'center')
          doc.text('recaudación de Peaje y Control de Pesos y Dimensiones Vehiculares', data.settings.margin.left + 3.7, 1.05, 'center')
          doc.text('en la Red Vial Fundamental del Estado Plurinacional de Bolivia', data.settings.margin.left + 3.7, 1.2, 'center')
          doc.setFontSize(15)
          doc.text('REPORTE DE CIERRE DE CAJA', data.settings.margin.left + 3.7, 1.6, 'center')
          doc.setFontSize(9)
          doc.text('USUARIO: ', data.settings.margin.left + 0.1, 2)
          doc.text(valoresModel.value.usuario_actual, data.settings.margin.left + 0.8, 2)
          doc.text('E-MAIL: ', data.settings.margin.left + 2.7, 2)
          doc.text(valoresModel.value.usuario_actual, data.settings.margin.left + 3.2, 2)
          doc.text('FECHA/HORA: ', data.settings.margin.left + 5.1, 2)
          doc.text(valoresModel.value.fecha_actual, data.settings.margin.left + 6, 2)
          // Footer
          let str = 'Page' + doc.internal.getNumberOfPages()
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp
          }
          doc.setFontSize(6)
          const pageSize = doc.internal.pageSize
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
          doc.text(str, data.settings.margin.left, pageHeight - 0.5)
        },
        margin: {
          top: 3
        }
      })
      doc.setFontSize(10)
      doc.autoTable({
        head: headRows1(),
        body: bodyRows1(),
        startY: 2.7
      })
      doc.autoTable({
        head: headRows2(),
        body: bodyRows2(),
        startY: 3.3
      })
      doc.autoTable({
        head: headRows3(),
        body: bodyRows3(),
        startY: 3.9
      })
      doc.autoTable({
        head: headRows4(),
        body: bodyRows4(),
        startY: 4.7
      })
      doc.text('EMITE: ', 2.1, 5.5)
      doc.text('RECIBE: ', 5.1, 5.5)
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
      }
      doc.save('detallecierre.pdf')
    }
    onMounted(async () => {
      console.log('DATA', valoresModel.value)
    /*  _http.get('/administracion/datosCreacionCaja/1/242').then(respo => {
        recaudadores.value = respo
      }) */
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      cierrecaja,
      regionales,
      retenes,
      disloques,
      recaudadores,
      urlResumenCaja,
      exportar,
      generate
    }
  }
}
</script>

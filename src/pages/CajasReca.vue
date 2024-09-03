<template>
  <q-page>
    <Titulo
      titulo="Vista Cajas"
      icono="business"
    ></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
    <!--template v-slot:caja="{}">
        <div class="col-xs-12">
          <q-card class="q-ma-md">
            <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
              <div class="col-xs-12 col-md-12">
                  <q-select
                  v-model="id_regional"
                  :options="regionales"
                  option-value="id_regional"
                  option-label="nombre_regional"
                  class="col-xs-12 col-md-3"
                  label="Regional"
                  map-options
                  emit-value
                  />
                  <q-select
                  v-model="id_reten"
                  :options="retenes"
                  option-value="id_reten"
                  option-label="nombre_reten"
                  class="col-xs-12 col-md-3"
                  label="Reten"
                  map-options
                  emit-value
                  />
                  <q-select
                  v-model="id_regional"
                  :options="disloques"
                  option-value="id"
                  option-label="fecha_inicio"
                  class="col-xs-12 col-md-4"
                  label="Disloque"
                  map-options
                  emit-value
                  />
                  <q-btn
                    icon="search"
                    color="secondary"
                    type="Submit"
                    label="Apertura"
                    class="col-xs-12 col-md-2"
                  >
                  </q-btn>
              </div>
          <slot name="buttons-end"></slot>
        </q-toolbar>
          </q-card>
        </div>
      </template-->
      <!--template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nueva caja"
        />
      </template-->
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="home_work"
              size="md"
            />
            <q-toolbar-title>
              {{ caja.id ? 'Editar' : 'Agregar' }} caja
            </q-toolbar-title>
            <q-space />
            <q-btn
              flat
              round
              icon="close"
              @click="closeModal(close)"
            />
          </q-toolbar>
          <q-card-section>
            <Caja
              v-model:valores="caja"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Caja>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:formcierre="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="home_work"
              size="md"
            />
            <q-toolbar-title>
              {{ caja.id ? 'Editar' : 'cierre' }} de caja
            </q-toolbar-title>
            <q-space />
            <q-btn
              flat
              round
              icon="close"
              @click="closeModal(close)"
            />
          </q-toolbar>
          <q-card-section>
            <Cierrecaja
              v-model:valores="cierrecaja"
              @guardar="guardarCierreCaja(update, close)"
              @cancelar="closeModal(close)"
            ></Cierrecaja>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:vistaCierre="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="home_work"
              size="md"
            />
            <q-toolbar-title>
              Vista de cierre de caja
            </q-toolbar-title>
            <q-space />
            <q-btn
              flat
              round
              icon="close"
              @click="closeModal(close)"
            />
          </q-toolbar>
          <q-card-section>
            <VistaCaja
              v-model:valores="dataCierre"
              @guardar="guardarCierreCaja(update, close)"
              @cancelar="closeModal(close)"
            ></VistaCaja>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, openCerrar, openVista}">
        <q-tr>
          <q-td>{{ row.id}}</q-td>
          <q-td>{{ row.nombre_recaudador }}</q-td>
          <q-td>{{ row.fecha_apertura }}</q-td>
          <q-td>{{ row.fecha_cierre }}</q-td>
          <q-td>{{ row.nombre_reten }}</q-td>
          <q-td>{{ row.observacion }}</q-td>
          <q-td>{{ row.turno }}</q-td>
          <q-td>{{ row.estado }}</q-td>
          <q-td>{{ row.total_apertura }}</q-td>
          <!--q-td>{{ row.total_cierre_sistema }}</q-td-->
          <q-td>{{ row.total_cierre_recaudador }}</q-td>
          <!--q-td>
            <Estado :estado="row.estado" />
          </q-td-->
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="curtains_closed"
              :disabled="row.estado === 'Cerrado'? '' : disabled"
              @click="cerrarCaja(openCerrar, row.id)"
            >
            <q-tooltip>Cerrar Caja</q-tooltip>
            </q-btn>
          </q-td>
          <!--q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="currency_exchange"
              :disabled="row.estado === 'Abierto'? '' : disabled"
              @click="vistaCaja(openVista, row.id)"
            >
            <q-tooltip>Consolidar</q-tooltip>
            </q-btn>
          </q-td-->
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              :icon="row.estado === 'Abierto'? 'visibility_off' : 'visibility'"
              :disabled="row.estado === 'Abierto'? '' : disabled"
              @click="vistaCaja(openVista, row.id)"
            >
            <q-tooltip>Vista Caja</q-tooltip>
            </q-btn>
          </q-td>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="download"
              :disabled="row.estado === 'Abierto'? '' : disabled"
              @click="exportar(row.id)"
            >
            <q-tooltip>Descargar</q-tooltip>
          </q-btn>
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Caja from 'components/Formularios/Caja'
import Cierrecaja from 'components/Formularios/Cierrecaja'
import VistaCaja from 'components/Formularios/VistaCaja'
import Estado from '@components/common/Estado'
import { jsPDF as Pdf } from 'jspdf'
import 'jspdf-autotable'
import json from '../json/dataLogo.json'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_cargo',
    type: 'input'
  },
  {
    label: 'Descripcion',
    field: 'descripcion',
    type: 'input'
  },
  {
    label: 'Código',
    field: 'id_cargo',
    type: 'input'
  }
]

const columns = [
  {
    name: 'id',
    label: 'Codigo',
    sortable: false
  },
  {
    name: 'nombre_recaudador',
    label: 'Recaudador',
    sortable: false
  },
  {
    name: 'fecha_apertura',
    label: 'Fecha apertura',
    sortable: false
  },
  {
    name: 'fecha_cierre',
    label: 'Fecha cierre',
    sortable: false
  },
  {
    name: 'nombre_reten',
    label: 'Reten',
    sortable: false
  },
  {
    name: 'observacion',
    label: 'Observaciones',
    sortable: false
  },
  {
    name: 'turno',
    label: 'Turno',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  },
  {
    name: 'total_apertura',
    label: 'Total Aper',
    sortable: false
  },
  {
    name: 'total_cierre_sistema',
    label: 'Total Cierre',
    sortable: false
  },
  {
    name: 'cerrar',
    label: 'Cerrar caja',
    sortable: false
  },
  {
    name: 'vista',
    label: 'Ver caja',
    sortable: false
  },
  {
    name: 'reportes',
    label: 'Descargas',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Caja, Estado, Cierrecaja, VistaCaja },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const _storage = inject('storage')
    const url = ref('/administracion/cajaCarril')
    const urlCierreCaja = ref('/administracion/confirmacionCierreCaja')
    const urlResumenCaja = ref('/administracion/resumenCierreCaja')
    const urlReportCaja = ref('/administracion/resumenTransacicionesSinTag')
    const deuda = ref('/administracion/cajaCarril')
    const dataCierre = ref('/administracion/cajaCarril')
    const base64Img = ref([])
    const caja = ref({
      id: null,
      nombre_recaudador: null,
      nombre_reten: null,
      numero_carril: null,
      fecha_apertura: null,
      fecha_cierre: null,
      encargado_apertura: null,
      observacion: null,
      total_apertura: null,
      total_cierre_sistema: null,
      total_cierre_recaudador: null,
      diferencia: null,
      turno: null,
      fecha_operaciones: null,
      anio: null,
      mes: null,
      dia: null,
      hora: null,
      estado: null,
      id_disloque: null,
      id_recaudador: null,
      id_reten: null
    })
    const cierrecaja = ref({
      id_cajaCarril: null,
      observaciones: null,
      total_cierre_recaudador: null
    })
    const resetForm = () => {
      caja.value = {
        id: null,
        nombre_recaudador: null,
        nombre_reten: null,
        numero_carril: null,
        fecha_apertura: null,
        fecha_cierre: null,
        encargado_apertura: null,
        observacion: null,
        total_apertura: null,
        total_cierre_sistema: null,
        total_cierre_recaudador: null,
        diferencia: null,
        turno: null,
        fecha_operaciones: null,
        anio: null,
        mes: null,
        dia: null,
        hora: null,
        estado: null,
        id_disloque: null,
        id_recaudador: null,
        id_reten: null
      }
      cierrecaja.value = {
        id_cajaCarril: null,
        observaciones: null,
        total_cierre_recaudador: null
      }
    }
    const regionales = _storage.get('regionales')
    const retenes = _storage.get('retenes')
    const disloques = _storage.get('disloques')
    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        caja.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const cerrarCaja = async (openCerrar, id) => {
      resetForm()
      if (id) {
        cierrecaja.value.id_cajaCarril = id
        // cargo.value = await _http.get(`${url.value}/${id}`)
      }
      openCerrar()
    }
    const vistaCaja = async (openVista, id) => {
      dataCierre.value = await _http.get(`${urlResumenCaja.value}/${id}`)
      openVista()
    }
    const exportar = async (id) => {
      const rows = await _http.get(`${urlReportCaja.value}/${id}`)
      const listaReporte = rows.resumen_por_categoria
      base64Img.value = json[0].logoBase64
      const usuario = _storage.get('usuario')
      /* const headRows = function () {
        return [{
          id_regional: 'Regional',
          nombre_recaudador: 'Recaudador:',
          id_disloque: 'Numero Disloque:',
          nombre_reten: 'Regional:'
        }]
      }
      const bodyRows = function (rowCount) {
        rowCount = rowCount || 10
        const body = listRetenes.value
        return body
      } */
      const columns = [
        { title: 'Categoria', dataKey: 'nombre_categoria' },
        { title: 'Importe categoria', dataKey: 'importe_categoria' },
        { title: 'Cantidad', dataKey: 'cantidad_transacciones' },
        { title: 'Importe total', dataKey: 'importe_total' }
      ]
      const doc = new Pdf({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })
      const totalPagesExp = '{total_pages_count_string}'
      doc.setFontSize(10)
      doc.autoTable({
        columns,
        body: listaReporte.value,
        margin: { left: 0.5, top: 1.25 },
        foot: [['RECAUDACION TOTAL', rows.total_recaudado]],
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
          doc.text(usuario.usuario, data.settings.margin.left + 0.8, 2)
          doc.text('E-MAIL: ', data.settings.margin.left + 2.7, 2)
          doc.text(usuario.correoElectronico, data.settings.margin.left + 3.2, 2)
          doc.text('FECHA/HORA: ', data.settings.margin.left + 5.1, 2)
          // doc.text(new Date().getFullYear(), data.settings.margin.left + 6, 2)
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
        }
        /* margin: {
          top: 3
        } */
      })
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
      }
      doc.save('reportecdetallacierrre.pdf')
    }
    /* const exportar = async (id) => {
      const rows = await _http.get(`${urlReportCaja.value}/${id}`)
      const listaReporte = rows.resumen_por_categoria
      const heading = 'REPORTE DE CIERRE DE CAJA'
      const usuario = _storage.get('usuario')
      const datosCabecera = [
        ['USUARIO : ', usuario.usuario, 'E-MAIL : ', usuario.correoElectronico, 'FECHA/HORA : ', rows.fecha]
      ]
      const columns = [
        { title: 'Categoria', dataKey: 'nombre_categoria' },
        { title: 'Importe categoria', dataKey: 'importe_categoria' },
        { title: 'Cantidad', dataKey: 'cantidad_transacciones' },
        { title: 'Importe total', dataKey: 'importe_total' }
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
      doc.text('10 degrees rotated', 20, 140, null, 10)
      doc.autoTable({
        columns,
        body: listaReporte,
        margin: { left: 0.5, top: 1.25 },
        foot: [['RECAUDACION TOTAL', ' ', rows.total_recaudado]]
      })
        .save(`${heading}.pdf`)
    } */
    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      console.log('guardar')
      caja.value.baja = 0
      if (caja.value.id) {
        await _http.put(`${url.value}/${caja.value.id}/`, caja.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}`, caja.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }
    const guardarCierreCaja = async (update, close) => {
      // const rows = await _http.post(`${urlCierreCaja.value}`, cierrecaja.value)
      _http.post(`${urlCierreCaja.value}`, cierrecaja.value).then(resp => {
        console.log('data resp', resp)
        _message.success('Cierre realizado de manera correcta.')
        update()
        closeModal(close)
      }).catch(async error => {
        //  _message.error('Verifique el monto')
        console.log(error)
        update()
        closeModal(close)
      })
      /* console.log('cerrar caja', rows)
      if (rows) {
        console.log('mensaje caja', rows)
      } */
      /* _message.success('Cierre realizado de manera correcta.')
      await update()
      closeModal(close) */
    }
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      caja,
      filters,
      columns,
      url,
      urlCierreCaja,
      urlResumenCaja,
      urlReportCaja,
      regionales,
      retenes,
      disloques,
      cierrecaja,
      dataCierre,
      deuda,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar,
      guardarCierreCaja,
      cerrarCaja,
      vistaCaja,
      exportar
    }
  }
}
</script>

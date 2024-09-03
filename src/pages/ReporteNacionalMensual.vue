<template>
  <q-page>
    <Titulo titulo="Recaudación por Mes, Año y Regional" icono="business"></Titulo>
    <div class="col-xs-12">
      <q-card class="q-ma-md">
        <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
          <div class="col-xs-12 col-md-12">
            <q-form class="row col-xs-12 col-md-12 q-col-gutter-md q-col-gutter-y-md" method="post" @submit="listarRetenes()">
              <q-select v-model="reporte.id_regional" :options="listRegionales" option-value="id_regional"
                option-label="nombre_regional" class="col-xs-12 col-md-3" label="Regional" map-options emit-value />
                <q-select v-model="reporte.anio" :options="anios" option-value="anio"
                option-label="anio" class="col-xs-12 col-md-3" label="Gestion" map-options emit-value />
              <q-select
                filled
                clearable
                v-model="reporte.id_mes"
                :options="meses"
                option-value="id"
                option-label="mes"
                label="Mes"
                map-options
                emit-value
                class="col-xs-12 col-md-3"
                />
                <div class="col-xs-2 col-md-1 " style="top: 10px">
              <q-btn icon="search" color="secondary" type="Submit" label="" class="col-xs-6 col-md-5">
                <q-tooltip>Buscar</q-tooltip>
              </q-btn>
              </div>
              <div class="col-xs-2 col-md-1" style="top: 10px">
              <q-btn icon="download" color="secondary" label="" class="col-xs-6 col-md-5" @click="exportar()">
                <q-tooltip>Exportar</q-tooltip>
              </q-btn>
              </div>
            </q-form>
          </div>
          <slot name="buttons-end"></slot>
        </q-toolbar>
      </q-card>
    </div>
    <div class="row">
      <q-card class="col-xs-12 col-md-12">
        <q-card-section class="col-xs-12 col-md-12">
          <div>
            <q-table class="my-sticky-dynamic"  flat bordered  :rows="listaRecaudacionM" :columns="columns" virtual-scroll  :virtual-scroll-item-size="48" :pagination="pagination" row-key="index" :loading="loading" table-header-class="bg-primary text-white">
              <template v-slot:body-cell="props">
              <q-td
                :props="props"
                :class="(props.row[1]=='RECAUDACIÓN TOTAL')?'bg-primary text-white':'bg-white text-black'"
              >
                {{props.value}}
              </q-td>
            </template>
            </q-table>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { jsPDF as Pdf } from 'jspdf'
import 'jspdf-autotable'
import json from '../json/dataLogo.json'

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

const columns = [
  {
    name: 'index',
    label: 'N°',
    field: 'index'
  },
  {
    name: 'Fecha',
    label: 'Fecha',
    align: 'left',
    field: 1,
    sortable: false
  },
  {
    name: 'Recaudacion',
    label: 'Recaudacion',
    align: 'left',
    field: 2,
    format: val => `${val != null ? val : '0.00'}`,
    sortable: false
  }
]
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/transacciones/reporteMensualNacional')
    // const urlRecUs = ref('/transacciones/transaccionesRecaudadorRegionalFecha')
    const urlData = ref('/transacciones/reporteMensualNacional')
    const listaRecaudacionM = ref([])
    const listRegionales = ref([])
    const listRecaUsus = ref([])
    const totalRecaudado = ref([])
    const retenes = ref([])
    const regional = ref([])
    const fecha = ref([])
    const meses = ref([])
    const anios = ref([])
    const _storage = inject('storage')
    const base64Img = ref([])
    const reporte = ref({
      id_regional: null,
      anio: null,
      id_mes: null
    })

    const recuperarData = async () => {
      const row = await _http.get(`${urlData.value}`)
      anios.value = row.lista_anios
      meses.value = row.lista_meses
      listRegionales.value = row.lista_regionales
    }

    const listarRetenes = async () => {
      const row = await _http.post(`${url.value}`, reporte.value)
      listaRecaudacionM.value = row.recaudacion_mensual
      totalRecaudado.value = row.monto_total_mensual
      regional.value = row.regional_seleccionado.nombre_regional
      fecha.value = row.fecha
      listaRecaudacionM.value.forEach((row, index) => {
        row.index = (row[0] === 'RECAUDACIÓN TOTAL') ? '' : index + 1
        row.unshift((row[0] === 'RECAUDACIÓN TOTAL') ? '' : index + 1)
        row[2] = (row[2] === null) ? '0.00' : row[2]
      })
    }
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const datosDefault = () => {
      const fecha = new Date()
      reporte.value.id_regional = 3
      reporte.value.anio = fecha.getFullYear()
      reporte.value.id_mes = 1
    }
    const exportar = async () => {
      base64Img.value = json[0].logoBase64
      const usuario = _storage.get('usuario')
      const columns = [
        { title: 'N°', dataKey: 'index:' },
        { title: 'Fecha', dataKey: 'fecha' },
        { title: 'Recaudacion', dataKey: 'recaudacion' }
      ]
      const doc = new Pdf({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })
      const totalPagesExp = '{total_pages_count_string}'
      doc.setFontSize(4)
      doc.autoTable({
        columns,
        body: listaRecaudacionM.value,
        margin: { left: 0.5, top: 2.25 },
        styles: { overflow: 'linebreak', fontSize: 9, cellPadding: 0.05 },
        foot: [['RECAUDACION TOTAL', '', totalRecaudado.value === null ? '0.00' : totalRecaudado.value]],
        startY: 2.1,
        didDrawPage: function (data) {
          doc.setFontSize(16)
          doc.setTextColor(20)
          if (base64Img.value) {
            doc.addImage(base64Img.value, 'JPEG', data.settings.margin.left, 0.1, 1.5, 1.5)
          }
          doc.text('VIAS BOLIVIA', data.settings.margin.left + 3.7, 0.75, 'center')
          doc.setFontSize(7.7)
          doc.text('Entidad Renovada, Tecnificada y Transparente para una eficiente', data.settings.margin.left + 3.7, 0.9, 'center')
          doc.text('recaudación de Peaje y Control de Pesos y Dimensiones Vehiculares', data.settings.margin.left + 3.7, 1.05, 'center')
          doc.text('en la Red Vial Fundamental del Estado Plurinacional de Bolivia', data.settings.margin.left + 3.7, 1.2, 'center')
          doc.setFontSize(15)
          doc.text('REPORTE MENSUAL POR REGIONAL', data.settings.margin.left + 3.7, 1.6, 'center')
          doc.setFontSize(9)
          doc.text('USUARIO: ', data.settings.margin.left + 0.1, 2)
          doc.text(usuario.usuario, data.settings.margin.left + 0.8, 2)
          doc.text('REGIONAL: ', data.settings.margin.left + 2.7, 2)
          doc.text(regional.value, data.settings.margin.left + 3.4, 2)
          doc.text('FECHA/HORA: ', data.settings.margin.left + 4.8, 2)
          doc.text(fecha.value.split('T')[0] + ' / ' + (fecha.value.split('T')[1]).split('.')[0], data.settings.margin.left + 5.7, 2)
          let str = 'Page' + doc.internal.getNumberOfPages()
          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp
          }
          doc.setFontSize(6)
          const pageSize = doc.internal.pageSize
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
          doc.text(str, data.settings.margin.left, pageHeight - 0.5)
        }
      })
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
      }
      doc.save('reporteregional.pdf')
    }
    onMounted(async () => {
      recuperarData()
      datosDefault()
    })
    return {
      filters,
      url,
      meses,
      anios,
      listaRecaudacionM,
      retenes,
      listRegionales,
      urlData,
      // listRecaudadores,
      listRecaUsus,
      reporte,
      columns,
      getNombreCompleto,
      listarRetenes,
      recuperarData,
      datosDefault,
      exportar,
      pagination: {
        rowsPerPage: 0
      }
    }
  }
}
</script>

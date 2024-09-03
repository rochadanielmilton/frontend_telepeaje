<template>
  <q-page>
    <Titulo titulo="Recaudacion Anual" icono="business"></Titulo>
    <div class="col-xs-12">
      <q-card class="q-ma-md">
        <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
          <div class="col-xs-12 col-md-12">
            <q-form class="row col-xs-12 col-md-12" method="post" @submit="listaRecaudacionAnual()">
              <q-select v-model="reporte.anio" :options="años" option-value="anio"
                option-label="anio" class="col-xs-12 col-md-6" label="Años" map-options emit-value />
              <div class="col-xs-2 col-md-1 " style="top: 10px">
              <q-btn icon="search" color="secondary" type="Submit" label="" class="col-xs-12 col-md-6">
                <!-- q-tooltip>{{ enableSearch ? 'Cerrar filtros' : 'Abrir filtros' }}</q-tooltip-->
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
            <q-table :rows="listaRecaudacionA" :columns="columns" virtual-scroll  :virtual-scroll-item-size="48" :pagination="pagination" row-key="index" :loading="loading" table-header-class="bg-primary text-white">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.value }}
                  </q-td>
                </q-tr>
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
    name: 'Mes/Regional',
    label: 'Mes',
    align: 'left',
    field: 1,
    sortable: false
  },
  {
    name: 'ENERO',
    label: 'ENERO',
    align: 'left',
    field: 2,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'FEBRERO',
    label: 'FEBRERO',
    align: 'left',
    field: 3,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'MARZO',
    label: 'MARZO',
    align: 'left',
    field: 4,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'ABRIL',
    label: 'ABRIL',
    align: 'left',
    field: 5,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'MAYO',
    label: 'MAYO',
    align: 'left',
    field: 6,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'JUNIO',
    label: 'JUNIO',
    align: 'left',
    field: 7,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'JULIO',
    label: 'JULIO',
    align: 'left',
    field: 8,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'AGOSTO',
    label: 'AGOSTO',
    align: 'left',
    field: 9,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'SEPTIEMBRE',
    label: 'SEPTIEMBRE',
    align: 'left',
    field: 10,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'OCTUBRE',
    label: 'OCTUBRE',
    align: 'left',
    field: 11,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'NOVIEMBRE',
    label: 'NOVIEMBRE',
    align: 'left',
    field: 12,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'DICIEMBRE',
    label: 'DICIEMBRE',
    align: 'left',
    field: 13,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  },
  {
    name: 'SUB TOTAL',
    label: 'SUB TOTAL',
    align: 'left',
    field: 14,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  }
]
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/transacciones/reporteNacionalAnual')
    const urlRecarga = ref('/empadronamiento/formularioRecarga')
    // const urlRecUs = ref('/transacciones/transaccionesRecaudadorRegionalFecha')
    const listReca = ref('/parametros/listaUsuariosDeRegional')
    const listaRecaudacionA = ref([])
    const listRegionales = ref([])
    const retenes = ref([])
    const fecha = ref([])
    const base64Img = ref([])
    const recaudacionNacionalAnual = ref([])
    const _storage = inject('storage')
    // const resetForm = () => {
    // }

    const reporte = ref({
      anio: null
    })

    // const closeModal = (close) => {
    //  resetForm()
    //  close()
    // }
    // listarRetenes
    const listaRecaudacionAnual = async () => {
      const row = await _http.post(`${url.value}`, reporte.value)
      listaRecaudacionA.value = row.recaudacion_anual
      // listRecaudadores.value = row.lista_recaudadores
      recaudacionNacionalAnual.value = row.recaudacion_nacional_anual
      listaRecaudacionA.value.forEach((row, index) => {
        row.index = (row[0] === 'RECAUDACIÓN TOTAL') ? '' : index + 1
        row.unshift((row[0] === 'RECAUDACIÓN TOTAL') ? '' : index + 1)
        // row.index = index + 1
      })
    }
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const años = [
      {
        anio: 2017
      },
      {
        anio: 2018
      },
      {
        anio: 2019
      },
      {
        anio: 2020
      },
      {
        anio: 2021
      },
      {
        anio: 2022
      },
      {
        anio: 2023
      },
      {
        anio: 2024
      },
      {
        anio: 2025
      },
      {
        anio: 2026
      },
      {
        anio: 2027
      },
      {
        anio: 2028
      },
      {
        anio: 2029
      },
      {
        anio: 2030
      }
    ]
    const datosDefault = () => {
      const fecha = new Date()
      reporte.value.anio = fecha.getFullYear()
    }
    const exportar = async () => {
      fecha.value = new Date()
      base64Img.value = json[0].logoBase64
      const usuario = _storage.get('usuario')
      const columns = [
        { title: 'N°', dataKey: 'index:' },
        { title: 'Mes', dataKey: 'mes' },
        { title: 'ENERO', dataKey: 'enero' },
        { title: 'FEBRERO', dataKey: 'febrero' },
        { title: 'MARZO', dataKey: 'marzo' },
        { title: 'ABRIL', dataKey: 'abril' },
        { title: 'MAYO', dataKey: 'mayo' },
        { title: 'JUNIO', dataKey: 'junio' },
        { title: 'JULIO', dataKey: 'julio' },
        { title: 'AGOSTO', dataKey: 'agosto' },
        { title: 'SEPTIEMBRE', dataKey: 'septiembre' },
        { title: 'OCTUBRE', dataKey: 'octubre' },
        { title: 'NOVIEMBRE', dataKey: 'noviembre' },
        { title: 'DICIEMBRE', dataKey: 'diciembre' }
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
        body: listaRecaudacionA.value,
        margin: { left: 0.5, top: 2.25 },
        styles: { overflow: 'linebreak', fontSize: 9 },
        foot: [['RECAUDACION TOTAL', '', recaudacionNacionalAnual.value === null ? '0.00' : recaudacionNacionalAnual.value]],
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
          doc.text('REPORTE NACIONAL ANUAL', data.settings.margin.left + 3.7, 1.6, 'center')
          doc.setFontSize(9)
          doc.text('USUARIO: ', data.settings.margin.left + 0.1, 2)
          doc.text(usuario.usuario, data.settings.margin.left + 0.8, 2)
          doc.text('REGIONAL: ', data.settings.margin.left + 2.7, 2)
          // doc.text(regional.value, data.settings.margin.left + 3.4, 2)
          doc.text('FECHA/HORA: ', data.settings.margin.left + 4.8, 2)
          doc.text(fecha.value.toString().split('GMT')[0], data.settings.margin.left + 5.7, 2)
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
      const regionales = _storage.get('regionales')
      regionales.push({
        id_regional: 0,
        nombre_regional: 'Todos'
      })
      listRegionales.value = regionales
      datosDefault()
    })
    return {
      filters,
      url,
      años,
      listaRecaudacionA,
      retenes,
      urlRecarga,
      listRegionales,
      listReca,
      // listRecaudadores,
      reporte,
      columns,
      getNombreCompleto,
      // closeModal,
      exportar,
      listaRecaudacionAnual,
      datosDefault,
      pagination: {
        rowsPerPage: 0
      }
    }
  }
}
</script>

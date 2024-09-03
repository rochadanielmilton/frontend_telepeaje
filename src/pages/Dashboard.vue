<template>
  <q-page>
    <Titulo
      titulo="Dashboard"
      icono="dashboard"
    ></Titulo>
    <q-card
      class="q-mx-md"
      style="min-height: 300px;"
    >
      <q-card-section>
        <p class="text-h5 text-bold text-center">SISTEMA INTELIGENTE DE PEAJE</p>
        <p class="text-h5 text-bold text-center">ESTADO DE RECAUDACION</p>
      </q-card-section>
    <div class="row">

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card border-primary">
      <q-card-section>
        <div class="text-caption text-grey">
          Monto recaudado en Bs
        </div>
        <div class="row">
          <div class="text-caption text-grey">
            <q-icon
              name="attach_money"
              size="md"
            />
        </div>
        <div id="total" class="text-primary">Data</div>
      </div>
      </q-card-section>
    </q-card>
  </div>

      <q-card-section class="col-xs-12 col-md-12">
        <q-banner class="bg-primary text-white">
          TRANSACCIONES
        </q-banner>
      </q-card-section>
      <q-card-section class="col-xs-12 col-md-12">
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <q-field outlined label="Codigo de boleto" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.codigo_boleto }}
          </q-field>
          <q-field outlined label="Regional" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.nombre_regional }}
          </q-field>
          <q-field outlined label="Reten" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.nombre_reten }}
          </q-field>
          <q-field outlined label="Categoria" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.nombre_categoria }}
          </q-field>
          <q-field outlined label="Ruta" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.nombre_ruta }}
          </q-field>
          <q-field outlined label="Recaudador" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.nombre_recaudador }}
          </q-field>
          <q-field outlined label="Carril" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.id_carril }}
          </q-field>
            <q-field outlined label="Localidad Inicio" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.localidad_inicio }}
          </q-field>
          <q-field outlined label="Localidad Fin" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.localidad_fin }}
          </q-field>
          <q-field outlined label="Importe" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.importe_recaudador }}
          </q-field>
          <q-field outlined label="Fecha" stack-label class="col-xs-12 col-md-3">
            {{ ListadoTransacciones.fecha }}
          </q-field>
        </div>
      </q-card-section>
      <q-card-section class="col-xs-12 col-md-12">
        <div>
          <q-table :rows="listmonitor" :columns="columnaTransacciones" row-key="name">
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
      <q-card-section class="col-xs-12 col-md-12">
        <q-field outlined label="Total" stack-label class="col-xs-12 col-md-12">
        {{ monitorTotal }}
        </q-field>
      </q-card-section>
    </div>
    </q-card>
  </q-page>

</template>

<script>
import { ref, inject, onMounted } from 'vue'
const columnaTransacciones = [
  {
    name: 'id_categoria',
    required: true,
    align: 'center',
    label: 'Categoria',
    field: 'id_categoria',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'nombre_categoria',
    align: 'center',
    label: 'Nombre categoria',
    field: 'nombre_categoria',
    sortable: true
  },
  {
    name: 'importe',
    align: 'center',
    label: 'Importe',
    field: 'importe',
    sortable: true
  },
  {
    name: 'cantidad',
    align: 'center',
    label: 'Cantidad',
    field: 'cantidad',
    sortable: true
  },
  {
    name: 'importe_total',
    align: 'center',
    label: 'Ruta',
    field: 'importe_total',
    sortable: true
  }
]
const columns = [
  {
    name: 'codigo_boleto',
    label: 'Codigo boleto',
    sortable: false
  },
  {
    name: 'nombre_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'nombre_reten',
    label: 'Reten',
    sortable: false
  },
  {
    name: 'nombre_categoria',
    label: 'Tiene Categoria',
    sortable: false
  },
  {
    name: 'nombre_ruta',
    label: 'Ruta',
    sortable: false
  },
  {
    name: 'nombre_recaudador',
    label: 'Recaudador',
    sortable: false
  },
  {
    name: 'id_carril',
    label: 'Carril',
    sortable: false
  }
]
export default {
  components: { },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _storage = inject('storage')
    const url = ref('/transacciones/monitorApi')
    const ListadoTransacciones = ref([])
    const listmonitor = ref([])
    const monitorTotal = ref([])
    const cargarData = async () => {
      const rutalist = await _http.get('/parametros/listaRutas')
      _storage.set('rutas', rutalist)
      const regionalist = await _http.get('/parametros/listaRegionales')
      _storage.set('regionales', regionalist)
      const categorialist = await _http.get('/parametros/listaCategorias')
      _storage.set('categorias', categorialist)
      const localidadlist = await _http.get('/parametros/listaLocalidades')
      _storage.set('localidades', localidadlist)
      const cargolist = await _http.get('/parametros/cargos')
      _storage.set('cargo', cargolist)
      const grupos = await _http.get('/administracion/grupos')
      _storage.set('grupo', grupos)
      const tipoContingencias = await _http.get('/contingencias/listaTipoContingencia')
      _storage.set('tipoContingencias', tipoContingencias)
      const menus = await _http.get('/administracion/menu')
      _storage.set('menus', menus)
      const listConten = await _http.get('/administracion/listaContentType')
      const pempadronamiento = await _http.get('/empadronamiento/pempadronamiento/')
      _storage.set('pempadronamiento', pempadronamiento)
      _storage.set('listaC', listConten)
      const reteneslist = await _http.get('/parametros/listaRetenes')
      _storage.set('retenes', reteneslist)
      /* const disloquelist = await _http.get('/administracion/listaDisloquesParaApertura')
      _storage.set('disloques', disloquelist) */
    }
    /*
    const resetForm = () => {
      listaTransacciones = {
        codigo_boleto: null,
        nombre_regional: null,
        nombre_reten: null,
        nombre_categoria: null,
        nombre_ruta: null,
        nombre_recaudador: null,
        id_carril: null,

      }
    } */
    const getDataE = async () => {
      const rows = await _http.get(`${url.value}`)
      console.log('dataossss', rows)
      ListadoTransacciones.value = rows.transacciones
      listmonitor.value = rows.monitor
      monitorTotal.value = rows.monitor_total
    }
    onMounted(() => {
      getDataE()
      cargarData()
      /* const refreshInterval = 2000
       setInterval(() => {
        console.log('se actualiza')
        getDataE()
      }, refreshInterval) */
    })
    return {
      url,
      columns,
      ListadoTransacciones,
      columnaTransacciones,
      listmonitor,
      monitorTotal,
      getDataE,
      cargarData
    }
  }
}
</script>

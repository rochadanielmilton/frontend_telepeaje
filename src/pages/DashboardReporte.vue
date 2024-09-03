<template>
  <q-page>
    <Titulo
      titulo="Dashboard Reporte"
      icono="dashboard"
    ></Titulo>
    <q-card
      class="q-mx-md"
      style="min-height: 300px;"
    >
      <q-card-section>
        <p class="text-h5 text-bold text-center">REPORTES DE PEAJE</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { inject, onMounted } from 'vue'
export default {
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _storage = inject('storage')

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
      _storage.set('menu', menus)
      const listConten = await _http.get('/administracion/listaContentType')
      const pempadronamiento = await _http.get('/empadronamiento/pempadronamiento/')
      _storage.set('pempadronamiento', pempadronamiento)
      _storage.set('listaC', listConten)
      const reteneslist = await _http.get('/parametros/listaRetenes')
      _storage.set('retenes', reteneslist)
      /* const disloquelist = await _http.get('/administracion/listaDisloquesParaApertura')
      _storage.set('disloques', disloquelist) */
    }
    onMounted(() => {
      cargarData()
    })
    return {
      cargarData
    }
  }
}
</script>

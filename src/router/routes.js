const _storage = window.localStorage
const prefix = 'app'

const codificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.btoa(value)
}

const decodificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.atob(value)
}

const guardLogin = (to, from, next) => {
  const menu = _storage.getItem(codificar(`${prefix}_menu`))
  if (_storage.getItem(codificar(`${prefix}_token`)) && menu && _storage.getItem(codificar(`${prefix}_usuario`))) {
    if (from.path.includes('/app/')) {
      next({ path: `${JSON.parse(decodificar(menu))[0].ruta}`, replace: true })
    } else {
      /* if ((JSON.parse(decodificar(menu))[0].ruta) === 'test') {
        next({ path: '/app/dashboard', replace: true })
      } */
      next({ path: `/app/${JSON.parse(decodificar(menu))[0].ruta}`, replace: true })
    }
  } else {
    next()
  }
}

const guardApp = (to, from, next) => {
  if (_storage.getItem(codificar(`${prefix}_token`))) {
    next()
  } else {
    _storage.clear()
    next('/')
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/OutLoginLayout.vue'),
    beforeEnter: guardLogin,
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/app/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: guardApp,
    children: [
      { path: 'parametros', name: 'parametros', component: () => import('pages/Dashboard.vue') },
      { path: 'parametros/categorias', name: 'categorias', component: () => import('pages/Categoris.vue') },
      { path: 'parametros/tarifarios', name: 'tarifarios', component: () => import('pages/Tarifarios.vue') },
      { path: 'parametros/rutas', name: 'rutas', component: () => import('pages/Rutas.vue') },
      { path: 'parametros/regionales', name: 'regionales', component: () => import('pages/Regionales.vue') },
      { path: 'parametros/cargos', name: 'cargos', component: () => import('pages/Cargos.vue') },
      { path: 'parametros/entidadfinancieras', name: 'entidadfinancieras', component: () => import('pages/EntidadFinancieras.vue') },
      { path: 'parametros/localidades', name: 'localidades', component: () => import('pages/Localidades.vue') },
      { path: 'parametros/retenes', name: 'retenes', component: () => import('pages/Retenes.vue') },
      { path: 'administra', name: 'administracion', component: () => import('pages/Dashboard.vue') },
      { path: 'administra/menus', name: 'menus', component: () => import('pages/Menus.vue') },
      { path: 'administra/grupos', name: 'grupos', component: () => import('pages/Grupos.vue') },
      { path: 'administra/grupomenus', name: 'grupomenus', component: () => import('pages/GrupoMenus.vue') },
      { path: 'administra/users', name: 'users', component: () => import('pages/Users.vue') },
      { path: 'administra/disloques', name: 'disloques', component: () => import('pages/Disloques.vue') },
      { path: 'administra/disloques/detalleDisloque', component: () => import('pages/DetalleDisloque.vue') },
      { path: 'administra/disloques/generardisloque', component: () => import('pages/DisloquesG.vue') },
      { path: 'administra/cajas', name: 'cajas', component: () => import('pages/Cajas.vue') },
      { path: 'contingencia', name: 'contingencia', component: () => import('pages/Dashboard.vue') },
      { path: 'contingencia/gestion', name: 'contingencias', component: () => import('pages/Contingencias.vue') },
      { path: 'empa', name: 'empadronamiento', component: () => import('pages/Dashboard.vue') },
      { path: 'empa/cuentas', name: 'cuentas', component: () => import('pages/Cuentas.vue') },
      { path: 'empa/cuentas/cuentaempresa', component: () => import('pages/CuentaEmpresas.vue') },
      { path: 'empa/puntoempadronamiento', name: 'puntoempadronamiento', component: () => import('pages/PuntoEmpadronamiento.vue') },
      { path: 'empa/tags', name: 'tags', component: () => import('pages/Tags.vue') },
      { path: 'post', name: 'postclasificacion', component: () => import('pages/Dashboard.vue') },
      { path: 'post/postclasificacion', name: 'validacion', component: () => import('pages/Postclasificacion.vue') },
      { path: 'post/listadoTransacciones', name: 'transaccion', component: () => import('pages/ListadoTransacciones.vue') },
      { path: 'reporte', name: 'reportes', component: () => import('pages/Dashboard.vue') },
      { path: 'reporte/reporteTransReg', name: 'reporteTransReg', component: () => import('pages/ReporteTurnoRegionalReten.vue') },
      { path: 'reporte/recaudacionesRetenRegional', name: 'recaudacionesRetenRegional', component: () => import('pages/ReporteReg.vue') },
      { path: 'reporte/reporteRecauRegio', component: () => import('pages/ReporteRecaudadorRegional.vue') },
      { path: 'reporte/reporteNacionalMensual', component: () => import('pages/ReporteNacionalMensual.vue') },
      { path: 'reporte/reporteRegionalA', component: () => import('pages/ReporteRegionalAnual.vue') },
      { path: 'reporte/reporteAnual', component: () => import('pages/ReporteAnual.vue') },
      { path: 'reporte/reporteNacionalAnual', component: () => import('pages/ReporteNacionalAnual.vue') },
      { path: 'reporte/reporteRecaudacionRango', component: () => import('pages/ReporteRecaudacionRango.vue') },
      { path: 'vehiculos', component: () => import('pages/Vehiculos.vue') },
      { path: 'empresa', component: () => import('pages/agregarEmpresas.vue') },
      { path: 'listarempresa', component: () => import('pages/ListarEmpresas.vue') },
      { path: 'cuentapersona', component: () => import('pages/CuentaPersona.vue') },
      { path: 'contratos', component: () => import('pages/Contratos.vue') },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'entidades', name: 'entidades', component: () => import('pages/Entidades.vue') },
      { path: 'roles', name: 'roles', component: () => import('pages/Roles.vue') },
      { path: 'usuarios', name: 'usuarios', component: () => import('pages/Usuarios.vue') },
      { path: 'permisos', component: () => import('pages/Permisos.vue') },
      { path: 'cajas', component: () => import('pages/Cajas.vue') },

      { path: 'validacion', component: () => import('pages/DetalleTransaccion.vue') },
      { path: 'controsEmpresas', component: () => import('pages/ContratoEmpresas.vue') },
      { path: 'controsPersonas', component: () => import('pages/ContratoPersona.vue') },
      { path: 'historialRecarga', component: () => import('pages/HistorialRecarga.vue') },
      { path: 'recaudacion', component: () => import('pages/Recaudacion.vue') },
      { path: 'cajasReca', component: () => import('pages/CajasReca.vue') },
      { path: 'interoperabilidad', name: 'interoperabilidad', component: () => import('pages/Interoperabilidad.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

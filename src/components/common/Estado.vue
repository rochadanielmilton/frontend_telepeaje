<template>
  <section>
    <q-chip
      v-if="estado === 'habilitado'"
      square
      color="info"
      text-color="white"
      label="HABILITADO"
    />
    <q-chip
      v-if="estado === 'deshabilitado'"
      square
      color="warning"
      text-color="white"
      label="DESHABILITADO"
    />
  </section>
</template>
<script>
export default {
  props: {
    estado: {
      type: String,
      default: () => 'habilitado'
    }
  }
}
</script>

<template>
  <section>
    <q-chip
      v-if="asignado === 'si' && estado === 'habilitado'"
      square
      color="primary"
      text-color="white"
      label="VER"
    />
    <q-chip
      v-if="asignado === 'no' && estado === 'habilitado'"
      square
      color="positive"
      text-color="white"
      label="DISPONIBLE"
    />
    <q-chip
      v-if="asignado === 'si' && estado === 'deshabilitado'"
      square
      color="negative"
      text-color="white"
      label="NO DISPONIBLE"
    />
  </section>
</template>
<script>
export default {
  props: {
    asignado: {
      type: String,
      default: () => 'si'
    },
    estado: {
      type: String,
      default: () => 'habilitado'
    }
  }
}
</script>

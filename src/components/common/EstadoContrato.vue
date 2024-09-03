<template>
  <section>
    <q-chip
      v-if="estado === 0"
      square
      color="positive"
      text-color="white"
      label="VIGENTE"
    />
    <q-chip
      v-if="estado === 2"
      square
      color="warning"
      text-color="white"
      label="A VENCER"
    />
    <q-chip
      v-if="estado === 1"
      square
      color="negative"
      text-color="white"
      label="CONCLUIDO"
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

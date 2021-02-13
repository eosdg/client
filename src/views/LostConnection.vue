<template>
<b-jumbotron header="Verbindung verloren">
  <h6>Du hast die Verbindung zum Server verloren.</h6>
  <b-button @click="$router.push('/')">Zurück zur Startseite</b-button>
</b-jumbotron>
</template>

<script>
export default {
name: "LostConnection"
}
</script>

<style scoped>

</style>

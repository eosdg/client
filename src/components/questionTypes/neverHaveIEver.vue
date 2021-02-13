<template>
  <div>
    <b-card header="Ich habe noch nie...">
      <h2>{{question.question}}</h2>
      <hr>
      <div style="display: flex; justify-content: center">
        <b-button-group class="w-100">
          <b-button variant="outline-primary">Doch</b-button>
          <b-button variant="outline-primary">Noch nie</b-button>
        </b-button-group>
      </div>
    </b-card>

  </div>
</template>

<script>
import questionMixin from "@/components/questionTypes/questionMixin";

export default {
name: "neverHaveIEver",
  mixins: [questionMixin]
}
</script>

<style scoped>

</style>

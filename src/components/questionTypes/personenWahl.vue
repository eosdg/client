<template>
  <div>
    <b-card header="Wählt einen Mitspieler">
      <h2>{{ question.question }}</h2>
      <hr>
      <div style="display: flex; justify-content: center">
        <b-button-group vertical style="max-width: 400px">
          <b-button :key="solution+index" v-for="(solution, index) in participants" variant="outline-primary"
                    :disabled="disabled" @click="answer(solution)">
            {{ solution }}
          </b-button>
        </b-button-group>
      </div>
    </b-card>

  </div>
</template>

<script>
import questionMixin from "@/components/questionTypes/questionMixin";

export default {
  name: "personenWahl",
  mixins: [questionMixin]
}
</script>

<style scoped>

</style>

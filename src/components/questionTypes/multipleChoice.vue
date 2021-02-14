<template>
  <div>
    <b-card header="Multiple Choice">
      <h2>{{ question.question }}</h2>
      <hr>
      <div style="display: flex; justify-content: center">
        <b-button-group class="w-100">
          <b-button :key="solution+index" v-for="(solution, index) in question['solutions']" variant="outline-primary"
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
  name: "neverHaveIEver",
  mixins: [questionMixin]
}
</script>

<style scoped>

</style>

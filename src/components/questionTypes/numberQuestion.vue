<template>
  <div>
    <b-card header="Schätzfrage">
      <h2>{{ question.question }}</h2>
      <hr>
      <div style="display: flex; justify-content: center">
        <div style="max-width: 400px">
          <b-input :disabled="disabled" type="number" placeholder="Deine Schätzung" v-model="inputData" @keydown.native="test_keydown_handler"></b-input>
          <b-button :disabled="disabled" @click="answer(inputData)" class="w-100">Senden</b-button>
        </div>
      </div>
    </b-card>

  </div>
</template>

<script>
import questionMixin from "@/components/questionTypes/questionMixin";

export default {
  name: "numberquestion",
  mixins: [questionMixin],
  data() {
    return {
      inputData: null
    }
  },
  methods: {
    test_keydown_handler(event) {
      if (event.keyCode === 13) {
        this.answer(this.inputData);

      }
    }
  },
}
</script>

<style scoped>

</style>

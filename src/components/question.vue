<template>
  <div>
    <b-progress class="mb-2" :value="time" :max="question['timeLimit']" :variant="time/question['timeLimit']>0.2?'warning':'danger'"/>
    <b-collapse :visible="time>0">
      <component :is="comp" :gameID="gameID" :question="question.question" :participants="participants" class="mb-3"/>
    </b-collapse>
  </div>
</template>

<script>
import neverHaveIEver from "@/components/questionTypes/neverHaveIEver";
import unknown from "@/components/questionTypes/unknown";
import questionMixin from "@/components/questionTypes/questionMixin";
import multipleChoice from "@/components/questionTypes/multipleChoice";
import numberQuestion from "@/components/questionTypes/numberQuestion";
import mehrheitsWahl from "@/components/questionTypes/mehrheitsWahl";
import personenWahl from "@/components/questionTypes/personenWahl";

export default {
  name: "question",
  props: {
    amIHost: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      time: 0,
      timer: null
    }
  },
  mixins: [questionMixin],
  computed: {
    comp() {
      console.log(this.question.question.type);
      switch (this.question.question.type) {
        case "neverHaveIever":
          return neverHaveIEver;
        case "multipleChoice":
          return multipleChoice;
        case "number":
          return numberQuestion;
        case "majority":
          return mehrheitsWahl;
        case "voting":
          return personenWahl;
        default:
          return unknown;
      }
    }
  },
  created() {
    this.time = this.question["timeLimit"];
    this.timer = setInterval(function () {
      this.time -= 0.1;
      if (this.time <= 0) {
        this.answer(null);
        clearInterval(this.timer);
      }
    }.bind(this), 100);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>

</style>

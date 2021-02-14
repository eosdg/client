<template>
  <div>
    <component :is="comp" :gameID="gameID" :question="question.question" class="mb-3"/>
  </div>
</template>

<script>
import neverHaveIEver from "@/components/questionTypes/neverHaveIEver";
import unknown from "@/components/questionTypes/unknown";
import questionMixin from "@/components/questionTypes/questionMixin";
import multipleChoice from "@/components/questionTypes/multipleChoice";
import numberQuestion from "@/components/questionTypes/numberQuestion";
import mehrheitsWahl from "@/components/questionTypes/mehrheitsWahl";

export default {
  name: "question",
  props: {
    amIHost: {
      type: Boolean,
      required: true
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
        default:
          return unknown;
      }
    }
  },
}
</script>

<style scoped>

</style>

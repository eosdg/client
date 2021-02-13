<template>
  <div>
    <component :is="comp" :gameID="gameID" :question="question.question" class="mb-3"/>
  </div>
</template>

<script>
import neverHaveIEver from "@/components/questionTypes/neverHaveIEver";
import unknown from "@/components/questionTypes/unknown";
import questionMixin from "@/components/questionTypes/questionMixin";

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
      switch (this.question.question.type) {
        case "neverHaveIever":
          return neverHaveIEver;

        default:
          return unknown;
      }
    }
  },
}
</script>

<style scoped>

</style>

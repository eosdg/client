<template>
  <h1>Unknown type ({{question.type}})</h1>
</template>

<script>
import questionMixin from "@/components/questionTypes/questionMixin";

export default {
  name: "unknown",
  mixins: [questionMixin]
}
</script>

<style scoped>

</style>

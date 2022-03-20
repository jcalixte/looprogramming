<script setup lang="ts">
import { Step } from "~/use-cases/task/models/step"

defineProps<{ step: Step }>()
</script>

<template>
  <div class="task-step">
    <h2>
      {{ step.title }}
      <span v-if="step.estimation" italic>({{ step.estimation }} minutes)</span>
    </h2>
    <div v-for="substep in step.steps" :key="substep.id">
      <task-step ml-8 :step="substep" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-step {
  border: solid 1px white;
}
</style>

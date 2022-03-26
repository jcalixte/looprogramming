<script setup lang="ts">
import { exampleSteps } from "~/use-cases/task/data/examples"
import RunStep from "~/use-cases/task/components/RunStep.vue"

const steps = reactive(exampleSteps)
const totalTaskEstimationInSeconds = computed(
  () => steps.reduce((acc, step) => acc + step.totalEstimation, 0) * 60
)

const currentStepId = ref(steps[0].id)
</script>

<template>
  <div class="task-flow">
    <app-timer :limit="totalTaskEstimationInSeconds" start />
    <run-step
      v-for="step in steps"
      :key="step.id"
      :step="step"
      :current-step-id="currentStepId"
    />
  </div>
</template>

<style scoped lang="scss">
.task-flow {
}
</style>

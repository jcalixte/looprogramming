<script setup lang="ts">
import { Stepable } from "~/use-cases/task/interfaces/Stepable"

defineProps<{ step: Stepable; currentStepId: string | null }>()
</script>

<template>
  <div class="run-step" text-left>
    <div flex justify-between gap-xl>
      <span>- {{ step.title }}</span>
      <app-timer
        :limit="step.totalEstimation"
        :start="currentStepId === step.id"
      />
    </div>

    <run-step
      v-for="subStep in step.steps"
      :key="step.id"
      :step="subStep"
      :current-step-id="currentStepId"
      ml-4xl
    />
  </div>
</template>

<style scoped lang="scss">
.run-step {
}
</style>

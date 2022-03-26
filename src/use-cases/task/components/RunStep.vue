<script setup lang="ts">
import { Stepable } from "~/use-cases/task/interfaces/Stepable"

const props = defineProps<{ step: Stepable; currentStepId: string | null }>()
const isRunning = computed(() => props.step.id === props.currentStepId)

const currentSubstepId = ref<string | null>(
  isRunning.value ? props.step.steps[0]?.id ?? null : null
)
</script>

<template>
  <div class="run-step" text-left>
    <div flex justify-between gap-xl>
      <span>- {{ step.title }}</span>
      <app-timer
        :limit-in-seconds="step.totalEstimation * 60"
        :start="currentStepId === step.id"
      />
    </div>

    <run-step
      v-for="subStep in step.steps"
      :key="step.id"
      :step="subStep"
      :current-step-id="currentSubstepId ?? currentStepId"
      ml-4xl
    />
  </div>
</template>

<style scoped lang="scss">
.run-step {
}
</style>

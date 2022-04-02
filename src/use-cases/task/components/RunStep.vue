<script setup lang="ts">
import { Stepable } from "~/use-cases/task/interfaces/Stepable"
import { useTaskStore } from "~/use-cases/task/stores/task.store"

const taskStore = useTaskStore()

const props = defineProps<{
  taskId: string
  step: Stepable
}>()

const isRunning = computed(
  () =>
    taskStore.getResultByTaskId(props.taskId)?.currentStepId === props.step.id
)

const stepTime = taskStore.getStepTime({
  taskId: props.taskId,
  stepId: props.step.id
})

const updateStepTime = (time: number) => {
  taskStore.updateStepTime({
    taskId: props.taskId,
    stepId: props.step.id,
    time
  })
}
</script>

<template>
  <div class="run-step" text-left>
    <div flex justify-between gap-xl>
      <span>- {{ step.title }}</span>
      <app-timer
        v-if="props.step.steps.length === 0"
        :limit-in-seconds="step.totalEstimation * 60"
        :start="isRunning"
        :initial-value="stepTime"
        :on-time-change="updateStepTime"
      />
    </div>

    <run-step
      v-for="subStep in step.steps"
      :key="step.id"
      :task-id="props.taskId"
      :step="subStep"
      ml-4xl
    />
  </div>
</template>

<style scoped lang="scss">
.run-step {
}
</style>

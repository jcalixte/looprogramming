<script setup lang="ts">
import RunStep from "~/use-cases/task/components/RunStep.vue"
import { useTaskStore } from "~/use-cases/task/stores/task.store"
import { ResultStatus } from "~/use-cases/task/interfaces/Result"

const props = defineProps<{ id: string }>()

const taskStore = useTaskStore()
const task = taskStore.getTaskById(props.id)
const result = computed(() => taskStore.getResultByTaskId(props.id))
const taskTime = computed(() => taskStore.getTaskTime(props.id))
const flattenSteps = computed(() => taskStore.getFlattenStepsByTaskId(props.id))
const isLastStep = computed(() => {
  const lastStep = flattenSteps.value[flattenSteps.value.length - 1]
  return result.value?.currentStepId === lastStep.id
})

const totalTaskEstimationInSeconds = computed(() =>
  task
    ? task.steps.reduce((acc, step) => acc + step.totalEstimation, 0) * 60
    : 0
)

const nextStep = () => taskStore.nextStep(props.id)

onMounted(() => {
  if (!result.value) {
    taskStore.start(props.id)
  }
})
</script>

<template>
  <div class="task-flow" v-if="task">
    <h1>{{ task.title }}</h1>
    <app-timer-display
      :limit-in-seconds="totalTaskEstimationInSeconds"
      :display-value="taskTime"
    />
    <div v-if="result?.status === ResultStatus.RUN">
      <run-step
        v-for="step in task.steps"
        :key="step.id"
        :task-id="props.id"
        :step="step"
      />
      <div class="actions">
        <button v-if="isLastStep" btn @click="nextStep">Finish</button>
        <button v-else btn @click="nextStep">Next</button>
      </div>
    </div>
    <div v-if="result?.status === ResultStatus.DEBRIEF">
      <h2 text-4xl>Well done!</h2>
      Here is your feedback
    </div>
  </div>
  <div v-else>Loading task</div>
</template>

<style scoped lang="scss">
.task-flow {
  .actions {
    display: flex;
    justify-content: space-around;
  }
}
</style>

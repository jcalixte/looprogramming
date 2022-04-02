<script setup lang="ts">
import RunStep from "~/use-cases/task/components/RunStep.vue"
import { useTaskStore } from "~/use-cases/task/stores/task.store"

const props = defineProps<{ id: string }>()

const taskStore = useTaskStore()
const task = taskStore.getTaskById(props.id)
const taskTime = computed(() => taskStore.getTaskTime(props.id))
const flattenSteps = computed(() => taskStore.getFlattenStepsByTaskId(props.id))
const isLastStep = computed(() => {
  const lastStep = flattenSteps.value[flattenSteps.value.length - 1]
  return taskStore.getResultByTaskId(props.id)?.currentStepId === lastStep.id
})

enum Status {
  RUN,
  DEBRIEF
}

const totalTaskEstimationInSeconds = computed(() =>
  task
    ? task.steps.reduce((acc, step) => acc + step.totalEstimation, 0) * 60
    : 0
)

const taskStatus = ref(Status.RUN)

const nextStep = () => taskStore.nextStep(props.id)
const finish = () => (taskStatus.value = Status.DEBRIEF)

onMounted(() => {
  if (!taskStore.getResultByTaskId(props.id)) {
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
    <div v-if="taskStatus === Status.RUN">
      <run-step
        v-for="step in task.steps"
        :key="step.id"
        :task-id="props.id"
        :step="step"
      />
      <div class="actions">
        <button v-if="isLastStep" btn @click="finish">Finish</button>
        <button v-else btn @click="nextStep">Next</button>
      </div>
    </div>
    <div v-if="taskStatus === Status.DEBRIEF">
      <h2 text-4xl>Well done!</h2>
      Here is your feedback
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-flow {
  .actions {
    display: flex;
    justify-content: space-around;
  }
}
</style>

import { defineStore } from "pinia"
import { Taskable } from "~/use-cases/task/interfaces/Taskable"
import { useStorage } from "@vueuse/core"
import { Task } from "~/use-cases/task/models/task"
import { Result } from "~/use-cases/task/interfaces/Result"
import { Step } from "~/use-cases/task/models/step"

interface StepParams {
  taskId: string
  stepId: string
}

interface State {
  tasks: Record<string, Taskable>
  results: Record<string, Result>
}

const initialState: State = {
  tasks: {},
  results: {}
}

const TASK_ID = "task"

const sum = (elements: number[]) =>
  elements.reduce((acc, next) => acc + next, 0)

export const useTaskStore = defineStore(TASK_ID, {
  state: () => useStorage(TASK_ID, initialState),
  getters: {
    allTasks: (state) => Object.values(state.tasks),
    getTaskById: (state) => (taskId: string) =>
      state.tasks[taskId] ? Task.fromTaskable(state.tasks[taskId]) : null,
    getFlattenStepsByTaskId: (state) => (taskId: string) => {
      const task = state.tasks[taskId]
      if (!task) {
        return []
      }

      return Step.getFlattenSteps(task.steps)
    },
    getResultByTaskId: (state) => (taskId: string) =>
      state.results[taskId] ?? null,
    getTaskTime: (state) => (taskId: string) =>
      sum(Object.values(state.results[taskId]?.steps ?? [])),
    getStepTime:
      (state) =>
      ({ taskId, stepId }: StepParams) =>
        state.results[taskId]?.steps[stepId] ?? null
  },
  actions: {
    createTask(task: Taskable) {
      this.tasks[task.id] = task
    },
    removeTask(taskId: string) {
      delete this.tasks[taskId]
    },
    reset() {
      this.tasks = {}
    },
    start(taskId: string) {
      if (this.results[taskId]) {
        return
      }

      const steps = this.getFlattenStepsByTaskId(taskId)
      const currentStepId = steps[0]?.id

      if (!currentStepId) {
        return
      }

      this.results[taskId] = {
        taskId,
        time: 0,
        steps: {
          [currentStepId]: 0
        },
        currentStepId
      }
    },
    nextStep(taskId: string) {
      const result = this.results[taskId]
      if (!result) {
        this.start(taskId)
        return
      }

      const steps = this.getFlattenStepsByTaskId(taskId)
      const currentStepIndex = steps.findIndex(
        (step) => step.id === result.currentStepId
      )
      const nextStep = steps[currentStepIndex + 1]

      if (nextStep) {
        this.results[taskId] = {
          ...result,
          steps: {
            ...result.steps,
            [nextStep.id]: 0
          },
          currentStepId: nextStep.id
        }
      } else {
        this.results[taskId] = {
          ...result,
          time: this.getTaskTime(taskId),
          currentStepId: null
        }
      }
    },
    updateStepTime({ taskId, stepId, time }: StepParams & { time: number }) {
      const result = this.results[taskId]

      if (!result) {
        return
      }

      this.results[taskId] = {
        ...result,
        steps: {
          ...result.steps,
          [stepId]: time
        }
      }
    }
  }
})

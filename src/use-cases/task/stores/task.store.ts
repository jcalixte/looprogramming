import { defineStore } from "pinia"
import { Taskable } from "~/use-cases/task/interfaces/Taskable"
import { useStorage } from "@vueuse/core"
import { Task } from "~/use-cases/task/models/task"
import { Result } from "~/use-cases/task/interfaces/Result"
import { Step } from "~/use-cases/task/models/step"

interface State {
  tasks: Record<string, Taskable>
  results: Record<string, Result>
}

const initialState: State = {
  tasks: {},
  results: {}
}

const TASK_ID = "task"

export const useTaskStore = defineStore(TASK_ID, {
  state: () => useStorage(TASK_ID, initialState),
  getters: {
    allTasks: (state) => Object.values(state.tasks),
    getTaskById: (state) => (taskId: string) =>
      state.tasks[taskId] ? Task.fromTaskable(state.tasks[taskId]) : null,
    getResultByTaskId: (state) => (taskId: string) =>
      state.results[taskId] ?? null
  },
  actions: {
    createTask(task: Taskable) {
      console.log(task)
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
      const task = this.tasks[taskId]
      if (!task) {
        return
      }

      const steps = Step.getDeepSteps(task.steps)
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
    }
  }
})

import { defineStore } from "pinia"
import { Taskable } from "~/use-cases/task/interfaces/Taskable"
import { RemovableRef, useStorage } from "@vueuse/core"
import { Task } from "~/use-cases/task/models/task"

interface State {
  tasks: Record<string, Taskable>
}

const TASK_ID = "task"

export const useTaskStore = defineStore<typeof TASK_ID, RemovableRef<State>>(
  TASK_ID,
  {
    state: () => useStorage(TASK_ID, { tasks: {} }),
    getters: {
      getTaskById: (state) => (taskId: string) =>
        state.tasks[taskId] ? Task.fromTaskable(state.tasks[taskId]) : null
    }
  }
)

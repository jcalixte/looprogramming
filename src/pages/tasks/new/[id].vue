<script setup lang="ts">
import { Task } from "~/use-cases/task/models/task"
import { stepResolver } from "~/use-cases/task/services/step.resolver"
import TaskStep from "~/use-cases/task/components/TaskStep.vue"
import { useTaskStore } from "~/use-cases/task/stores/task.store"

const taskStore = useTaskStore()
const router = useRouter()

const props = defineProps<{ id: string }>()
const { t } = useI18n()

const newTask = reactive<Task>(new Task(props.id))
const markdownPlaceholder = `- 10 | first step
- second step
  - 10 | sub step 1
  - 25 | sub step 2
  - 2 | commit and push`
const markdown = ref(markdownPlaceholder)
const steps = computed(() => stepResolver.fromMarkdown(markdown.value))

const canSubmit = computed(() =>
  Task.validate({ ...newTask, steps: steps.value })
)

const createTask = () => {
  taskStore.createTask({
    id: newTask.id,
    title: newTask.title,
    link: newTask.link,
    steps: steps.value
  })
  router.push(`/tasks/${newTask.id}`)
}
</script>

<template>
  <div class="task">
    <h1 text-4xl pb-3>{{ t("tasks.newTask") }}</h1>
    <form @submit.prevent="createTask">
      <div>
        <label px2>{{ t("task.title") }}</label>
        <input v-model="newTask.title" type="text" text-gray-700 px2 py1 />
      </div>
      <div py3>
        <label px2>{{ t("task.url") }}</label>
        <input
          v-model="newTask.link"
          type="text"
          text-gray-700
          px2
          py1
          placeholder="https://"
        />
      </div>
      <textarea
        v-model="markdown"
        name="markdown"
        :placeholder="markdownPlaceholder"
        class="markdown"
        text-gray-700
        px2
        py1
        text-lg
        md:w-full
        sm:w-auto
      />
      <div>
        <button btn type="submit" :disabled="!canSubmit">create</button>
      </div>
      <task-step v-for="step in steps" :key="step.id" :step="step" />
    </form>
  </div>
</template>

<style scoped lang="scss">
.task {
  .markdown {
    max-width: 750px;
    min-height: 15rem;
    margin: 1rem;
  }
}
</style>

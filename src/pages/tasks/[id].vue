<script setup lang="ts">
import { Task } from "~/use-cases/task/models/task"
import { stepResolver } from "~/use-cases/task/services/step.resolver"
import TaskStep from "~/use-cases/task/components/TaskStep.vue"

const props = defineProps<{ id: string }>()
const { t } = useI18n()

const newTask = reactive<Task>(new Task(props.id))
const markdown = ref("")
const steps = computed(() => stepResolver.fromMarkdown(markdown.value))
</script>

<template>
  <div class="task">
    <h1 text-4xl pb-3>{{ t("tasks.newTask") }}</h1>
    <form @submit.prevent>
      <div>
        <label px2>{{ t("task.title") }}</label>
        <input v-model="newTask.title" type="text" text-gray-700 px2 py1 />
      </div>
      <div py3>
        <label px2>{{ t("task.url") }}</label>
        <input v-model="newTask.link" type="text" text-gray-700 px2 py1 />
      </div>
      <textarea
        id="markdown"
        v-model="markdown"
        name="markdown"
        text-gray-700
        px2
        py1
      />
      <task-step v-for="step in steps" :key="step.id" :step="step" />
    </form>
  </div>
</template>

<style scoped lang="scss">
.task {
}
</style>

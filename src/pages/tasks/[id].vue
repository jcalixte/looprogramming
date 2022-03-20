<script setup lang="ts">
import { Task } from '~/use-cases/task/models/task';

const props = defineProps<{ id: string }>()
const { t } = useI18n()

const newTask = reactive<Task>(new Task(props.id))
const markdown = ref('')
</script>

<template>
  <div class="task">
    <h1>{{ t('tasks.newTask') }}</h1>
    <form @submit.prevent>
      <div>
        <label px2>{{ t('task.title') }}</label>
        <input v-model="newTask.title" type="text" text-gray-700 px2 py1 />
      </div>
      <div py3>
        <label px2>{{ t('task.url') }}</label>
        <input v-model="newTask.link" type="text" text-gray-700 px2 py1 />
      </div>
      <label px2 for="markdown">get steps from markdown</label>
      <textarea id="markdown" v-model="markdown" name="markdown" text-gray-700 px2 py1 />
      <pre>{{ newTask.steps }}</pre>
    </form>
  </div>
</template>

<style scoped lang="scss">
.task {
}
</style>

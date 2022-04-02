<script setup lang="ts">
import { useTaskStore } from "~/use-cases/task/stores/task.store"

const taskStore = useTaskStore()
</script>

<template>
  <div class="task-list">
    <h2>Liste des tâches</h2>
    <ul>
      <li v-for="task in taskStore.tasks" :key="task.id">
        <a shadow-sm :href="`/tasks/${task.id}`">{{ task.title }}</a>
      </li>
    </ul>
    <button btn @click="taskStore.reset()">clear tasks</button>
  </div>
</template>

<style scoped lang="scss">
.task-list {
}
</style>

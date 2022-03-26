<script setup lang="ts">
import { generateUUID } from "~/providers/uuid"

const router = useRouter()

const { t } = useI18n()

const createTask = () => {
  const taskId = generateUUID()

  router.push(`/tasks/new/${taskId}`)
}

const toDemoTask = () => {
  router.push(`/tasks/${"demo-task"}`)
}
</script>

<template>
  <div>
    <h1 text-4xl>Looprogramming</h1>
    <h2 text-1xl>Your coding feedback loop</h2>

    <div>
      <button btn m-3 @click="createTask">
        {{ t("tasks.createATask") }}
      </button>
      <button btn m-3 @click="toDemoTask">
        {{ t("tasks.toDemoTask") }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

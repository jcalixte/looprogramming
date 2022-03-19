<script setup lang="ts">
import { generateUUID } from '~/providers/uuid'

const router = useRouter()

const { t } = useI18n()

const createTask = () => {
  router.push(`/tasks/${generateUUID()}`)
}
</script>

<template>
  <div>
    <h1 text-4xl>
      Looprogramming
    </h1>
    <h2 text-1xl italic>
      Your coding feedback loop
    </h2>

    <div>
      <button
        btn m-3
        @click="createTask"
      >
        {{ t('tasks.createATask') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

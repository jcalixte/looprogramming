<script setup lang="ts">
defineProps<{ id: string }>()
const { t } = useI18n()
</script>

<template>
  <div class="task">
    <h1>{{ t('tasks.newTask') }}</h1>
    {{ id }}
  </div>
</template>

<style scoped lang="scss">
.task {
}
</style>

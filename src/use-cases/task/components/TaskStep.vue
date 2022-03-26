<script setup lang="ts">
import { Step } from "~/use-cases/task/models/step"

defineProps<{ step: Step }>()
</script>

<template>
  <div class="task-step">
    <h2>
      {{ step.title }}
      <span v-if="step.estimation" italic
        >({{ step.totalEstimation }} minutes)</span
      >
    </h2>
    <hr />
    <div v-for="substep in step.steps" :key="substep.id">
      <task-step ml-8 :step="substep" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimer } from "~/hooks/useTimer.hook"

const props = defineProps<{
  limitInSeconds?: number
  displayValue?: number
  onTimeChange?: (time: number) => void
}>()

const value = computed(() => props.displayValue ?? 0)
const { time } = useTimer(value)

const hasTimePassed = computed(() => {
  if (props.displayValue === undefined) {
    return false
  }
  if (props.limitInSeconds === undefined) {
    return false
  }
  return props.displayValue > props.limitInSeconds
})
</script>

<template>
  <div
    class="app-timer"
    :class="{
      warning: hasTimePassed
    }"
  >
    {{ time }}
  </div>
</template>

<style scoped lang="scss">
.app-timer {
  font-family: "Red Hat Mono", monospace;

  &.warning {
    color: #c23616;
  }
}
</style>

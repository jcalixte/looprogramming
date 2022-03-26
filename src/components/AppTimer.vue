<script setup lang="ts">
import { useTimer } from "~/hooks/useTimer.hook"

const props = defineProps<{
  limitInSeconds?: number
  start: boolean
}>()

const counter = ref(0)
const { time } = useTimer(counter)
let intervalId: ReturnType<typeof setTimeout> | null = null

const runCounter = () => {
  intervalId = setInterval(() => {
    counter.value++
  }, 1000)
}

const clearCounter = () => {
  if (intervalId) {
    clearTimeout(intervalId)
  }
}
onMounted(() => (props.start ? runCounter() : null))

onUnmounted(clearCounter)

watch(
  () => props.start,
  () => {
    if (props.start) {
      runCounter()
    } else {
      clearCounter()
    }
  }
)

const hasTimePassed = computed(() => {
  if (props.limitInSeconds === undefined) {
    return false
  }
  return counter.value > props.limitInSeconds
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

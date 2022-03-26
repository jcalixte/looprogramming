<script setup lang="ts">
const props = defineProps<{
  limitInSeconds?: number
  start: boolean
}>()

const SECONDS_IN_A_MINUTE = 60

const counter = ref(0)
const minutes = computed(() =>
  `${Math.floor(counter.value / SECONDS_IN_A_MINUTE)}`.padStart(2, "0")
)
const seconds = computed(() =>
  `${counter.value % SECONDS_IN_A_MINUTE}`.padStart(2, "0")
)
const displayedCounter = computed(() => `${minutes.value}:${seconds.value}`)
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
    {{ displayedCounter }}
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

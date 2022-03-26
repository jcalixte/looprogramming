import { Ref } from "vue"

const SECONDS_IN_A_MINUTE = 60

export const useTimer = (timer: Ref<number>) => {
  const minutes = computed(() =>
    `${Math.floor(timer.value / SECONDS_IN_A_MINUTE)}`.padStart(2, "0")
  )
  const seconds = computed(() =>
    `${timer.value % SECONDS_IN_A_MINUTE}`.padStart(2, "0")
  )
  const time = computed(() => `${minutes.value}:${seconds.value}`)

  return {
    time
  }
}

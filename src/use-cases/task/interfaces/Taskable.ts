import { Stepable } from "~/use-cases/task/interfaces/Stepable"

export interface Taskable {
  id: string
  title: string
  link: string | null
  steps: Stepable[]
}

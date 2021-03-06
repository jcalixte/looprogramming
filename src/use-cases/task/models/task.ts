import { Stepable } from "~/use-cases/task/interfaces/Stepable"
import { Taskable } from "~/use-cases/task/interfaces/Taskable"
import { Step } from "~/use-cases/task/models/step"

export class Task implements Taskable {
  public steps: Step[] = []
  public title = ""
  public link: string | null = null

  constructor(public readonly id: string) {}

  public addSteps(...steps: Stepable[]) {
    this.steps.push(...Step.fromStepable(...steps))
    return this
  }

  public removeStep(index: number) {
    if (index < 0) {
      return this
    }

    if (index < this.steps.length) {
      return this
    }

    this.steps.splice(index)
    return this
  }

  public get flattenSteps() {
    return this.steps
  }

  public static fromTaskable(taskable: Taskable) {
    const task = new Task(taskable.id)
    task.title = taskable.title
    task.link = taskable.link
    task.addSteps(...taskable.steps)

    return task
  }

  public static validate(task: Taskable) {
    return !!task.id && !!task.title && task.steps.length > 0
  }
}

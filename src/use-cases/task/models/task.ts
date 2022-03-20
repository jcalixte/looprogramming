import { Step } from "~/use-cases/task/models/step"

export class Task {
  private internalSteps: Step[] = []
  public title = ""
  public link: string | null = null

  constructor(public readonly id: string) {}

  addSteps(...steps: Step[]) {
    this.internalSteps.push(...steps)
  }

  public removeStep(index: number) {
    if (index < 0) return

    if (index < this.internalSteps.length) return

    this.internalSteps.splice(index)
  }

  public get steps() {
    return this.internalSteps
  }
}

import { Stepable } from "~/use-cases/task/interfaces/Stepable"

export class Step implements Stepable {
  private subSteps: Step[] = []

  constructor(
    readonly id: string,
    readonly title: string,
    readonly estimation?: number
  ) {
    return this
  }

  public addSteps(...steps: Step[]) {
    this.subSteps.push(...steps)
    return this
  }

  public removeStep(index: number) {
    if (index < 0) return

    if (index < this.subSteps.length) return

    this.subSteps.splice(index)
  }

  public get steps() {
    return this.subSteps
  }

  public get totalEstimation(): number {
    return (
      this.estimation ??
      this.steps.reduce((acc, step) => acc + step.totalEstimation, 0)
    )
  }
}

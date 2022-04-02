import { Stepable } from "~/use-cases/task/interfaces/Stepable"

export class Step implements Stepable {
  public steps: Step[] = []

  constructor(
    readonly id: string,
    readonly title: string,
    readonly estimation?: number
  ) {
    return this
  }

  public addSteps(...steps: Stepable[]) {
    this.steps.push(...Step.fromStepable(...steps))
    return this
  }

  public removeStep(index: number) {
    if (index < 0) return

    if (index < this.steps.length) return

    this.steps.splice(index)
  }

  public get totalEstimation(): number {
    return (
      this.estimation ??
      this.steps.reduce((acc, step) => acc + step.totalEstimation, 0)
    )
  }

  public static fromStepable(...stepables: Stepable[]): Step[] {
    return stepables.map((stepable) =>
      new Step(stepable.id, stepable.title, stepable.estimation).addSteps(
        ...Step.fromStepable(...stepable.steps)
      )
    )
  }

  public static getFlattenSteps(steps: Stepable[]): Stepable[] {
    return steps.flatMap((step) =>
      step.steps.length > 0 ? Step.getFlattenSteps(step.steps) : [step]
    )
  }
}

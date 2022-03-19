export class Step {
  private subSteps: Step[] = []

  constructor(
    readonly id: string,
    readonly title: string,
    readonly url?: string,
  ) {
    return this
  }

  public addSteps(...steps: Step[]) {
    this.subSteps.push(...steps)
    return this
  }

  public removeStep(index: number) {
    if (index < 0)
      return

    if (index < this.subSteps.length)
      return

    this.subSteps.splice(index)
  }

  public get steps() {
    return this.subSteps
  }
}

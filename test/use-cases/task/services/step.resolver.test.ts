import { describe, expect, it } from "vitest"
import {
  firstStep,
  firstStepEstimationInMinutes,
  multipleStepsMarkdown,
  oneStepMarkdown,
  secondStep,
  stepWithBadEstimationMarkdown,
  stepWithEstimationMarkdown,
  stepWithSubstepsMarkdown,
  stepWithSubstepWithSubstep,
  thirdStep
} from "_/use-cases/task/services/markdown.data"
import { Step } from "~/use-cases/task/models/step"
import { StepResolver } from "~/use-cases/task/services/step.resolver"

describe("Step resolver", () => {
  const stepResolver = new StepResolver()

  describe("from markdown", () => {
    it("returns an empty array when there is no given input", () => {
      expect(stepResolver.fromMarkdown("")).toEqual([])
    })

    it("extracts the step", () => {
      expect(stepResolver.fromMarkdown(oneStepMarkdown)).toEqual([
        new Step(expect.any(String), firstStep)
      ])
    })

    it("extracts all the steps", () => {
      expect(stepResolver.fromMarkdown(multipleStepsMarkdown)).toEqual([
        new Step(expect.any(String), firstStep),
        new Step(expect.any(String), secondStep),
        new Step(expect.any(String), thirdStep)
      ])
    })

    it("extract the step and its substeps", () => {
      expect(stepResolver.fromMarkdown(stepWithSubstepsMarkdown)).toEqual([
        new Step(expect.any(String), firstStep).addSteps(
          new Step(expect.any(String), secondStep),
          new Step(expect.any(String), thirdStep)
        )
      ])
    })

    it("recursively extracts substeps", () => {
      expect(stepResolver.fromMarkdown(stepWithSubstepWithSubstep)).toEqual([
        new Step(expect.any(String), firstStep).addSteps(
          new Step(expect.any(String), secondStep).addSteps(
            new Step(expect.any(String), thirdStep)
          )
        )
      ])
    })

    it("adds the estimation if present", () => {
      expect(stepResolver.fromMarkdown(stepWithEstimationMarkdown)).toEqual([
        new Step(expect.any(String), firstStep, firstStepEstimationInMinutes)
      ])
    })

    it("ignores the estimation if it is not a int", () => {
      expect(stepResolver.fromMarkdown(stepWithBadEstimationMarkdown)).toEqual([
        new Step(expect.any(String), `not a number | ${firstStep}`)
      ])
    })
  })
})

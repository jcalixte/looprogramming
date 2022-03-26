import { Stepable } from "~/use-cases/task/interfaces/Stepable"
import { Step } from "~/use-cases/task/models/step"

export const exampleSteps: Stepable[] = [
  new Step("a", "initialize api call")
    .addSteps(new Step("aa", "setup infra module", 6))
    .addSteps(new Step("ab", "test hook api", 10))
    .addSteps(new Step("ac", "adjust hook", 10))
    .addSteps(new Step("ad", "commit", 5)),
  new Step("b", "display data in component")
    .addSteps(new Step("ba", "import hook", 2))
    .addSteps(new Step("bb", "design component", 15))
    .addSteps(new Step("bc", "commit", 5)),
  new Step("c", "Create pull request", 5)
]

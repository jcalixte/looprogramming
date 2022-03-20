export const firstStepEstimationInMinutes = 30
export const firstStep = "instancier un store global"
export const secondStep = "créer un sélecteur isValid"
export const thirdStep = "ajouter une action qui appelle une API"

export const emptyMarkdown = ""

export const oneStepMarkdown = `- ${firstStep}`

export const multipleStepsMarkdown = `- ${firstStep}
- ${secondStep}
- ${thirdStep}`

export const stepWithSubstepsMarkdown = `- ${firstStep}
  - ${secondStep}
  - ${thirdStep}`

export const stepWithSubstepWithSubstep = `- ${firstStep}
  - ${secondStep}
    - ${thirdStep}`

export const stepWithEstimationMarkdown = `- ${firstStepEstimationInMinutes} | ${firstStep}`
export const stepWithBadEstimationMarkdown = `- not a number | ${firstStep}`

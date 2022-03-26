export interface Stepable {
  id: string
  title: string
  estimation?: number
  steps: Stepable[]
  totalEstimation: number
}

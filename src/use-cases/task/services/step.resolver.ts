import { generateUUID } from "~/providers/uuid"
import { Step } from "~/use-cases/task/models/step"

class Node {
  public readonly title: string
  public readonly estimation?: number
  public childNodes: Node[] = []
  constructor(readonly line: string) {
    const [first, ...rest] = line.split("|")
    const second = rest.join("|")

    const estimation = parseInt(first.trim(), 10)

    if (isNaN(estimation)) {
      this.title = line
    } else {
      this.estimation = estimation
      this.title = (second ? second : first).trim()
    }
  }
}

export class StepResolver {
  public fromMarkdown(input: string): Step[] {
    return this.parseToNodes(input).map((node) => this.nodeToStep(node))
  }

  private parseToNodes(input: string) {
    const jsonTree: Node[] = []
    const lines = input.split("\n")
    const regex = /^(\s*)-\s(.*)\s*/

    lines.forEach((line) => {
      const matches = line.match(regex)

      if (matches) {
        const level = Math.floor(matches[1].length / 2)
        const title = matches[2]
        const node = new Node(title)

        if (level === 0) {
          jsonTree.push(node)
        } else {
          this.getParentNode(level, jsonTree).childNodes.push(node)
        }
      }
    })

    return jsonTree
  }

  private getParentNode(level: number, jsonTree: Node[]) {
    let i = 0
    let node = jsonTree[jsonTree.length - 1]

    while (i < level - 1) {
      const childNodes = node.childNodes
      node = childNodes[childNodes.length - 1]
      i++
    }

    return node
  }

  private nodeToStep(node: Node): Step {
    return new Step(generateUUID(), node.title, node.estimation).addSteps(
      ...node.childNodes.map((child) => this.nodeToStep(child))
    )
  }
}

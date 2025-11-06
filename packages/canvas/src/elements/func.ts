import { defineElement } from '../element-structor'
import { calculate } from './utils'

export interface FuncAttributes {
  expression: string
  domain?: [number, number]
}

export const func = defineElement<FuncAttributes>((options) => {
  return (board) => {
    const f = calculate<(x: number) => number>(options.expression)
    return board.create('functiongraph', [f, ...(options.domain ?? [])])
  }
})


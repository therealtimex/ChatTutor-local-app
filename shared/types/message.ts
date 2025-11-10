import type { AllAction } from "./action"
import type { PageType } from "@chat-tutor/shared"
import { v4 } from "uuid"

export type UserMessage = {
  type: 'user'
  content: string
  images: string[]
}
export type AssistantMessage = {
  type: 'assistant'
  content: string
}
export type DrawMessage = {
  type: 'draw'
  page: string
}
export type SetMermaidMessage = {
  type: 'set-mermaid'
  page: string
}
export type NoteMessage = {
  type: 'note'
  page: string
}
export type PageMessage = {
  type: 'page'
  page: string
  pageType: PageType
}
export type Message = (UserMessage | AssistantMessage | DrawMessage | SetMermaidMessage | NoteMessage | PageMessage) & {
  id: string
  running?: boolean
}

export const createMessageResolver = (
  push: (message: Message) => void,
  get: () => Message[],
  uuid: () => string = v4,
) => {
  let divided: boolean = true
  return (action: AllAction) => {
    if (action.type === 'text') {
      if (divided) {
        push({
          type: 'assistant',
          content: '',
          id: uuid(),
          running: true,
        })
        divided = false
      }
      const messages = get()
        ; (<AssistantMessage>messages.at(-1)!).content += action.options.chunk
    } else {
      divided = true
      if (action.type === 'note') {
        push({
          type: 'note',
          page: action.page!,
          id: uuid(),
        })
      } else if (action.type === 'page') {
        push({
          type: 'page',
          page: action.options.id!,
          pageType: action.options.type as PageType,
          id: uuid(),
        })
      } else if (action.type === 'set-mermaid') {
        push({
          type: 'set-mermaid',
          page: action.page!,
          id: uuid(),
        })
      } else if (action.type === 'update-canvas') {
        push({
          type: 'draw',
          page: action.page!,
          id: uuid(),
        })
      }
    }
  }
}

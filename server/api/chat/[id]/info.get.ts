import { db } from '#shared/db'
import { chat } from '#shared/db/chat'
import { eq } from 'drizzle-orm'
import type { Page } from '@chat-tutor/shared'
import type { Message } from 'xsai'
import type { Status } from '#shared/types'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const [{ pages, messages, status }] = await db.select().from(chat).where(eq(chat.id, id)) as { pages: Page[], messages: Message[], context: Message[], status: Status }[]
  return {
    pages,
    messages,
    status,
    id,
  }
})
import { db } from '#shared/db'
import { chat } from '#shared/db/chat'
import type { Context } from '#shared/types'
import { getTitle } from '@chat-tutor/agent'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const apiKey = process.env.API_KEY!
  const baseURL = process.env.BASE_URL!
  const agentModel = process.env.AGENT_MODEL!
  const titleModel = process.env.TITLE_MODEL ?? agentModel
  const { input } = getQuery(event) as { input: string }
  const [{ id }] = await db
    .insert(chat)
    .values({
      title: 'Untitled',
      messages: [],
      context: {
        agent: [],
        painter: {},
      } satisfies Context,
      status: Status.PENDING,
      pages: [],
    })
    .returning({ id: chat.id })
  event.waitUntil((async () => {
    const title = await getTitle({
      apiKey,
      baseURL,
      model: titleModel,
      messages: [],
    }, input)
    await db.update(chat).set({ title }).where(eq(chat.id, id))
  })())
  return {
    id,
  }
})
<script setup lang="ts">
const { handleAction, board, loadPages } = useBoard()
const { messages, input, send, loadMessages } = useChat(handleAction)

const route = useRoute()
const { input: initialInput } = route.query as { input: string }

if (initialInput) {
  input.value = initialInput
  const { input: _, ...restQuery } = route.query
  navigateTo({ query: restQuery }, { replace: true })
  send()
}

const id = useRoute().params.id as string

void (async () => {
  const { messages, pages } = await $fetch<{ messages: Message[], pages: Page[] }>(`/api/chat/${id}/info`)
  if (messages.length === 0) {
    return
  }
  loadMessages(messages)
  loadPages(pages)
})()

onMounted(() => {
  console.log(board.value)
})
</script>

<template>
  <div class="flex flex-row w-full h-full overflow-hidden">
    <div class="flex flex-1 h-full items-center justify-center overflow-hidden">
      <div ref="board" class="w-full h-240 flex items-center justify-center"></div>
    </div>
    <div class="flex flex-col h-screen max-h-screen bg-gray-200 w-100 p-3 shadow-lg flex-shrink-0">
      <Chat :messages="messages" v-model:input="input" @keydown.enter="send" />
    </div>
  </div>
</template>
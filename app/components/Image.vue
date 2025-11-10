<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const { url } = defineProps<{
  url: string
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const handleRemove = (e: Event) => {
  e.stopPropagation()
  emit('remove')
}
</script>

<template>
  <div class="size-10 aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
    <img
      :src="url"
      alt="Image"
      class="size-full object-cover group-hover:opacity-60 transition-all duration-300"
    >
    <div 
      class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      @click="handleRemove"
    >
      <FontAwesomeIcon
        :icon="faTrash"
        class="text-gray-100 hover:text-red-400 transition-all duration-300 text-lg drop-shadow-lg"
      />
    </div>
  </div>
</template>
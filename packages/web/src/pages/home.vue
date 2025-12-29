<script setup lang="ts">
import { PromptArea } from '#/components/prompt-area'
</script>

<template>
  <div class="size-full">
    <div class="flex size-full items-center justify-center flex-col gap-18">
      <h1 class="text-4xl title">Hello, let's begin!</h1>
      <div class="h-32 w-full max-w-2xl">
        <PromptArea />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.title {
  background: linear-gradient(to right, #90EE90 0%, #8BDEBD 50%, #87CEEB 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
</style>

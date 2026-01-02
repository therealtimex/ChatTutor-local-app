<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '#/store/settings'
import SettingsItem from '#/components/settings/SettingsItem.vue'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRobot, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import { modelProviders } from '#/store/settings'
const settingsStore = useSettingsStore()
const { baseURL, apiKey, agentModel, titleModel, colorMode, modelProvider, modelProviderDetails, language } = storeToRefs(settingsStore)

const { t, availableLocales } = useI18n()

const colorOptions = computed(() => {
  return ["light", "dark", "system"].map(mode => ({
    label: t(`settings.interface.colorModeOptions.${mode}`),
    value: mode
  }))
})

const localeOptions = computed(() => availableLocales.map(loc => ({
  label: t(`settings.interface.languageOptions.${loc}`),
  value: loc
})))

const modelProviderOptions = computed(() => {
  return Object.entries(modelProviders).map(([key, provider]) => ({
    label: provider.label,
    value: key
  }))
})

const sectionTitleClass = 'font-semibold text-muted-foreground border-b pt-3 pb-2';

</script>

<template>
  <div class="p-5 overflow-y-auto h-full">
    <div class="max-w-2xl mx-auto">

      <h1 class="text-3xl font-extrabold lg:text-4xl mb-2 pt-3">
        {{ t('settings.title') }}
      </h1>


      <section class="space-y-3">
        <h2 :class="sectionTitleClass">
          <FontAwesomeIcon :icon="faRobot" />
          {{ t('settings.models.title') }}
        </h2>

        <SettingsItem :label="t('settings.models.provider')" type="select" :options="modelProviderOptions"
          v-model="modelProvider" />

        <SettingsItem :label="t('settings.models.baseURL')" :placeholder="modelProviderDetails.baseURL"
          v-model="baseURL" />

        <SettingsItem :label="t('settings.models.apiKey')" type="password"
          :description="t('settings.models.apiKeyDescription')" v-model="apiKey" />

        <SettingsItem :label="t('settings.models.agentModel')" v-model="agentModel" />

        <SettingsItem :label="t('settings.models.titleModel')" :placeholder="agentModel"
          :description="t('settings.models.titleModelDescription')" v-model="titleModel" />
      </section>

      <section class="space-y-3">
        <h2 :class="sectionTitleClass">
          <FontAwesomeIcon :icon="faWindowMaximize" />
          {{ t('settings.interface.title') }}
        </h2>

        <SettingsItem :label="t('settings.interface.colorMode')" type="select" :options="colorOptions"
          v-model="colorMode" />

        <SettingsItem :label="t('settings.interface.language')" type="select" :options="localeOptions"
          v-model="language" />
      </section>
    </div>

  </div>
</template>
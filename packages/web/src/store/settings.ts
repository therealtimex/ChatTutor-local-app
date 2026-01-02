import { usePreferredDark } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, watch } from "vue";
import { ref } from "vue";

export type ColorMode = "light" | "dark" | "system";

export const modelProviders = {
  openai: {
    label: "OpenAI",
    baseURL: "https://api.openai.com/v1",
  },
  anthropic: {
    label: "Anthropic",
    baseURL: "https://api.anthropic.com/v1",
  },
  deepseek: {
    label: "DeepSeek",
    baseURL: "https://api.deepseek.ai/v1",
  },
};

export const useSettingsStore = defineStore("settings", () => {
  const browserDark = usePreferredDark();
  const baseURL = ref(localStorage.getItem("baseURL") || "");
  const apiKey = ref(localStorage.getItem("apiKey") || "");
  const agentModel = ref(localStorage.getItem("agentModel") || "");
  const titleModel = ref(localStorage.getItem("titleModel") || "");
  const colorMode = ref(
    (localStorage.getItem("colorMode") as ColorMode) || "system"
  );
  const modelProvider = ref(
    (localStorage.getItem("modelProvider") as keyof typeof modelProviders) ||
      "openai"
  );
  const modelProviderDetails = computed(
    () => modelProviders[modelProvider.value]
  );

  const persist = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const saveSettings = () => {
    persist("baseURL", baseURL.value);
    persist("apiKey", apiKey.value);
    persist("agentModel", agentModel.value);
    persist("titleModel", titleModel.value);
    persist("colorMode", colorMode.value);
    persist("modelProvider", modelProvider.value);
  };

  watch(
    [baseURL, apiKey, agentModel, titleModel, colorMode, modelProvider],
    saveSettings
  );

  const isDarkMode = computed(() => {
    if (colorMode.value === "dark") return true;
    if (colorMode.value === "light") return false;
    return browserDark.value;
  });

  const applyColorMode = () => {
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  };

  watch(isDarkMode, applyColorMode);

  return {
    baseURL,
    apiKey,
    agentModel,
    titleModel,
    colorMode,
    isDarkMode,
    modelProvider,
    modelProviderDetails,
    applyColorMode,
  };
});

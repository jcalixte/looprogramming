<script setup lang="ts">
import { toggleDark } from "~/composables/dark"

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav w-full>
    <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </router-link>

    <button
      class="icon-btn mx-2 !outline-none"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a
      class="icon-btn mx-2"
      :title="t('button.toggle_langs')"
      @click="toggleLocales"
    >
      <div i-carbon-language />
    </a>

    <router-link class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <div i-carbon-dicom-overlay />
    </router-link>
  </nav>
</template>

<style lang="scss">
nav {
  display: flex;
  font-size: 1.25rem;
  line-height: 1.75rem;
}
</style>

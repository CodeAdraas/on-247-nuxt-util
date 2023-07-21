<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import Captcha from '../captcha/component.vue'
import CreditsEmbed from '../credits-embed/component.vue'

interface Props {
    credits?: boolean
}

withDefaults(defineProps<Props>(), {
    credits: true
})

const runtimeConfig = useRuntimeConfig().public
</script>

<template>
    <seo-kit />
    <Header />
    <slot />
    <Footer />
    <captcha
        v-if="runtimeConfig.captcha?.global"
        global
    />
    <credits-embed
        v-if="credits"
        :theme="runtimeConfig.creditTheme"
    />
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useCaptcha } from '../../../composables/captcha'
import CfTurnstile from './component.vue'

const runtimeConfig = useRuntimeConfig().public
const captcha = useCaptcha()

const onVerify = (token: string) => {
    captcha.isVerifying = false
    captcha.isError = false
    captcha.token = token
}

const onInvalid = () => {
    captcha.isVerifying = false
    captcha.isError = true
    captcha.token = null
}

onMounted(() => {
    captcha.isVerifying = true
    captcha.isError = false
})

onBeforeUnmount(() => {
    captcha.isVerifying = true
    captcha.isError = false
})
</script>

<template>
    <cf-turnstile
        :sitekey="runtimeConfig.captcha.sitekey"
        appearance="interaction-only"
        @verify="onVerify"
        @expire="onInvalid"
        @fail="onInvalid"
    />
</template>
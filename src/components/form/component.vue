<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
    (e: 'submit', formData: FormData): void
}

interface Props {
    submitLabel: string
    loadingLabel: string
    isLoading?: boolean
    isError?: boolean
}

defineProps<Props>()

const emit = defineEmits<Emits>()
const isValidityChecked = ref(false)

const onHandleSubmit = (evt: any) => {
    isValidityChecked.value = true
    if (evt.target.checkValidity()) {        
        emit('submit', new FormData(evt.target))
    }
}
</script>

<template>
    <form
        :class="['form', {'is-validated': isValidityChecked}]"
        novalidate @submit.prevent="onHandleSubmit"
    >
        <slot />
        <!--  -->
        <div class="slot slot--captcha">
            <slot name="captcha" />
        </div>
        <!--  -->
        <div :class="['slot slot--message', {'error': isError}]">
            <slot name="message" />
        </div>
        <!--  -->
        <slot
            name="button"
            :loading="isLoading"
        >
            <button
                type="submit"
                class="form--btn"
                :disabled="isLoading"
            >
                {{ isLoading ? loadingLabel : submitLabel }}
            </button>
        </slot>
    </form>
</template>

<style scoped lang="scss">
.form {
    font-size: var(--form-font-size, 1rem);
    display: flex;
    flex-direction: column;
    gap: var(--form-gap, 1.5em);
    &--btn {
        font-size: inherit;
        border: 1px solid var(--form-button-border-color, #fff);
        border-radius: var(--form-border-radius, 0.5em);
        color: var(--form-button-color, #fff);
        background: var(--form-button-bg-color, #000);
        padding: var(--form-spacing-y, 1em) var(--form-spacing-x, 2em);
        cursor: pointer;
        font-family: inherit;
    }
}

.message {
    color: var(--form-valid-color, green);
    &.error {
        color: var(--form-invalid-color, red);
    }
}

.slot:empty {
  display: none;
}
</style>
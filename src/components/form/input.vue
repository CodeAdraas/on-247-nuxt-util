<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
// @TODO
// import NativeInput from './native-input.vue'
// import InputLabel from './input-label.vue'

interface Emits {
    (e: 'update:modelValue', value: any): void
}

interface Props {
    name: string
    modelValue?: any
    type?: 'text' | 'number' | 'email' | 'tel'
    variant?: 'input' | 'textarea'
    required?: boolean
    min?: number
    max?: number
}

const emit = defineEmits<Emits>()

const prop = withDefaults(defineProps<Props>(), {
    type: 'text',
    variant: 'input',
    required: true
})

const id = computed(() => `input-${(new Date).valueOf()}-${prop.name.toLowerCase().replace(/ |\-/gi, '_')}`)
/** Bidirectional state value */
const value = ref(prop.modelValue)
const isTyping = ref(false)
const isFilled = ref(false)
const error = ref()

const updateValue = val => {
    emit('update:modelValue', val)
    value.value = val
}

const stopWatchExternalValueChange = watch(
    () => prop.modelValue,
    externalValue => updateValue(externalValue)
)

const stopWatchUserValueChange = watch(
    value,
    userValue => updateValue(userValue)
)

onBeforeUnmount(() => {
    stopWatchExternalValueChange()
    stopWatchUserValueChange()
})
</script>

<template>
    <div>
        <div class="field">
            <slot
                name="input"
            >
                <native-input
                    v-model="value"
                    v-model:typing="isTyping"
                    v-model:filled="isFilled"
                    v-model:error="error"
                    :attributes="{
                        name,
                        id,
                        type,
                        variant
                    }"
                    :validation="{
                        required,
                        min,
                        max
                    }"
                />
            </slot>
            <!--  -->
            <slot
                name="label"
                :typing="isTyping"
                :filled="isFilled"
            >
                <input-label
                    :label-for="id"
                    :hide="isFilled"
                    :textarea="variant == 'textarea'"
                    :floating="true"
                >
                    <slot />
                </input-label>
            </slot>
        </div>
        <!--  -->
        <slot
            name="errorHelp"
            :error="error"
        >
            <span
                v-if="error"
                class="error-help"
            >
                {{ error }}
            </span>
        </slot>
    </div>
</template>

<style scoped lang="scss">
.field {
    position: relative;
}

input,
textarea {
    width: 100%;
    padding: var(--form-spacing-y, 1em) var(--form-spacing-x, 1.5em);
    background-color: var(--form-bg-color);
    color: var(--form-color);
    border: 1px solid;
    border-color: var(--form-color);
    border-radius: var(--form-border-radius, 0.5em);
    outline: none;
    font-size: var(--form-font-size, 1em);
    font-family: inherit;
}

textarea {
    resize: vertical;
    font-family: inherit;
}

label {
    position: absolute;
    top: 50%;
    left: var(--form-spacing-x, 1.5em);
    transform: translateY(-50%);
    color: var(--form-color);
    font-size: var(--form-font-size, 1em);
    &.filled {
        top: 0;
        background-color: var(--form-bg-color);
        padding: 0 5px;
        font-size: var(--form-small-font-size, 0.8em);
    }
    &.text:not(.filled) {
        top: var(--form-spacing-y, 1em);
        transform: translateY(0);
    }
}

.is-validated input,
.is-validated textarea {
    &:valid {
        border-color: var(--form-valid-color);
    }
    &:invalid {
        border-color: var(--form-invalid-color);
    }
}

.error-help {
    display: block;
    padding: 0 0 0 var(--form-spacing-x, 1.5em);
    margin: var(--form-spacing-y, 1em) 0 0 0;
    font-size: var(--form-small-font-size, 0.8em);
    color: var(--form-helper-color);
}
</style>
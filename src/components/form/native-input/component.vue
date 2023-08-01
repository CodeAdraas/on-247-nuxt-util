<script setup lang="ts">
import { ref, reactive } from 'vue'

interface State {
    filled: boolean
    typing: boolean
    error?: string
}

interface Emits {
    (e: 'update:modelValue', payload: any): void
    (e: 'update:typing', payload: boolean): void
    (e: 'update:filled', payload: boolean): void
    (e: 'update:error', error?: string): void
    (e: 'update:state', payload: State): void
}

interface Props {
    modelValue?: string
    typing?: boolean
    filled?: boolean
    error?: boolean
    attributes: {
        name: string
        id?: string
        type: 'text' | 'number' | 'email' | 'tel'
        variant?: 'input' | 'textarea'
    }
    validation?: {
        required?: boolean
        min?: number
        max?: number
    }
    state: State
}

const emit = defineEmits<Emits>()

const prop = withDefaults(
    defineProps<Props>(), {
    typing: false,
    filled: false,
    error: false,
    attributes: () => ({
        name: '',
        id: undefined,
        type: 'text',
        variant: 'input'
    }),
    validation: () => ({
        required: true,
        min: undefined,
        max: undefined
    })
})

const value = ref(prop.modelValue)
const isFilled = ref(!!prop.modelValue)
const isTyping = ref(prop.typing)
const validityMessage = ref(undefined)

const state = reactive({
    filled: isFilled,
    typing: isTyping,
    error: validityMessage
})

const onHandleFocus = (evt: any) => {
    isTyping.value = true

    // Check for validity and set error message if needed
    if (! evt.target.reportValidity()) {
        validityMessage.value = evt.target.validityMessage
    }
}

const onHandleInput = (evt: any) => {
    value.value = evt.target.value
    isFilled.value = !!evt.target.value

    // Reset error message
    if (isFilled.value && validityMessage.value) {
        validityMessage.value = undefined
    }

    emitAll()
}

const onHandleBlur = () => isTyping.value = false

const onHandleInvalid = (evt: any) => {
    emit('update:error', evt.target.validityMessage)
}

const emitAll = () => {
    emit('update:modelValue', value.value)

    emit('update:state', state)

    emit('update:typing', isTyping.value)
    emit('update:filled', isFilled.value)
    emit('update:error', validityMessage.value)
}
</script>

<template>
    <input
        :required="validation.required"
        :id="attributes.id"
        :name="attributes.name"
        :type="attributes.type"
        :value="value"

        @focus="onHandleFocus"
        @input="onHandleInput"
        @blur="onHandleBlur"
        @invalid="onHandleInvalid"
    />
</template>
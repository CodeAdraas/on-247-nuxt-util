<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onBeforeUnmount } from 'vue'

interface State {
    checked: boolean
    error?: string
}

interface Emits {
    (e: 'update:modelValue', payload: any): void
    (e: 'update:checked', payload: boolean): void
    (e: 'update:error', error?: string): void
    (e: 'update:state', payload: State): void
}

interface Props {
    modelValue: string
    // Will be ignored if set initially
    checked?: boolean
    error?: boolean
    attributes: {
        name: string
        id?: string
        values: [ string, string ]
    }
    validation?: {
        required?: boolean
    }
    state?: State
}

const emit = defineEmits<Emits>()

const prop = withDefaults(
    defineProps<Props>(), {
    checked: false,
    error: false,
    attributes: () => ({
        name: '',
        id: undefined,
        values: [ 'true', 'false' ]
    }),
    validation: () => ({
        required: true
    })
})

const checked = ref(false)
const value = computed(() => prop.attributes.values[ checked.value ? 0 : 1 ])
const validationMessage = ref(undefined)
const state: State = reactive({
    checked: checked,
    error: validationMessage
})

const onHandleChange = (evt: any) => {
    checked.value = evt.target.checked

    if (evt.target.reportValidity() && validationMessage.value) {
        validationMessage.value = undefined
    }

    emitAll()
}

const onHandleInvalid = (evt: any) => {
    validationMessage.value = evt.target.validationMessage

    emitAll()
}

const emitAll = () => {
    emit('update:modelValue', value.value)

    emit('update:state', state)

    emit('update:checked', checked.value)

    emit('update:error', validationMessage.value)
}

const stopWatchChecked = watch(
    () => prop.checked,
    (val) => checked.value = val
)

onMounted(() => {
    // If a value was given, check if the checkbox should be checked
    // or unchecked.
    if (!!prop.modelValue) {
        switch (prop.modelValue) {
            case prop.attributes.values[0]:
                checked.value = true
                break
            case prop.attributes.values[1]:
                checked.value = false
                break
            default:
                console.warn('Invalid checkbox value given')
        }

        emitAll()
    }
})

onBeforeUnmount(() => stopWatchChecked())
</script>

<template>
    <input
        type="checkbox"
        :id="attributes?.id"
        :name="attributes.name"

        :checked="checked"
        :value="value"

        :required="validation.required"

        @change="onHandleChange"
        @invalid="onHandleInvalid"
    />
</template>
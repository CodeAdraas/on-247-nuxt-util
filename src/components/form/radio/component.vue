 <script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import NativeRadio from '../native-radio/component.vue'
import Indicator from '../indicator/component.vue'

interface Props {
    name: string
    modelValue?: string
    values: string[]
    multiple?: boolean
    required?: boolean
    errorIcon?: string
}

const prop = withDefaults(
    defineProps<Props>(), {
    modelValue: '',
    required: true
})

const id = computed(() => `input-${(new Date).valueOf()}-${prop.name.toLowerCase().replace(/ |\-/gi, '_')}`)
const radio = ref(prop.modelValue)
const state = reactive({
    error: undefined
})

const onUpdateState = ({ error }: any) => {
    state.error = error
}
</script>

<template>
    <div>
        <div
            :for="id"
            class="field"
        >
            <slot
                name="label"
            >
                <div>
                    <slot />
                </div>
            </slot>
            <!--  -->
            <slot
                name="radios"
                :on="{ updateState: onUpdateState }"
            >
                <div class="radios">
                    <label
                        v-for="value, index in values"
                        :key="index"
                        :for="`${id}_${index}`"
                    >
                        <native-radio
                            style="display:none;"
                            v-model="radio"
                            :attributes="{
                                id: `${id}_${index}`,
                                name,
                                value,
                                multiple
                            }"
                            :validation="{
                                required
                            }"
                            @update:state="onUpdateState"
                        />
                        <indicator :checked="radio.includes(value)" />
                        {{ value }}
                    </label>
                </div>
            </slot>
        </div>
        <!--  -->
        <slot
            name="errorHelp"
            :error="state.error"
        >
            <div
                v-if="state.error"
                class="error-help"
            >
                <icon
                    v-if="errorIcon"
                    :name="errorIcon"
                    :sizes="15"
                />
                <span>{{ state.error }}</span>
            </div>
        </slot>
    </div>
</template>

<style scoped lang="scss">
.field {
    display: flex;
    flex-direction: column;
    gap: var(--form-spacing-x, 1em) 0;
    padding: 0 0 0 var(--form-spacing-x, 1em);
    cursor: pointer;
}

.radios {
    display: flex;
    flex-direction: var(--form-radio-direction, column);
    gap: var(--form-spacing-y, 1.5em) var(--form-spacing-x, 1em);
    padding-bottom: var(--form-spacing-y, 1em);
    & > label {
        display: flex;
        gap: 0 var(--form-spacing-x, 1em);
        align-items: center;
    }
}

label {
    cursor: inherit;
}

.error-help {
    display: flex;
    gap: 0 var(--form-spacing-x, 1em);
    padding: 0 0 0 var(--form-spacing-x, 1em);
    margin: var(--form-spacing-y, 1em) 0;
    font-size: var(--form-small-font-size, 0.8em);
    color: var(--form-helper-color);
    & :deep(> .icon) {
        color: var(--form-invalid-color);
    }
}
</style>
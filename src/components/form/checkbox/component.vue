<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import NativeCheckbox from '../native-checkbox/component.vue'
import Indicator from '../indicator/component.vue'

interface Props {
    name: string
    modelValue?: string
    values: [ string, string ]
    required?: boolean
    errorIcon?: string
}

const prop = withDefaults(
    defineProps<Props>(), {
    modelValue: ''
})

const id = computed(() => `input-${(new Date).valueOf()}-${prop.name.toLowerCase().replace(/ |\-/gi, '_')}`)
const value = ref(prop.modelValue)
const state = reactive({
    checked: false,
    error: undefined
})

const onUpdateState = ({ checked, error }: any) => {
    state.checked = checked
    state.error = error
}
</script>

<template>
    <div>
        <label
            :for="id"
            class="field"
        >
            <slot
                name="indicator"
                :checked="state.checked"
            >
                <div>
                    <indicator :checked="state.checked" />
                </div>
            </slot>
            <!--  -->
            <slot
                name="label"
                :checked="state.checked"
            >
                <slot />
            </slot>
        </label>
        <!--  -->
        <native-checkbox
            style="display:none;"
            v-model="value"
            :attributes="{
                id,
                name,
                values
            }"
            :validation="{
                required
            }"
            @update:state="onUpdateState"
        />
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
    align-items: center;
    gap: 0 var(--form-spacing-x, 1em);
    padding: 0 0 0 var(--form-spacing-x, 1em);
    cursor: pointer;
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
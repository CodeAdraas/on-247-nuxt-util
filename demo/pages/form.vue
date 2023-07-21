<style>
:root {
    --form-border-radius: 0;
    --form-option-indicator-roundness: 0;
    --form-bg-color: white;
    --form-helper-color: gray;
    --form-valid-color: green;
    --form-invalid-color: red;
    --form-option-indicator-color: black;
}
</style>

<script setup lang="ts">
const breakpoint = useBreakpoint()

const formData = ref(new FormData)
const fields = reactive({
    name: null,
    email: null,
    services: 'Cleanroom, From home'
})
const controller =  ref()
const screen = reactive({
    small: breakpoint.between(null, 'md'),
    medium: breakpoint.between('md', 'lg'),
    large: breakpoint.between('lg', null),
})

const gridTemplateColumns = computed(() => `repeat(${screen.small ? 1 : screen.medium ? 2 : 4}, 1fr)`)

const stop = watch(() => fields.name, name => {
    if (!controller.value) return
    if (!!name) controller.value.hide()
    else controller.value.reveal()
})

onBeforeUnmount(() => stop())
</script>

<template>
    <Form
        submit-label="Submit"
        loading-label="Submitting..."
        @submit="(fd: FormData) => formData = fd"
    >
        <form-input
            name="date"
            type="date"
        />
        <form-input
            v-model="fields.name"
            name="name"
            :min="3"
        >
            <template #label="{ typing, filled }">
                <label-text-reveal :hide="typing || filled">
                    Your name
                </label-text-reveal>
            </template>
        </form-input>
        <form-input
            name="email"
            type="email"
        >
            Your e-mail
        </form-input>
        <form-select
            v-model="fields.services"
            name="services"
            :values="[
                'Cleanroom',
                'Industrial cleaning',
                'On premises',
                'From home'
            ]"
            required
        >
            Select services
            <template #values="{
                valueDict,
                invalid,
                on
            }">
                <client-only>
                    <div
                        :style="{
                            display: 'grid',
                            gridTemplateColumns,
                            gap: 'var(--form-spacing-y, 0.5em)'
                        }"
                    >
                        <select-indicator
                            v-for="(checked, value) in valueDict"
                            :key="value"
                            :active="checked"
                            :invalid="invalid"
                            @click="on.handleClick(value)"
                        >
                            {{ value }}
                        </select-indicator>
                    </div>
                </client-only>
            </template>
        </form-select>
        <form-input
            name="info"
            variant="textarea"
            :max="300"
            :required="false"
        >
            Optional info
        </form-input>
        <form-checkbox
            name="Algemene voorwaarden"
            :values="['Ja', 'Nee']"
            required
        >
            <div style="display:flex;flex-direction:column;gap:0.5em;">
                Ik ga akkoord met de algemene voorwaarden.
                <span style="color:gray;font-size:0.8em;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </span>
            </div>
        </form-checkbox>
    </Form>
    <!--  -->
    <pre v-if="[...formData.entries()].length">
        {{ JSON.stringify(Object.fromEntries(formData.entries())) }}
    </pre>
</template>
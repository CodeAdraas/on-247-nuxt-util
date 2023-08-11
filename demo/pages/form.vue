<style>
:root {
    --form-border-radius: 0;
    --form-indicator-roundness: 0;
    --form-bg-color: white;
    --form-border-color: orange;
    --form-helper-color: gray;
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
    drink: undefined,
    general: 'Nee'
})

const screen = reactive({
    small: breakpoint.between(null, 'md'),
    medium: breakpoint.between('md', 'lg'),
    large: breakpoint.between('lg', null),
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
            error-icon="alert-triangle"
            :required="false"
        >
            Datum
        </form-input>
        <form-input
            v-model="fields.name"
            name="name"
            :min="3"
            error-icon="alert-triangle"
        >
            Your name
        </form-input>
        <form-input
            name="email"
            type="email"
            error-icon="alert-triangle"
        >
            Your e-mail
        </form-input>
        <form-input
            name="info"
            variant="textarea"
            :max="300"
            :required="false"
            error-icon="alert-triangle"
        >
            Optional info
        </form-input>
        <form-radio
            v-model="fields.drink"
            name="drink"
            :values="['Coca Cola', 'Capri Sun', 'Gatoraid']"
            error-icon="alert-triangle"
        >
            What drink do you want?
        </form-radio>
        <form-checkbox
            v-model="fields.general"
            name="general"
            :values="['Ja', 'Nee']"
            error-icon="alert-triangle"
        >
            <div>
                <b>Ik ga akkoord met de algemene voorwaarden.</b>
                <br>
                <span style="font-size:0.8em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</span>
            </div>
        </form-checkbox>
    </Form>
    <!--  -->
    <pre v-if="[...formData.entries()].length">
        {{ JSON.stringify(Object.fromEntries(formData.entries())) }}
    </pre>
</template>
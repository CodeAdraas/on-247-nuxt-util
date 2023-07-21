<template>
    <form-drop
        :form="{
            submitLabel: 'Submit',
            loadingLabel: 'Loading...',
            successMessage: 'Success',
            errorMessage: 'Error error error'
        }"
        :captcha="{
            sitekey: '1x00000000000000000000AA',
            appearance: 'always',
            errorMessage: 'Error: captcha'
        }"
    >
        <form-input
            name="name"
            :min=3
        >
            Your name
        </form-input>
        <form-input
            name="email"
            type="email"
        >
            Your e-mail
        </form-input>
        <form-select
            name="services"
            required
            :values="['Option 1', 'Option 2']"
        >
            Select services
        </form-select>
        <form-input
            name="optional-info"
            variant="textarea"
            :max="300"
        >
            Optional info
        </form-input>
    </form-drop>
</template>
import {
    defineNuxtModule,
    createResolver,
    addComponent,
    addImportsDir,
    addPlugin,
} from '@nuxt/kit'

import type { Ref } from 'vue'
import type { Breakpoint, RangeArgs } from './lib/breakpoint'

interface BreakpointPlugin {
    current: Ref<Breakpoint>,
    is: (assertion: Breakpoint) => boolean,
    between: (...assertions: RangeArgs) => boolean
}

interface BrowserPlugin {
    name: string
    version: number
    versionNumber: string
    os: string
    mobile: boolean
    ios: boolean
    windows: boolean
}

declare module 'vue' {
	interface ComponentCustomProperties  {
		$window?: Window
		$browser: BrowserPlugin
		$breakpoint: BreakpointPlugin
	}
}

interface NuxterplateModuleOptions {}

const components = [
    ['Icon',            './components/icon/component.vue'],

    ['ImageLazy',       './components/lazy/image/component.vue'],
    ['VideoLazy',       './components/lazy/video/component.vue'],

    ['Captcha',         './components/captcha/component.vue'],

    ['CreditsEmbed',    './components/credits-embed/component.vue'],

    ['Form',            './components/form/component.vue'],
    ['FormInput',       './components/form/input/component.vue'],
    ['FormCheckbox',    './components/form/checkbox/component.vue'],
    ['FormRadio',       './components/form/radio/component.vue'],
    ['FormLabel',       './components/form/label/component.vue'],
    ['FormIndicator',   './components/form/indicator/component.vue'],

    ['NativeInput',     './components/form/native-input/component.vue'],
    ['NativeCheckbox',  './components/form/native-checkbox/component.vue'],
    ['NativeRadio',     './components/form/native-radio/component.vue'],
]

export default defineNuxtModule<NuxterplateModuleOptions>({
    meta: {
        name: 'nuxterplate',
        configKey: 'nuxterplate',
        compatibility: {
            nuxt: '^3.6.0'
        }
    },
    setup(moduleOptions, nuxt) {
        const resolver = createResolver(import.meta.url)

        nuxt.options.css.push(resolver.resolve('assets/css/breakpoint.css'))

        for (let [name, filePath] of components) addComponent({
            name,
            filePath: resolver.resolve(filePath)
        })

        addImportsDir(resolver.resolve('composables'))

        addPlugin(resolver.resolve('plugins/window'))
        addPlugin(resolver.resolve('plugins/browser'))
        addPlugin(resolver.resolve('plugins/breakpoint'))
    }
})
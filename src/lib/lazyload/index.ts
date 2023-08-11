import LazyLoad from 'vanilla-lazyload'
import { isClient, type GenericCallback } from '../util'

interface Listener {
    el: Element
    callback: GenericCallback
}

class MockLazyload {
    update() {}
    destroy() {}
}

export class Lazy {
    lazyload: any
    listeners: Listener[]

    constructor() {
        this.lazyload = null
        this.listeners = []
    }

    static withCallback() {
        let instance = new this()
        let options: Record<string, any> = {}

        // vanilla-lazyload specific options
        options.unobserve_entered = true
        options.callback_enter = instance.enterCallback.bind(instance)

        instance.lazyload = isClient
            ? new LazyLoad(options)
            : new MockLazyload()

        return instance
    }

    listen(el: Element, callback: GenericCallback) {
        this.listeners.push({el, callback})
    }

    update() {
        this.lazyload.update(this.listeners.map(({el}) => el))
    }

    private enterCallback(loadedEl: Element) {
        for (let {el, callback} of this.listeners) {
            if(el === loadedEl) {
                callback()
                this.removeListener(el)
                break;
            }
        }
    }

    private removeListener(loadedEl: Element) {
        this.listeners = this.listeners.filter(({el}) => el !== loadedEl)
    }
}
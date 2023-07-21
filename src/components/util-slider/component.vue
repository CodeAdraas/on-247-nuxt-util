<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { Autoplay, Swiper } from 'swiper'

interface Props {
    slidesPerView?: number
    spaceBetween?: number
    autoplay?: number | boolean
    breakpoints?: any
    loop?: boolean
    align?: 'start' | 'center' | 'end'
}

interface Emits {
    (e: 'swiper', instance: Swiper)
}

const prop = withDefaults(defineProps<Props>(), {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: 5000,
    loop: true,
    align: 'start'
})
const emit = defineEmits<Emits>()

const swiperEl = ref()
const swiperWrapper = ref()
const swiperController: Ref<Swiper | undefined> = ref()
const getAlignment = computed(() => {
    switch(prop.align) {
        case 'start':
            return 'flex-start'
        case 'center':
            return 'flex-end'
        case 'end':
            return 'flex-end'
        default:
            return 'flex-start'
    }
})

onMounted(() => {
    for (let slide of swiperWrapper.value.children) {
        slide.classList.add('swiper-slide')
    }

    const swiperOptions = {
        modules: [Autoplay],
        slidesPerView: prop.slidesPerView,
        spaceBetween: prop.spaceBetween,
        loop: prop.loop,
        breakpoints: prop?.breakpoints
    }
    if (prop.autoplay != false) {
        swiperOptions['autoplay'] = {
            delay: prop.autoplay
        }
    }

    swiperController.value = new Swiper(swiperEl.value, swiperOptions)

    emit('swiper', swiperController.value)
})

onBeforeUnmount(() => swiperController.value?.destroy())
</script>

<template>
    <div
        ref="swiperEl"
        class="slider"
    >
        <div
            ref="swiperWrapper"
            class="swiper-wrapper"
            :style="{alignItems: getAlignment}"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped>
.slider {
    width: 100%;
}
</style>
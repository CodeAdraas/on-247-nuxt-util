<script setup lang="ts">
const scroll = useScroll()
const { up, down } = useScrollDirection()

const speed = ref(0)
const progress = ref(0)

scroll.scroll(({ speed: speed_, progress: progress_ }) => {
    speed.value = speed_
    progress.value = progress_
})

const cube = ref()
onMounted(() => {
    scroll.init()
    // const intersect = scroll.intersect(cube)
    // intersect.enter(() => console.log('Cube enters viewport'))
    // intersect.entering(({ amount }) => console.log(`Cube entering viewport: ${Math.ceil(amount * 100)}%`))
    // intersect.entered(() => console.log(`Cube entered viewport`))
    // intersect.walking(({ amount }) => console.log(`Cube walking viewport: ${Math.ceil(amount * 100)}%`))
    // intersect.leave(() => console.log(`Cube leaving viewport`))
    // intersect.leaving(({ amount }) => console.log(`Cube leaving viewport: ${Math.ceil(amount * 100)}%`))
    // intersect.left(() => console.log(`Cube left viewport`))
})
</script>

<template>
    <header
        :style="{
            position: 'fixed',
            width: '100%',
            height: '80px',
            top: '40px',
            left: '0',
            right: '0',
            background: 'purple',
            transition: '.4s ease',
            transform: down ? 'translatey(-120px)' : 'translatey(0)'
        }"
    />
    <section
        style="min-height: 200vh"
    >

        <span style="position:fixed;top:120px;left:0;">Up: {{ up }} | Down: {{ down }}</span>
        <span style="position:fixed;top:140px;left:0;">Speed: {{ speed }}</span>
        <span style="position:fixed;top:160px;left:0;">Progress: {{ progress }}</span>

        <text-reveal
            style="margin-top:120vh;font-size:18px;"
            repeat
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </text-reveal>

        <div
            v-animate="'fade-in-up'"
            ref="cube"
            id="rect"
            :style="{
                background: 'green',
                marginTop: '150vh',
                width: '50vw',
                height: '50vw',
            }"
        />

        <text-reveal
            level="words"
            :from="{y: 0, opacity: 0}" :to="{opacity: 1}" repeat ease="power4.inOut"
            style="margin-top:120vh;font-size:40px;"
        >
            Lorem ipsum dolor sit amet
        </text-reveal>

        <div
            v-animate="'fade-in-up'"
            :style="{
                background: 'green',
                marginTop: '150vh',
                width: '100%',
                height: String(($window?.innerHeight ?? 0) * 2) + 'px'
            }"
        />

        <text-reveal
            level="chars" direction="horizontal"
            :duration="2" :stagger="0" repeat
            style="marginTop:120vh;font-size:40px;"
        >
            Lorem ipsum dolor sit amet
        </text-reveal>
    </section>
</template>
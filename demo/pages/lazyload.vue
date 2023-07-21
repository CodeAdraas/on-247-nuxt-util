<script setup lang="ts">
const alert = (message: string) => window.alert(message)
</script>

<template>
    <p>Scroll to bottom</p>
    <div style="margin-top:200vh;" />
    <util-lazy-image
        data-src="https://cfl.dropboxstatic.com/static/images/logo_catalog/blue_dropbox_glyph_m1-vflZvZxbS.png"
        @loaded="alert('Image lazy loaded')"
    />
    <util-lazy-video
        style="width:100%;"
        autoplay
        muted
        playsinline
        loop
        @loaded="alert('Video lazy loaded')"
    >
        <source
            type="video/mp4"
            data-src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/Dropbox_Homepage.mp4"
        />
    </util-lazy-video>
</template>
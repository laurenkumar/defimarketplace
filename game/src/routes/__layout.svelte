<script>
    import { Navbar } from 'davjhan-core'
    import 'davjhan-core/src/style.css'
</script>
<script context="module">

    export const prerender = true

</script>
<style>
    /*:global(body) {*/
    /*    overflow: hidden;*/
    /*    overscroll-behavior: none;*/
    /*}*/
</style>
<div class="xl:container xl:mx-auto max-w-screen-xl xl:border-l xl:border-r xl:h-screen xl:box-content border-gray-100 bg-background">
    <Navbar subPath='Safemoon Trader'/>
    <slot/>
</div>
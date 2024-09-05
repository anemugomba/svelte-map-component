<script>
    export let src = ''
    let buttonProps = {
        /*class:[$$restProps.class]*/
    }
</script>

<button class="w-6 h-6" on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        {...buttonProps}>
    <img class="w-8 h-8"
         src={src}
         alt="action button"/>
</button>

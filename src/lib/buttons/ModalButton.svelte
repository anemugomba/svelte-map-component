<script>

    let buttonProps = {
        /*class:[$$restProps.class]*/
    }

    let anchorProps = {
        target:[$$restProps.target]
    }

    export let disabled = false;

    export let styles;
</script>

<button disabled={disabled} class={`h-[58px] w-[198px] text-[20px] flex items-center
appearance-none leading-[22px]
flex items-center justify-center
rounded-[12px] cursor-pointer m-0
hover:shadow-[0_4px_8px_-3px_rgba(0,0,0,0.3)] decoration-[#fff] visited:text-[white] w-fit ${styles}`} on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        {...buttonProps}>
    <slot/>
</button>

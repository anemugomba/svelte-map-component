<script>

    let buttonProps = {
        /*class:[$$restProps.class]*/
    }

    let anchorProps = {
        target:[$$restProps.target]
    }

    export let disabled = false;

    const styles = `h-[24px] text-[14px] flex items-center
appearance-none text-[#ff8300] leading-[22px]
rounded cursor-pointer m-0 px-3 py-0
hover:shadow-[0_4px_8px_-3px_rgba(0,0,0,0.3)] decoration-[#fff] visited:text-[white] w-fit bg-[white]`
</script>

<button disabled={disabled} class={styles} on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        {...buttonProps}>
    <slot/>
</button>

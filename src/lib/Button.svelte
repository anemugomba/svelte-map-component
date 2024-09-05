<script>

    let buttonProps = {
        /*class:[$$restProps.class]*/
    }

    let anchorProps = {
        target:[$$restProps.target]
    }

    // TODO make these colors from the dock411 color palette
    export let color = '#ff8300';

    export let disabled = false;

    const styles = `h-[24px] text-[14px] flex items-center
appearance-none text-[white] border leading-[22px]
rounded cursor-pointer m-0 px-3 py-0 border-solid border-transparent
hover:shadow-[0_4px_8px_-3px_rgba(0,0,0,0.3)] decoration-[#fff] visited:text-[white] w-fit`
</script>

<button disabled={disabled} style={`background-color: ${color}`} class={styles} on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        {...buttonProps}>
    <slot/>
</button>

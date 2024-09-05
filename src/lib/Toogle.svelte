<script lang="ts">
	export let hidde = false;
	export let toggleHidde = () => {};
</script>

<!--<button on:click={toggleHidde} class="chevron-buttons font-bold">-->
<!--	{#if hidde}-->
<!--        <i class="bi bi-chevron-right"></i>-->
<!--    {:else}-->
<!--        <i class="bi bi-chevron-down"></i>-->
<!--	{/if}-->
<button on:click={toggleHidde} class="chevron-buttons font-bold">
	{#if hidde}
		<i class="bi bi-chevron-right"></i>
	{:else}
		<i class="bi bi-chevron-down"></i>
	{/if}

	<!--<img
		class="w-5 h-5 cursor-pointer"
		src="{hidde ? 'https://cdn-test.dock411.com/0000/d411-facility-map/editor/chevron-up' : 'https://cdn-test.dock411.com/0000/d411-facility-map/editor/chevron-down'}.svg"
		alt="chevron"
	/>-->
</button>



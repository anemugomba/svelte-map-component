<script lang="ts">
	export let styles = '';

	let hidde = false;
	let toggleHidde = () => (hidde = !hidde);
</script>

<div class="flex items-center w-full bg-[#D9D9D9] p-5 border-b-[2px] border-b-[#8E9193] {styles}">
	<slot {toggleHidde} {hidde} />
</div>

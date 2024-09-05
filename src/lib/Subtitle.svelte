<script lang="ts">
	import Toogle from './Toogle.svelte';

	export let subTitle = '';
	export let img = '';
	export let toggleHidde;
	export let hidde;
</script>

<div class="flex gap-x-5 mb-3.5 mt-[-4px]">
	<img class="w-10 h-10 cursor-pointer ml-[-1px]" src={img} alt="" />
	<p class="text-xl font-medium mr-auto ml-[-12px] mt-1">{subTitle}</p>
	<Toogle {toggleHidde} {hidde} />
</div>

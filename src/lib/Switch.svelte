<script lang="ts">
	export let withTitle = true;
</script>

<label class="inline-flex items-center cursor-pointer">
	<input type="checkbox" value="" class="sr-only peer" />
<!--	<div-->
<!--		class="relative w-11 h-6 rounded-full peer bg-[#C9C9C9] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"-->
<!--	></div>-->
	<div
		class="relative w-11 h-6 rounded-full peer bg-[#C9C9C9] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
	></div>
	{#if withTitle}
		<span class="ms-3 text-sm font-medium text-black select-none">Points of Interest</span>
	{/if}
</label>

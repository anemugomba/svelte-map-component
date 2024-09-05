<script>
	import { createEventDispatcher} from "svelte";
	const dispatch = createEventDispatcher();

	export let can_edit = false;

	export const toggle_edit_on = () =>{
		can_edit = true
	}
	export const toggle_edit_off = () =>{
		can_edit = false
	}

	export let activeItem = true;



</script>

<!--{#if can_edit}-->
<!--	<div class="edit-mode flex justify-around">-->

<!--		<button class="edit-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[#ff8300] text-[24px] text-white" on:click={toggle_edit}>-->
<!--		Edit</button>-->
<!--		<button class="view-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[white] text-[24px] text-[#ff8300]" on:click={toggle_edit}>-->
<!--			View-->
<!--		</button>-->
<!--	</div>-->
<!--	{:else}-->
<!--	<div class="edit-mode flex justify-around">-->
<!--		<button class="edit-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[white] text-[24px] text-[#ff8300] " on:click={toggle_edit}>-->
<!--			Edit</button>-->
<!--		<button class="view-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[#ff8300] text-[24px] text-white" on:click={toggle_edit}>-->
<!--			View-->
<!--		</button>-->
<!--	</div>-->

<!--{/if}-->
<!--	<div class="edit-mode flex justify-around">-->
<!--<div class="flex justify-around">-->
<!--	<div class:active={can_edit===activeItem}>-->
<!--		<button class="view-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[white] text-[24px] text-[#ff8300]" on:click={toggle_edit}>-->
<!--			Edit</button>-->
<!--		<button class="view-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[white] text-[24px] text-[#ff8300]" on:click={toggle_edit}>-->
<!--			View-->
<!--		</button>-->
<!--	</div>-->
<!--</div>-->

{#if can_edit}
		<div class="edit-mode flex justify-around">
			<button class="edit-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[#ff8300] text-[24px] text-[white]" on:click={toggle_edit_on}>
				Edit</button>
			<button class="view-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[white] text-[24px] text-[#ff8300]" on:click={toggle_edit_off}>
				View
			</button>
		</div>
{/if}
{#if !can_edit}
	<div class="edit-mode flex justify-around">
		<button class="view-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[white] text-[24px] text-[#ff8300]" on:click={toggle_edit_on}>
			Edit</button>
		<button class="edit-button w-[60px] h-[40px] border-[1px] border-[#ff8300] bg-[#ff8300] text-[24px] text-[white]" on:click={toggle_edit_off}>
			View
		</button>
	</div>
	{/if}






<style>

	.edit-button{
			/*width:60px;*/
      /*border: 2px solid #ff8300;*/
			/*padding-left:5px;*/
			/*padding-right:5px;*/
			/*height:40px;*/
			border-radius:5px;
			/*background-color:#ff8300*/
	}
	.view-button{
      /*width:60px;*/
      /*border: 2px solid #ff8300;*/
      /*padding-left:5px;*/
      /*padding-right:5px;*/
      /*height:40px;*/
      border-radius:5px;
      /*background-color:#ff8300*/
	}
  .active{
      width:60px;
      border: 2px solid #ff8300;
      padding-left:5px;
      padding-right:5px;
      height:40px;
      border-radius:5px;
  	background-color:#ff8300
	}


</style>
<script lang="ts">
	let { hourHeight } = $props();
</script>

<div class="flex flex-col h-full w-fit" style="margin-top: {hourHeight / 2}px;">
	{#each { length: 23 }, hour}
		<div class="flex items-center justify-end" style="height: {hourHeight + 1}px;">
			<div class="flex flex-row items-center gap-2">
				<span>{hour + 1}:00</span>
				<div class="h-[1px] w-3 bg-gray-300"></div>
			</div>
		</div>
	{/each}
</div>

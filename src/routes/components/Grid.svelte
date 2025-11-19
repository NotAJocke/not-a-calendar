<script lang="ts">
	let { daysDisplayed, hourHeight } = $props();
</script>

<div
	class="w-full grid gap-[1px] bg-gray-300 border-l border-gray-300"
	style="grid-template-columns: repeat({daysDisplayed}, minmax(0, 1fr));"
>
	{#each { length: 24 }}
		{#each { length: daysDisplayed }}
			<div class="bg-white" style="height: {hourHeight}px;"></div>
		{/each}
	{/each}
</div>

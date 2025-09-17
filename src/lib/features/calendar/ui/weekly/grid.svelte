<script lang="ts">
	import { getContext } from 'svelte';
	import type { WeeklyStore } from '../../stores/weekly-store.svelte';

	let store: WeeklyStore = getContext('weekly-store');

	let hourHeight = 60;
</script>

<div
	class="w-full grid gap-[1px] bg-gray-300 border-l border-gray-300"
	style="grid-template-columns: repeat({store.daysDisplayed}, minmax(0, 1fr));"
>
	{#each { length: 24 }}
		{#each { length: store.daysDisplayed }}
			<div class="bg-white" style="height: {hourHeight}px;"></div>
		{/each}
	{/each}
</div>

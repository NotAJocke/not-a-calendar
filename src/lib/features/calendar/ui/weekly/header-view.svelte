<script lang="ts">
	import { getContext } from 'svelte';
	import type { WeeklyStore } from '../../stores/weekly-store.svelte';

	let store: WeeklyStore = getContext('weekly-store');
</script>

<header class="w-full sticky z-50 top-0 bg-white flex flex-col items-center">
	<h1>{store.currentWeekStart.toFormat('LLLL yyyy')}</h1>

	<div class="flex flex-row gap-2">
		<button
			class="border border-neutral-200 rounded-lg shadow-xs px-2 py-1 bg-white hover:bg-neutral-50 cursor-pointer"
			on:click={() => store.back()}>Back</button
		>
		<button
			class="border border-neutral-200 rounded-lg shadow-xs px-2 py-1 bg-white hover:bg-neutral-50 cursor-pointer"
			on:click={() => store.resetOffset()}>Today</button
		>
		<button
			class="border border-neutral-200 rounded-lg shadow-xs px-2 py-1 bg-white hover:bg-neutral-50 cursor-pointer"
			on:click={() => store.next()}>Next</button
		>
	</div>

	<div class="w-full flex flex-row">
		<!-- This hidden content is used to make the dynamic padding so the header start at the right pos -->
		<div class="flex flex-row items-center gap-2 opacity-0">
			<span>23:00</span>
			<div class="h-[1px] w-3 bg-gray-300"></div>
		</div>

		<div class="w-full flex flex-row border-b border-gray-300">
			{#each Array.from( { length: store.daysDisplayed }, (_, i) => store.currentWeekStart.plus( { days: i } ) ) as date, i}
				<div
					class="flex items-center flex-col relative"
					style="width: calc(100%/{store.daysDisplayed});"
				>
					<div class="absolute top-1/2 left-0 border-l border-gray-300 h-1/2"></div>
					<span style="font-weight: {store.isToday(date) ? '500' : 'normal'};"
						>{date.toFormat('ccc')}</span
					>
					<div
						class="px-2 py-1 rounded-full"
						style="
						    background-color: {store.isToday(date) ? 'var(--color-blue-300)' : 'white'};
							color: {store.isToday(date) ? 'white' : 'black'}
						"
					>
						{date.day}
					</div>
				</div>
			{/each}
		</div>
	</div>
</header>

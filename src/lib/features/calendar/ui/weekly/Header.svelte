<script lang="ts">
	import { DateTime } from 'luxon';

	import ChevronRight from '$lib/assets/chevron-right.svg';
	import ChevronLeft from '$lib/assets/chevron-left.svg';

	let { currentWeekStart, daysDisplayed = $bindable(), prev, next, reset } = $props();

	function isToday(date: DateTime): boolean {
		return DateTime.now().hasSame(date, 'day');
	}
</script>

<header class="w-full sticky z-50 top-0 bg-white flex flex-col items-center">
	<h1>{currentWeekStart.toFormat('LLLL yyyy')}</h1>

	<select name="columns" id="columns" bind:value={daysDisplayed}>
		<option value={1}>1</option>
		<option value={5}>5</option>
		<option value={7}>7</option>
	</select>

	<div class="flex flex-row gap-1">
		<button
			class="border border-neutral-200 rounded-lg shadow-xs px-2 py-1 bg-white hover:bg-neutral-50 cursor-pointer"
			onclick={prev}
		>
			<img src={ChevronLeft} alt="" width="18" />
		</button>
		<button
			class="border border-neutral-200 rounded-lg shadow-xs px-2 py-1 bg-white hover:bg-neutral-50 cursor-pointer"
			onclick={reset}>Today</button
		>
		<button
			class="border border-neutral-200 rounded-lg shadow-xs px-2 py-1 bg-white hover:bg-neutral-50 cursor-pointer"
			onclick={next}
		>
			<img src={ChevronRight} alt="" width="18" />
		</button>
	</div>

	<div class="w-full flex flex-row">
		<!-- This hidden content is used to make the dynamic padding so the header start at the right pos -->
		<div class="flex flex-row items-center gap-2 opacity-0">
			<span>23:00</span>
			<div class="h-[1px] w-3 bg-gray-300"></div>
		</div>

		<div class="w-full flex flex-row border-b border-gray-300">
			{#each Array.from( { length: daysDisplayed }, (_, i) => currentWeekStart.plus( { days: i } ) ) as date, i}
				<div class="flex items-center flex-col relative" style="width: calc(100%/{daysDisplayed});">
					<div class="absolute top-1/2 left-0 border-l border-gray-300 h-1/2"></div>
					<span style="font-weight: {isToday(date) ? '500' : 'normal'};"
						>{date.toFormat('ccc')}</span
					>
					<div
						class="px-2 py-1 rounded-full"
						style="
						    background-color: {isToday(date) ? 'var(--color-blue-300)' : 'white'};
							color: {isToday(date) ? 'white' : 'black'}
						"
					>
						{date.day}
					</div>
				</div>
			{/each}
		</div>
	</div>
</header>

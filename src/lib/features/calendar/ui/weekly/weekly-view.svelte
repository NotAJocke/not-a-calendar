<script lang="ts">
	import { setContext } from 'svelte';
	import { WeeklyStore } from '../../stores/weekly-store.svelte';
	import EventView from './event-view.svelte';
	import Grid from './grid.svelte';
	import HeaderView from './header-view.svelte';
	import HoursColumnView from './hours-column-view.svelte';

	let store = new WeeklyStore();
	setContext('weekly-store', store);

	const events = [
		{ day: '2', start: '4.5', end: '6', title: 'test' },
		{ day: '0', start: '16', end: '17', title: 'Fitness' },
		{ day: '1', start: '15', end: '16', title: 'Fitness' },
		{ day: '3', start: '15', end: '16', title: 'Fitness' },
		{ day: '4', start: '14', end: '15', title: 'Fitness' }
	];
</script>

<div class="w-screen flex relative">
	<div class="w-full flex flex-col">
		<HeaderView />

		<div class="flex flex-row w-full relative">
			<HoursColumnView />

			<div class="relative w-full">
				<Grid />

				{#each events as event}
					<EventView day={event.day} start={event.start} end={event.end} title={event.title} />
				{/each}
			</div>
		</div>
	</div>
</div>

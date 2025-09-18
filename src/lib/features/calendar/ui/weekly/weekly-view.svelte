<script lang="ts">
	import { setContext } from 'svelte';
	import { DateTime } from 'luxon';

	import { WeeklyStore } from '../../stores/weekly-store.svelte';
	import EventView from './event-view.svelte';
	import Grid from './grid.svelte';
	import HeaderView from './header-view.svelte';
	import HoursColumnView from './hours-column-view.svelte';

	let store = new WeeklyStore();
	setContext('weekly-store', store);

	let { tasks } = $props();
	store.tasks = tasks;

	function getDayIndex(iso: string) {
		return (DateTime.fromISO(iso).weekday + 7 - 1) % 7;
	}

	function getHour(iso: string) {
		return DateTime.fromISO(iso).hour + DateTime.fromISO(iso).minute / 60;
	}
</script>

<div class="w-screen flex relative">
	<div class="w-full flex flex-col">
		<HeaderView />

		<div class="flex flex-row w-full relative">
			<HoursColumnView />

			<div class="relative w-full">
				<Grid />

				{#each store.tasksInView as task}
					<EventView
						day={getDayIndex(task.deadline.start)}
						start={getHour(task.deadline.start)}
						end={getHour(task.deadline.end)}
						title={task.title}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>

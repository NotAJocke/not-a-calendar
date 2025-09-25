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

	$effect(() => console.log(store.taskSlicesInView));
</script>

<div class="w-full flex relative">
	<div class="w-full flex flex-col">
		<HeaderView />

		<div class="flex flex-row w-full relative">
			<HoursColumnView />

			<div class="relative w-full">
				<Grid />

				{#each store.taskSlicesInView as task (task.taskId + '-' + task.day + '-' + task.role)}
					<EventView day={task.day} start={task.start} end={task.end} title={task.title} />
				{/each}
			</div>
		</div>
	</div>
</div>

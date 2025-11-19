<script lang="ts">
	import { DateTime, Interval } from 'luxon';

	import type { PageProps } from './$types';
	import Grid from './components/Grid.svelte';
	import HoursColumn from './components/HoursColumn.svelte';
	import Header from './components/Header.svelte';
	import { expandTasks } from '$lib/utils/task';
	import Task from './components/Task.svelte';

	let { data }: PageProps = $props();

	let daysDisplayed = $state(5);
	let hourHeight = 60;
	let currentWeekStart = $state(DateTime.now().startOf('week'));

	let viewRange = $derived(
		Interval.fromDateTimes(currentWeekStart, currentWeekStart.plus({ days: daysDisplayed }))
	);

	let tasks = $derived(expandTasks(data.tasks, viewRange));

	$effect(() => console.log(tasks));

	function next() {
		currentWeekStart = currentWeekStart.plus({ days: daysDisplayed });
	}

	function prev() {
		currentWeekStart = currentWeekStart.minus({ days: daysDisplayed });
	}

	function reset() {
		currentWeekStart = DateTime.now().startOf('week');
	}
</script>

<div class="flex flex-col relative">
	<Header bind:daysDisplayed {currentWeekStart} {next} {prev} {reset} />

	<div class="flex flex-row w-full">
		<HoursColumn {hourHeight} />

		<div class="relative w-full h-full">
			<Grid {daysDisplayed} {hourHeight} />

			{#each tasks as task}
				<Task {task} {daysDisplayed} />
			{/each}
		</div>
	</div>
</div>

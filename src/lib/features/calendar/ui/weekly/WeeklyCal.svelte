<script lang="ts">
	import { DateTime, Interval } from 'luxon';

	import Grid from './Grid.svelte';
	import HoursColumn from './HoursColumn.svelte';
	import Header from './Header.svelte';
	import Task from './Task.svelte';
	import { computeLayout } from '../../layout';
	import { expandTasks } from '../../data';

	let { tasks } = $props();

	let daysDisplayed = $state(5);
	let hourHeight = 60;
	let currentWeekStart = $state(DateTime.now().startOf('week'));

	let viewRange = $derived(
		Interval.fromDateTimes(currentWeekStart, currentWeekStart.plus({ days: daysDisplayed }))
	);

	let renderedTasks = $derived(computeLayout(expandTasks(tasks, viewRange)));

	$effect(() => console.log(renderedTasks));

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

			{#each renderedTasks as task}
				<Task {task} {daysDisplayed} />
			{/each}
		</div>
	</div>
</div>

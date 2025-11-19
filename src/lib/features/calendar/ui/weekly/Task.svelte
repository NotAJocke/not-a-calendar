<script lang="ts">
	import type { RenderedTask } from '$lib/models/rendered-task';

	let { task, daysDisplayed }: { task: RenderedTask; daysDisplayed: number } = $props();

	let gridBordersOffset = task.interval.length('hours');
	let height = task.duration + gridBordersOffset; // duration + 1px/h for grid border
	let top = task.startOffset + task.interval.start!.hour;
</script>

<div
	class="absolute bg-red-300 rounded-xl text-white p-2"
	style="width: calc(100% / {daysDisplayed} / {task.columnCount}); height: {height}px; top: {top}px; left: calc(100% / {daysDisplayed} * {task.dayIndex -
		1} + (100% / {daysDisplayed} / {task.columnCount} * {task.columnIndex}));"
>
	{task.title}
</div>

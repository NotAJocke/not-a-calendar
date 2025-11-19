import type { RenderedTask } from './models/rendered-task';
import { Interval } from 'luxon';
import type { Task } from './models/task';

export function expandTasks(tasks: Task[], range: Interval): RenderedTask[] {
	const rawResults: RenderedTask[] = [];

	// 1. GENERATION PHASE
	for (const task of tasks) {
		// Collect all interval sources (deadline + doDates)
		const sourceIntervals: Interval[] = [];

		if (task.deadline) sourceIntervals.push(task.deadline);
		if (task.doDates && task.doDates.length) {
			sourceIntervals.push(...task.doDates);
		}

		for (const interval of sourceIntervals) {
			// Skip intervals not intersecting the week range
			const clipped = interval.intersection(range);
			if (!clipped) continue;

			// Split the interval by days for rendering
			const daySlices = splitIntervalByDays(clipped);

			for (const slice of daySlices) {
				const start = slice.start;
				const dayIndex = start.weekday;
				const startOffset = start.diff(start.startOf('day'), 'minutes').minutes;
				const duration = slice.toDuration('minutes').minutes;

				rawResults.push({
					id: task.id,
					title: task.title,
					interval: slice,
					dayIndex,
					startOffset,
					duration,
					// Defaults (will be overwritten in step 2)
					columnIndex: 0,
					columnCount: 1,
					priority: task.priority,
					isPinned: task.isPinned,
					tags: task.tags
				});
			}
		}
	}

	return rawResults;
}

function splitIntervalByDays(interval: Interval<true>): Interval<true>[] {
	const slices: Interval[] = [];

	let cursor = interval.start;
	const end = interval.end;

	while (cursor < end) {
		const nextDayStart = cursor.plus({ days: 1 }).startOf('day');

		const sliceEnd = end < nextDayStart ? end : nextDayStart;

		slices.push(Interval.fromDateTimes(cursor, sliceEnd));

		cursor = sliceEnd;
	}

	return slices;
}

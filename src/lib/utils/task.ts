import type { RenderedTask } from '$lib/models/rendered-task';
import type { Task } from '$lib/models/task';
import { DateTime, Interval } from 'luxon';

export function expandTasks(tasks: Task[], range: Interval): RenderedTask[] {
	const results: RenderedTask[] = [];

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
				const dayIndex = start.weekday; // 1–7
				const startOffset = start.diff(start.startOf('day'), 'minutes').minutes;
				const duration = slice.toDuration('minutes').minutes;

				results.push({
					id: task.id,
					title: task.title,
					interval: slice,

					dayIndex,
					startOffset,
					duration,

					// no overlap logic here
					columnIndex: 0,
					columnCount: 1,

					priority: task.priority,
					isPinned: task.isPinned,
					tags: task.tags
				});
			}
		}
	}

	return results;
}

/**
 * Splits an interval into day-boundary chunks.
 * Example: Mon 20:00 → Tue 04:00 becomes:
 *   - Mon 20:00 → Tue 00:00
 *   - Tue 00:00 → Tue 04:00
 */
function splitIntervalByDays(interval: Interval<true>): Interval<true>[] {
	const slices: Interval[] = [];

	let cursor = interval.start;
	const end = interval.end;

	while (cursor < end) {
		const endOfDay = cursor.endOf('day');
		const sliceEnd = end < endOfDay ? end : endOfDay;

		slices.push(Interval.fromDateTimes(cursor, sliceEnd));

		cursor = sliceEnd.plus({ milliseconds: 1 });
	}

	return slices;
}

let taskIdCounter = 0;
export function createTask(overrides: Partial<Task>): Task {
	return {
		id: overrides.id ?? `${taskIdCounter++}`,
		title: overrides.title ?? 'Untitled',
		body: overrides.body,

		completed: overrides.completed ?? false,
		completedAt: overrides.completedAt ?? null,

		priority: overrides.priority ?? 'none',
		effortLevel: overrides.effortLevel ?? 'low',

		dependencies: overrides.dependencies,

		createdAt: overrides.createdAt ?? DateTime.now(),
		updatedAt: overrides.updatedAt ?? DateTime.now(),

		deadline: overrides.deadline,
		isPinned: overrides.isPinned,

		doDates: overrides.doDates,

		tags: overrides.tags,

		estimatedDuration: overrides.estimatedDuration,
		actualDuration: overrides.actualDuration,

		externalId: overrides.externalId,
		parentId: overrides.parentId
	};
}

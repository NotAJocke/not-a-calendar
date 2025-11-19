import type { RenderedTask } from './models/rendered-task';

/**
 * Groups tasks by day and calculates visual columns.
 */
export function computeLayout(tasks: RenderedTask[]): RenderedTask[] {
	// Group by Day Index to isolate overlap logic per day
	const tasksByDay = new Map<number, RenderedTask[]>();

	for (const task of tasks) {
		if (!tasksByDay.has(task.dayIndex)) {
			tasksByDay.set(task.dayIndex, []);
		}
		tasksByDay.get(task.dayIndex)!.push(task);
	}

	const calculatedResults: RenderedTask[] = [];

	// Process each day independently
	for (const [_, dayTasks] of tasksByDay) {
		const laidOutDay = layoutDay(dayTasks);
		calculatedResults.push(...laidOutDay);
	}

	return calculatedResults;
}

/**
 * The Visual Packing Algorithm
 * 1. Sorts by start time.
 * 2. Places events into the first available column.
 * 3. Calculates total width based on collisions.
 */
function layoutDay(tasks: RenderedTask[]): RenderedTask[] {
	if (tasks.length === 0) return [];

	// 1. Sort by Start Time, then by duration (longest first for better packing)
	tasks.sort((a, b) => {
		if (a.startOffset !== b.startOffset) return a.startOffset - b.startOffset;
		return b.duration - a.duration;
	});

	// 2. Assign Columns
	// We track the end time of the last event placed in each visual column
	const columnEndTimes: number[] = [];

	for (const task of tasks) {
		let placed = false;

		// Try to fit into an existing column
		for (let i = 0; i < columnEndTimes.length; i++) {
			// If this column's last event ends before (or when) the current task starts
			if (columnEndTimes[i] <= task.startOffset) {
				task.columnIndex = i;
				columnEndTimes[i] = task.startOffset + task.duration;
				placed = true;
				break;
			}
		}

		// If it didn't fit in any existing column, add a new one
		if (!placed) {
			task.columnIndex = columnEndTimes.length;
			columnEndTimes.push(task.startOffset + task.duration);
		}
	}

	// 3. Expand Width (Optional but recommended)
	// If you want tasks to expand to fill empty space, we need to calculate
	// 'clusters' of overlapping events.

	// A simple approach for columnCount is to find the max number of columns
	// needed for the specific time block the task is in.

	for (const task of tasks) {
		// Find all tasks that overlap with the current task
		const overlapping = tasks.filter((t) => areOverlapping(task, t));

		// The column count is the maximum columnIndex found among overlaps + 1
		// OR simply the total number of overlapping items if you want equal width
		// Standard calendar UI behavior:
		const maxIndex = Math.max(...overlapping.map((t) => t.columnIndex));

		// This ensures that if there are 3 columns, items know they are 1 of 3.
		// Note: This is a simplified expansion. Complex calendars use "clusters".
		task.columnCount = maxIndex + 1;
	}

	return tasks;
}

// Helper to check if two tasks overlap in time
function areOverlapping(a: RenderedTask, b: RenderedTask): boolean {
	const aEnd = a.startOffset + a.duration;
	const bEnd = b.startOffset + b.duration;

	return a.startOffset < bEnd && b.startOffset < aEnd;
}

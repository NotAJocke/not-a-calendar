import type { Task } from '$lib/shared/models/task-model';
import { DateTime } from 'luxon';
import type { TaskSlice } from '../models/task-slice';

export function sliceTask(task: Task, viewStart: DateTime, viewEnd: DateTime): TaskSlice[] {
	const slices: TaskSlice[] = [];

	const actualStart = DateTime.fromISO(task.deadline.start); // real task start
	const actualEnd = DateTime.fromISO(task.deadline.end); // real task end

	// clamp to current view for rendering
	let start = actualStart < viewStart ? viewStart : actualStart;
	let end = actualEnd > viewEnd ? viewEnd : actualEnd;

	const isSingleDay = actualStart.hasSame(actualEnd, 'day');
	if (isSingleDay) {
		slices.push({
			taskId: task.id,
			day: Math.floor(start.diff(viewStart, 'days').days),
			start: start.hour + start.minute / 60,
			end: end.hour + end.minute / 60,
			title: task.title,
			isAllDay: task.allDay,
			role: 'single'
		});
		return slices;
	}

	// multi-day task
	let cursor = start.startOf('day');
	const lastCursor = end.startOf('day');

	while (cursor <= lastCursor) {
		const isFirst = cursor.hasSame(actualStart, 'day');
		const isLast = cursor.hasSame(actualEnd, 'day');

		// skip zero-length slice for midnight-ending tasks
		if (isLast && end.hour === 0 && end.minute === 0) break;

		slices.push({
			taskId: task.id,
			day: Math.floor(cursor.diff(viewStart, 'days').days),
			start: isFirst ? start.hour + start.minute / 60 : 0,
			end: isLast
				? Math.min(actualEnd.hour + actualEnd.minute / 60, end.hour + end.minute / 60)
				: 24,
			title: isFirst ? task.title : '',
			isAllDay: task.allDay,
			role: isFirst ? 'start' : isLast ? 'end' : 'middle'
		});

		cursor = cursor.plus({ days: 1 });
	}

	return slices;
}

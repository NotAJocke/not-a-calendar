import type { RenderedTask } from '$lib/models/rendered-task';
import type { Task } from '$lib/models/task';
import { DateTime, Interval } from 'luxon';
import { expect, test } from 'vitest';
import { createTask, expandTasks } from './task';

//TODO: delete this file when moving the layout tests

test('Simple task to rendered task', () => {
	const start = DateTime.now().endOf('hour');
	const end = start.plus({ hours: 2 });

	const weekStart = start.startOf('week');
	const weekEnd = weekStart.plus({ days: 7 });
	const weekRange = Interval.fromDateTimes(weekStart, weekEnd);

	const task = createTask({
		deadline: Interval.fromDateTimes(start, end)
	});

	const expected: RenderedTask = {
		id: task.id,
		title: task.title,
		interval: Interval.fromDateTimes(start, end),
		dayIndex: start.localWeekday,
		startOffset: start.diff(start.startOf('day'), 'minutes').minutes,
		duration: task.deadline!.toDuration('minutes').minutes,
		columnIndex: 0,
		columnCount: 1,
		priority: task.priority
	};

	const rendered = expandTasks([task], weekRange);

	expect(rendered).toEqual([expected]);
});

test("Task without do dates or deadline isn't rendered", () => {
	const start = DateTime.now().endOf('hour');
	const end = start.plus({ hours: 2 });

	const weekStart = start.startOf('week');
	const weekEnd = weekStart.plus({ days: 7 });
	const weekRange = Interval.fromDateTimes(weekStart, weekEnd);

	const task: Task = {
		id: '1',
		title: 'Test task',
		completed: false,
		completedAt: null,
		priority: 'none',
		effortLevel: 'low',
		createdAt: DateTime.now(),
		updatedAt: DateTime.now()
	};

	const rendered = expandTasks([task], weekRange);

	expect(rendered).toEqual([]);
});

test('Cross-day task is split in two render', () => {
	const start = DateTime.now().startOf('day').plus({ hours: 20 }); // 20:00 today
	const end = start.plus({ day: 1 }).startOf('day').plus({ hours: 4 }); // 04:00 next day

	const weekStart = start.startOf('week');
	const weekEnd = weekStart.plus({ days: 7 });
	const weekRange = Interval.fromDateTimes(weekStart, weekEnd);

	const task: Task = {
		id: '1',
		title: 'Test task',
		completed: false,
		completedAt: null,
		priority: 'none',
		effortLevel: 'low',
		createdAt: DateTime.now(),
		updatedAt: DateTime.now(),
		deadline: Interval.fromDateTimes(start, end)
	};

	// The task splits into two slices:
	const firstSliceEnd = start.endOf('day');
	const secondSliceStart = firstSliceEnd.plus({ milliseconds: 1 });

	const expected: RenderedTask[] = [
		{
			id: task.id,
			title: task.title,
			interval: Interval.fromDateTimes(start, firstSliceEnd),
			dayIndex: start.localWeekday,
			startOffset: start.diff(start.startOf('day'), 'minutes').minutes,
			duration: Interval.fromDateTimes(start, firstSliceEnd).toDuration('minutes').minutes,
			columnIndex: 0,
			columnCount: 1,
			priority: task.priority
		},
		{
			id: task.id,
			title: task.title,
			interval: Interval.fromDateTimes(secondSliceStart, end),
			dayIndex: secondSliceStart.localWeekday,
			startOffset: secondSliceStart.diff(secondSliceStart.startOf('day'), 'minutes').minutes,
			duration: Interval.fromDateTimes(secondSliceStart, end).toDuration('minutes').minutes,
			columnIndex: 0,
			columnCount: 1,
			priority: task.priority
		}
	];

	const rendered = expandTasks([task], weekRange);

	expect(rendered).toEqual(expected);
});

test('Task with both deadline and doDates generates multiple RenderedTasks', () => {
	const weekStart = DateTime.now().startOf('week');
	const weekEnd = weekStart.plus({ days: 7 });
	const weekRange = Interval.fromDateTimes(weekStart, weekEnd);

	// Deadline: 2 hours on Monday
	const deadlineStart = weekStart.plus({ hours: 9 });
	const deadlineEnd = deadlineStart.plus({ hours: 2 });

	// doDate: 1 hour on Wednesday
	const doDateStart = weekStart.plus({ days: 2, hours: 14 });
	const doDateEnd = doDateStart.plus({ hours: 1 });

	const task: Task = {
		id: 'combo',
		title: 'Deadline + doDate task',
		completed: false,
		completedAt: null,
		priority: 'medium',
		effortLevel: 'high',
		createdAt: DateTime.now(),
		updatedAt: DateTime.now(),
		deadline: Interval.fromDateTimes(deadlineStart, deadlineEnd),
		doDates: [Interval.fromDateTimes(doDateStart, doDateEnd)]
	};

	const expected: RenderedTask[] = [
		{
			id: task.id,
			title: task.title,
			interval: Interval.fromDateTimes(deadlineStart, deadlineEnd),
			dayIndex: deadlineStart.localWeekday,
			startOffset: deadlineStart.diff(deadlineStart.startOf('day'), 'minutes').minutes,
			duration: Interval.fromDateTimes(deadlineStart, deadlineEnd).toDuration('minutes').minutes,
			columnIndex: 0,
			columnCount: 1,
			priority: task.priority
		},
		{
			id: task.id,
			title: task.title,
			interval: Interval.fromDateTimes(doDateStart, doDateEnd),
			dayIndex: doDateStart.localWeekday,
			startOffset: doDateStart.diff(doDateStart.startOf('day'), 'minutes').minutes,
			duration: Interval.fromDateTimes(doDateStart, doDateEnd).toDuration('minutes').minutes,
			columnIndex: 0,
			columnCount: 1,
			priority: task.priority
		}
	];

	const rendered = expandTasks([task], weekRange);

	expect(rendered).toEqual(expected);
});

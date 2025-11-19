import { expandTasks } from '$lib/features/calendar/data';
import type { RenderedTask } from '$lib/features/calendar/models/rendered-task';
import { createTask } from '$lib/features/calendar/models/task';
import { DateTime, Duration, Interval } from 'luxon';
import { describe, expect, test } from 'vitest';

describe('Task conversion into RenderedTask (wo/layout)', () => {
	test('Simple conversion', () => {
		const start = DateTime.now().startOf('day').plus({ hours: 7 });
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
			interval: task.deadline!,
			dayIndex: start.weekday,
			startOffset: 420, // 7h * 60
			duration: 120,
			columnIndex: 0,
			columnCount: 1,
			priority: task.priority
		};

		const rendered = expandTasks([task], weekRange);

		expect(rendered).toEqual([expected]);
	});

	test('Not scheduled task does not render', () => {
		const start = DateTime.now().startOf('day').plus({ hours: 7 });

		const weekStart = start.startOf('week');
		const weekEnd = weekStart.plus({ days: 7 });
		const weekRange = Interval.fromDateTimes(weekStart, weekEnd);

		const task = createTask({});

		const rendered = expandTasks([task], weekRange);

		expect(rendered).toEqual([]);
	});

	test('Task with a deadline and two doDates', () => {
		const startDay = DateTime.now().startOf('day');

		// deadline 10h-12h
		const start = startDay.plus({ hours: 10 });
		const end = start.plus({ hours: 2 });

		// dd1 4h-5h
		const dd1Start = startDay.plus({ hours: 4 });
		const dd1End = dd1Start.plus({ hours: 1 });
		// dd2 6h-10h
		const dd2Start = startDay.plus({ hours: 6 });
		const dd2End = dd2Start.plus({ hours: 4 });

		const weekStart = startDay.startOf('week');
		const weekEnd = weekStart.plus({ days: 7 });
		const weekRange = Interval.fromDateTimes(weekStart, weekEnd);

		const task = createTask({
			deadline: Interval.fromDateTimes(start, end),
			doDates: [Interval.fromDateTimes(dd1Start, dd1End), Interval.fromDateTimes(dd2Start, dd2End)]
		});

		const expected: RenderedTask[] = [
			{
				id: task.id,
				title: task.title,
				interval: task.deadline!,
				dayIndex: startDay.weekday,
				startOffset: 600, // 10h * 60
				duration: 120,
				columnIndex: 0,
				columnCount: 1,
				priority: task.priority
			},
			{
				id: task.id,
				title: task.title,
				interval: task.doDates![0],
				dayIndex: startDay.weekday,
				startOffset: 240,
				duration: 60,
				columnIndex: 0,
				columnCount: 1,
				priority: task.priority
			},
			{
				id: task.id,
				title: task.title,
				interval: task.doDates![1],
				dayIndex: startDay.weekday,
				startOffset: 360,
				duration: 240,
				columnIndex: 0,
				columnCount: 1,
				priority: task.priority
			}
		];

		const rendered = expandTasks([task], weekRange);

		expect(rendered).toEqual(expected);
	});

	test('Task across two days generates two renders', () => {
		const start = DateTime.now().startOf('day').plus({ hours: 22 });
		const end = start.plus({ hours: 4 });
		const next = start.plus({ days: 1 }).startOf('day');

		const weekStart = start.startOf('week');
		const weekEnd = weekStart.plus({ days: 7 });
		const weekRange = Interval.fromDateTimes(weekStart, weekEnd);

		const task = createTask({
			deadline: Interval.fromDateTimes(start, end)
		});

		const expected: RenderedTask[] = [
			{
				id: task.id,
				title: task.title,
				interval: Interval.fromDateTimes(start, next),
				dayIndex: start.weekday,
				startOffset: 1320,
				duration: 120,
				columnIndex: 0,
				columnCount: 1,
				priority: task.priority
			},
			{
				id: task.id,
				title: task.title,
				interval: Interval.fromDateTimes(next, next.plus({ hours: 2 })),
				dayIndex: next.weekday,
				startOffset: 0,
				duration: 120,
				columnIndex: 0,
				columnCount: 1,
				priority: task.priority
			}
		];

		const rendered = expandTasks([task], weekRange);

		expect(rendered).toEqual(expected);
	});
});

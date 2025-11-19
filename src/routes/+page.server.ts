import { Interval, DateTime } from 'luxon';
import type { PageServerLoad } from './$types';
import type { Task } from '$lib/features/calendar/models/task';
import { createTask } from '$lib/features/calendar/models/task';

export const load: PageServerLoad = async () => {
	const now = DateTime.now().startOf('hour');

	const a = createTask({
		deadline: Interval.fromDateTimes(now, now.plus({ hours: 7 }))
	});

	const fake: Task[] = [
		a,
		createTask({
			deadline: Interval.fromDateTimes(now.plus({ hours: 1 }), now.plus({ hours: 2 }))
		}),

		createTask({
			deadline: Interval.fromDateTimes(now.plus({ hours: 1 }), now.plus({ hours: 3 }))
		})
	];

	return {
		tasks: fake
	};
};

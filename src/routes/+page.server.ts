import type { Task } from '$lib/shared/models/task-model';
import { Interval, DateTime } from 'luxon';
import type { PageServerLoad } from './$types';
import { createTask } from '$lib/shared/utils/task';

export const load: PageServerLoad = async () => {
	const now = DateTime.now().startOf('hour');
	const fake: Task[] = [
		createTask({
			title: 'Test',
			deadline: Interval.fromDateTimes(now, now.plus({ hours: 1 }))
		}),
		createTask({
			title: 'Wtf',
			deadline: Interval.fromDateTimes(
				now.plus({ days: 1, hours: 1 }),
				now.plus({ days: 4, hours: 2 })
			)
		})
	];

	return {
		tasks: fake
	};
};

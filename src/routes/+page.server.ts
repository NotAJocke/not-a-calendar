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
		})
	];

	return {
		tasks: fake
	};
};

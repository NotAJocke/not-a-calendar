import { Interval, DateTime } from 'luxon';
import type { PageServerLoad } from './$types';
import type { Task } from '$lib/models/task';
import { createTask } from '$lib/utils/task';

export const load: PageServerLoad = async () => {
	const now = DateTime.now().startOf('hour');

	const a = createTask({
		deadline: Interval.fromDateTimes(now, now.plus({ hours: 8 }))
	});

	const fake: Task[] = [a];

	return {
		tasks: fake
	};
};

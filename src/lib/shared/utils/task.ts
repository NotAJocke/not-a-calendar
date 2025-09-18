import { DateTime, Interval } from 'luxon';
import type { Task } from '../models/task-model';

export function createTask(
	data: {
		title: string;
		deadline: Interval;
	} & Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'deadline'>>
): Task {
	const now = DateTime.now();

	return {
		id: crypto.randomUUID(),
		title: data.title,
		body: data.body ?? '',
		createdAt: now.toISO(),
		updatedAt: now.toISO(),
		allDay: data.allDay ?? false,
		isCompleted: data.isCompleted ?? false,
		deadline: {
			start: data.deadline.start!.toISO(),
			end: data.deadline.end!.toISO()
		},
		doDates: data.doDates ?? [],
		estimatedTime: data.estimatedTime ?? 30,
		priority: data.priority ?? 'none',
		effortLevel: data.effortLevel ?? 'low',
		dependencies: data.dependencies ?? [],
		isPinned: data.isPinned ?? false
	};
}

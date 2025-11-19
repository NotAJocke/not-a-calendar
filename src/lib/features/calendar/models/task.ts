import { DateTime, Duration, Interval } from 'luxon';

export type Task = {
	id: string;
	title: string;
	body?: string;

	completed: boolean;
	completedAt: DateTime | null;

	priority: 'none' | 'low' | 'medium' | 'high';
	effortLevel: 'low' | 'medium' | 'high';

	dependencies?: string[];

	createdAt: DateTime;
	updatedAt: DateTime;

	deadline?: Interval;
	isPinned?: boolean;

	doDates?: Interval[];

	tags?: string[];

	estimatedDuration?: Duration;
	actualDuration?: Duration;
	recurrenceRule?: String;

	externalId?: String;
	parentId?: String;
};

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

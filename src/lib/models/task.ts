import type { DateTime, Duration, Interval } from 'luxon';

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

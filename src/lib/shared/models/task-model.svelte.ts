import { DateTime, Interval, Duration } from 'luxon';

export enum TaskPriority {
	None = 'none',
	Low = 'low',
	Medium = 'medium',
	High = 'high'
}

export enum EffortLevel {
	Low = 'low',
	Medium = 'medium',
	High = 'high'
}

export class Task {
	// Basic data
	readonly id: string = crypto.randomUUID();
	title: string;
	body?: string;
	createdAt: DateTime = DateTime.now();
	updatedAt: DateTime = DateTime.now();

	// Event data
	allDay = false;
	isCompleted = false;
	deadline: Interval;
	doDates?: Interval[];

	// Smart scheduling data
	estimatedTime: Duration = Duration.fromObject({ minutes: 30 });
	priority: TaskPriority = TaskPriority.None;
	effortLevel: EffortLevel = EffortLevel.Low;
	dependencies?: string[];
	isPinned = false;

	constructor(t: {
		title: string;
		deadline: Interval;
		body?: string;
		allDay?: boolean;
		isCompleted?: boolean;
		doDates?: Interval[];
		estimatedTime?: Duration;
		priority?: TaskPriority;
		effortLevel?: EffortLevel;
		dependencies?: string[];
		isPinned?: boolean;
		id?: string;
		createdAt?: DateTime;
		updatedAt?: DateTime;
	}) {
		this.title = t.title;
		this.deadline = t.deadline;
		this.body = t.body;
		if (t.allDay !== undefined) this.allDay = t.allDay;
		if (t.isCompleted !== undefined) this.isCompleted = t.isCompleted;
		this.doDates = t.doDates;
		if (t.estimatedTime !== undefined) this.estimatedTime = t.estimatedTime;
		if (t.priority !== undefined) this.priority = t.priority;
		if (t.effortLevel !== undefined) this.effortLevel = t.effortLevel;
		this.dependencies = t.dependencies;
		if (t.isPinned !== undefined) this.isPinned = t.isPinned;
		if (t.id) this.id = t.id;
		if (t.createdAt) this.createdAt = t.createdAt;
		if (t.updatedAt) this.updatedAt = t.updatedAt;
	}
}

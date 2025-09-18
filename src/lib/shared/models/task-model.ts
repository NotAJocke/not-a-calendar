export type Task = {
	// Basic data
	id: string;
	title: string;
	body?: string;
	createdAt: string; // ISO string
	updatedAt: string; // ISO string

	// Event data
	allDay: boolean;
	isCompleted: boolean;
	deadline: {
		start: string; // ISO string
		end: string; // ISO string
	};
	doDates?: { start: string; end: string }[];

	// Smart scheduling data
	estimatedTime: number; // minutes
	priority: 'none' | 'low' | 'medium' | 'high';
	effortLevel: 'low' | 'medium' | 'high';
	dependencies?: string[];
	isPinned: boolean;
};

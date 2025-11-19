import type { DateTime, Interval } from 'luxon';

export type RenderedTask = {
	id: string;
	title: string;

	// The real data
	interval: Interval;

	dayIndex: number;

	// Used for vertical placement
	startOffset: number;
	duration: number;

	// overlapping
	columnIndex: number;
	columnCount: number;

	// styling helpers
	priority: 'none' | 'low' | 'medium' | 'high';
	isPinned?: boolean;
	tags?: string[];
};

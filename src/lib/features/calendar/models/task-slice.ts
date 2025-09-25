export type TaskSlice = {
	taskId: string;
	day: number;
	start: number;
	end: number;
	title: string;
	isAllDay: boolean;
	role: 'start' | 'middle' | 'end' | 'single';
};

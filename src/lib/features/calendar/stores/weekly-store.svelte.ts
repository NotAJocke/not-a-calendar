import type { Task } from '$lib/shared/models/task-model';
import { DateTime, Interval } from 'luxon';

export class WeeklyStore {
	daysDisplayed = $state(5);
	currentWeekStart: DateTime;
	tasks: Task[] = $state([]);

	constructor(startDate: DateTime = DateTime.now()) {
		this.currentWeekStart = $state(startDate.startOf('week'));
	}

	changeDisplay(num: number) {
		this.daysDisplayed = num;
	}

	next() {
		let newDate = this.currentWeekStart.plus({ days: this.daysDisplayed });
		this.currentWeekStart = newDate;
	}

	resetOffset() {
		this.currentWeekStart = DateTime.now().startOf('week');
	}

	back() {
		let newDate = this.currentWeekStart.minus({ days: this.daysDisplayed });
		this.currentWeekStart = newDate;
	}

	isToday(date: DateTime): boolean {
		return DateTime.now().hasSame(date, 'day');
	}

	get tasksInView(): Task[] {
		const viewStart = this.currentWeekStart.startOf('day');
		const viewEnd = viewStart.plus({ days: this.daysDisplayed }).endOf('day');
		const viewInterval = Interval.fromDateTimes(viewStart, viewEnd);

		return this.tasks.filter((task) => {
			const taskInterval = Interval.fromDateTimes(
				DateTime.fromISO(task.deadline.start),
				DateTime.fromISO(task.deadline.end)
			);
			return taskInterval.overlaps(viewInterval);
		});
	}
}

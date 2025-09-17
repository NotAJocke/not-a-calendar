import { DateTime } from 'luxon';

export class WeeklyStore {
	daysDisplayed = $state(5);
	currentWeekStart: DateTime;

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
}

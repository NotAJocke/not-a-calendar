import { DateTime, Interval } from 'luxon';

let today = DateTime.now();

console.log(today.localWeekday);
console.log(today.setLocale('fr-BE').localWeekday);

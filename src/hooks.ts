import type { Transport } from '@sveltejs/kit';
import { DateTime, Duration, Interval } from 'luxon';

export const transport: Transport = {
	DateTime: {
		encode: (dt: DateTime) => dt instanceof DateTime && dt.toISO(),
		decode: (dt: string) => DateTime.fromISO(dt)
	},
	Interval: {
		encode: (int: Interval) => int instanceof Interval && int.toISO(),
		decode: (int: string) => Interval.fromISO(int)
	},
	Duration: {
		encode: (dur: Duration) => dur instanceof Duration && dur.toISO(),
		decode: (dur: string) => Duration.fromISO(dur)
	}
};

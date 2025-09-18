<script lang="ts">
	import WeeklyView from '$lib/features/calendar/ui/weekly/weekly-view.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<WeeklyView tasks={data.tasks} />

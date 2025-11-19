<script lang="ts">
	import WeeklyCal from '$lib/features/calendar/ui/weekly/WeeklyCal.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<WeeklyCal tasks={data.tasks} />

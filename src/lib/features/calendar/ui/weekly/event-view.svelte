<script lang="ts">
	import { getContext } from 'svelte';
	import type { WeeklyStore } from '../../stores/weekly-store.svelte';

	let store: WeeklyStore = getContext('weekly-store');

	let { day, start, end, title } = $props();
	let length = (end - start) * 61;
</script>

<div
	class="absolute bg-red-300 rounded-xl text-white p-2"
	style="
        width: calc(100% / {store.daysDisplayed} - 4px);
        left: calc(100% / {store.daysDisplayed} * {day} + 2px);
        top: calc(61px * {start});
        height: calc({length}px);
    "
>
	{title}
</div>

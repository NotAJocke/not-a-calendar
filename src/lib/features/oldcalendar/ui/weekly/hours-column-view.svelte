<div class="flex flex-col h-full w-fit mt-[30px]">
	{#each { length: 23 }, hour}
		<div class="h-[61px] flex items-center justify-end">
			<div class="flex flex-row items-center gap-2">
				<span>{hour + 1}:00</span>
				<div class="h-[1px] w-3 bg-gray-300"></div>
			</div>
		</div>
	{/each}
</div>

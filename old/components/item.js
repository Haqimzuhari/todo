const itemComponent = {
	props: ['group', 'item'],
	template: `
		<div class="space-y-2">
			<div class="space-y-1">
				<p class="text-base font-semibold">{{ item.name }}</p>
				<div class="flex items-center justify-between">
					<p class="text-sm font-light text-neutral-500">{{ $root.formatDate(item.created_at) }}</p>
					<div class="flex items-center space-x-2">
						<div>
							<slot name="task-modal"></slot>
						</div>
						<button v-on:click="$root.deleteItem(item.id, group.id)" type="button" class="appearance-none outline-none bg-indigo-600 px-3 py-1 rounded-semimedium font-semibold text-sm">Delete Item</button>
					</div>
				</div>
			</div>
			<slot></slot>
		</div>
	`
}
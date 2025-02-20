const taskListComponent = {
	components: {
		'task-action': taskActionComponent,
	},
	props: ['task'],
	template: `
		<div class="p-4 space-y-5 bg-neutral-750 rounded-lg">
			<div>
				<div class="flex items-center justify-between">
					<div class="bg-green-800 rounded-full px-1 text-sm">{{ task.status }}</div>
					<task-action :task-id="task.id"></task-action>
				</div>
				<div>
					<p class="font-medium" :class="{'line-through': task.status === 'done'}">{{ task.name }}</p>
				</div>
			</div>
			<slot></slot>
		</div>
	`
}
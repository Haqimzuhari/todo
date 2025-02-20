const commentComponent = {
	props: ['comment'],
	template: `
		<div class="flex flex-col items-start">
			<div class="flex items-center space-x-2">
				<p class="text-xs font-extralight text-neutral-500">{{ $root.formatDate(comment.created_at) }}</p>
				<button v-on:click="$root.deleteComment(comment.id)" type="button" class="bg-neutral-800 rounded-md">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
						<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
					</svg>                                              
				</button>
			</div>
			<p class="text-sm font-light">{{ comment.text }}</p>
		</div>
	`
}
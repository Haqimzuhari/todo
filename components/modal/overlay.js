const modalOverlayComponent = {
	props: ['modalId', 'title'],
    template: `
        <transition
			enter-active-class="transition-opacity duration-150 ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity duration-150 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0">
			<div 
				class="fixed inset-0 z-10 p-10 bg-black/50"
				v-if="$root.modals[modalId]"
				v-on:click.self="$root.closeModal(modalId)"
				v-cloak>
				<div 
					class="w-full mx-auto md:max-w-md bg-neutral-800 p-10 rounded-xl space-y-10">
					<div class="flex items-center justify-between">
						<p class="text-base md:text-xl font-semibold">{{ title }}</p>
						<button v-on:click="$root.closeModal(modalId)" type="button">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
								<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
							</svg>
						</button>
					</div>
					<slot></slot>
				</div>
			</div>
		</transition>
    `
}
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
						<button v-on:click="$root.closeModal(modalId)" type="button">close</button>
					</div>
					<slot></slot>
				</div>
			</div>
		</transition>
    `
}
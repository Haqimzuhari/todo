const modalTriggerComponent = {
    props: ['modalId', 'styleKey'],
	computed: {
		stylesGroup() {
			const styles = {
				style1: "appearance-none outline-none bg-indigo-600 px-3 py-1 rounded-semimedium font-semibold text-sm",
				style2: "appearance-none outline-none bg-neutral-800 px-1 py-1 rounded-md",
			}
			return styles[this.styleKey] || styles.style1
		}
	},
    template: `
        <button 
			type="button" 
			v-bind:class="stylesGroup" 
			v-on:click="$root.openModal(modalId)">
			<slot></slot>
		</button>
    `
}
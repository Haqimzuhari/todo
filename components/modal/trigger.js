const modalTriggerComponent = {
    props: ['modalId'],
    template: `
        <button 
			type="button" 
			class="appearance-none outline-none" 
			v-on:click="$root.openModal(modalId)">
			<slot></slot>
		</button>
    `
}
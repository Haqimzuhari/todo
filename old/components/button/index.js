const buttonIndexComponent = {
    props: {
        type: String,
    },
    template: `
        <button 
            v-bind:type="type || 'submit'" 
            class="appearance-none outline-none bg-indigo-600 px-3 py-1 rounded-semimedium font-semibold">
            <slot></slot>
        </button>
    `
}
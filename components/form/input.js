const formInputComponent = {
    props: {
        modelValue: String,
        type: String,
        placeholder: String,
    },
    emits: [
        'update:modelValue'
    ],
    template: `
        <div>
            <input 
                v-bind:value="modelValue"
                v-on:input="$emit('update:modelValue', $event.target.value)"
                v-bind:type="type || 'text'" 
                v-bind:placeholder="placeholder" 
                class="appearance-none outline-none px-3 py-1 rounded-semimedium text-neutral-900 w-full"/>
        </div>
    `
}
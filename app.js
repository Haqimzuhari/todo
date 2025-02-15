const app = Vue.createApp({
    data() {
        return {
            newItem: "",
            items: []
        };
    },
    methods: {
        async loadData() {
            this.items = await fetchData();
        },
        async addItem() {
            if (!this.newItem) return;
            await addData(this.newItem);
            this.newItem = "";
            this.loadData();
        },
        async deleteItem(id) {
            await deleteData(id);
            this.loadData();
        }
    },
    mounted() {
        this.loadData();
    }
});

app.mount("#app");
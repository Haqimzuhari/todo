const app = Vue.createApp({
	data() {
		return {
			groups: [],
			items: [],
			tasks: [],
			comments: [],
			newGroupName: "",
			newItemName: {},
			newTaskName: {},
			newCommentText: {},
		};
	},
	async mounted() {
		this.groups = await Group.getAll();
		this.items = await Item.getAll();
		this.tasks = await Task.getAll();
		this.comments = await Comment.getAll();
	},
	methods: {
		async addGroup() {
			if (!this.newGroupName) return;
			let group = new Group(this.newGroupName);
			await group.save();
			this.groups = await Group.getAll();
			this.newGroupName = "";
		},
		async addItem(groupId) {
			if (!this.newItemName[groupId]) return;
			let item = new Item(this.newItemName[groupId], groupId);
			await item.save();
			this.items = await Item.getAll();
			this.newItemName[groupId] = "";
		},
		async addTask(itemId) {
			if (!this.newTaskName[itemId]) return;
			let task = new Task(this.newTaskName[itemId], itemId);
			await task.save();
			this.tasks = await Task.getAll();
			this.newTaskName[itemId] = "";
		},
		async addComment(taskId) {
			if (!this.newCommentText[taskId]) return;
			let comment = new Comment(this.newCommentText[taskId], taskId);
			await comment.save();
			this.comments = await Comment.getAll();
			this.newCommentText[taskId] = "";
		},
		async deleteGroup(id) {
			await Group.delete(id);
			this.groups = await Group.getAll();
			this.items = await Item.getAll();
		},
		async deleteItem(id, groupId) {
			await Item.delete(id);
			this.items = await Item.getByGroup(groupId);
			if (this.items.length === 0) {
				this.deleteGroup(groupId)
			}
		},
		async deleteTask(id) {
			await Task.delete(id);
			this.tasks = await Task.getAll();
		},
		async deleteComment(id) {
			await Comment.delete(id);
			this.comments = await Comment.getAll();
		},
		formatDate(dateString) {
			return dayjs(dateString).format('YYYY-MM-DD HH:mm A'); // Format as 'YYYY-MM-DD HH:mm AM/PM'
		},
	},
}).mount("#app")

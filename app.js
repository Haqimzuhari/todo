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
			modals: {},
		}
	},
	components: {
		'top-nav': topNav,
		'modal-trigger': modalTriggerComponent,
		'modal-overlay': modalOverlayComponent,
		'task-action': taskActionComponent,
		'comment': commentComponent,
	},
	async mounted() {
		this.groups = await Group.getAll()
		this.items = await Item.getAll()
		this.tasks = await Task.getAll()
		this.comments = await Comment.getAll()
	},
	methods: {
		async addGroup() {
			if (!this.newGroupName) return
			let group = new Group(this.newGroupName)
			await group.save()
			this.groups = await Group.getAll()
			this.newGroupName = ""
			this.closeModal('create-group')
		},
		async addItem(groupId) {
			if (!this.newItemName[groupId]) return
			let item = new Item(this.newItemName[groupId], groupId)
			await item.save()
			this.items = await Item.getAll()
			this.newItemName[groupId] = ""
			this.closeModal('add-item-'+groupId)
		},
		async addTask(itemId) {
			if (!this.newTaskName[itemId]) return
			let task = new Task(this.newTaskName[itemId], itemId)
			await task.save()
			this.tasks = await Task.getAll()
			this.newTaskName[itemId] = ""
			this.closeModal('add-task-'+itemId)
		},
		async addComment(taskId) {
			if (!this.newCommentText[taskId]) return
			let comment = new Comment(this.newCommentText[taskId], taskId)
			await comment.save()
			this.comments = await Comment.getAll()
			this.newCommentText[taskId] = ""
		},
		async deleteGroup(id) {
			await Group.delete(id)
			this.groups = await Group.getAll()
			this.items = await Item.getAll()
		},
		async deleteItem(id, groupId) {
			await Item.delete(id)
			this.items = await Item.getByGroup(groupId)
			if (this.items.length === 0) {
				this.deleteGroup(groupId)
			}
		},
		async deleteTask(id) {
			await Task.delete(id)
			this.tasks = await Task.getAll()
		},
		async deleteComment(id) {
			await Comment.delete(id)
			this.comments = await Comment.getAll()
		},
		formatDate(dateString) {
			return dayjs(dateString).format('YYYY-MM-DD HH:mm A')
		},
		openModal(id) {
			this.modals[id] = true
		},
		closeModal(id) {
			this.modals[id] = false
		},
	},
})

app.mount("#app")

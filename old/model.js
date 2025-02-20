class Group {
	constructor(name) {
		this.name = name;
	}

	async save() {
		let db = new Database();
		return await db.add("groups", this);
	}

	static async getAll() {
		let db = new Database();
		return await db.getAll("groups");
	}

	static async delete(id) {
		let db = new Database();
		let items = await db.getByIndex("items", "groupId", id);

		// Delete all items under this group
		for (let item of items) {
			await Item.delete(item.id);
		}

		// Delete the group
		await db.delete("groups", id);
	}
  }

class Item {
	constructor(name, groupId) {
		this.name = name;
		this.groupId = groupId;
		this.created_at = new Date().toISOString();
	}

	async save() {
		let db = new Database();
		return await db.add("items", this);
	}

	static async getAll() {
		let db = new Database();
		return await db.getAll("items");
	}

	static async getByGroup(groupId) {
		let db = new Database();
		return await db.getByIndex("items", "groupId", groupId);
	}

	static async delete(id) {
		let db = new Database();
		let tasks = await db.getByIndex("tasks", "itemId", id);

		// Delete all tasks under this item
		for (let task of tasks) {
			await Task.delete(task.id);
		}

		// Delete the item
		await db.delete("items", id);
	}
}

class Task {
	constructor(name, itemId, status = "todo") {
		this.name = name;
		this.itemId = itemId;
		this.status = status;
		this.created_at = new Date().toISOString();
	}

	async save() {
		let db = new Database();
		return await db.add("tasks", this);
	}

	static async getAll() {
		let db = new Database();
		return await db.getAll("tasks");
	}

	static async getByGroup(itemId) {
		let db = new Database();
		return await db.getByIndex("tasks", "itemId", itemId);
	}

	static async delete(id) {
		let db = new Database();
		let comments = await db.getByIndex("comments", "taskId", id);

		// Delete all comments under this item
		for (let comment of comments) {
			await Comment.delete(comment.id);
		}

		// Delete the item
		await db.delete("tasks", id);
	}
}

class Comment {
	constructor(text, taskId) {
		this.text = text;
		this.taskId = taskId;
		this.created_at = new Date().toISOString();
	}

	async save() {
		let db = new Database();
		return await db.add("comments", this);
	}

	static async getAll() {
		let db = new Database();
		return await db.getAll("comments");
	}

	static async delete(id) {
		let db = new Database();
		await db.delete("comments", id);
	}
}
  
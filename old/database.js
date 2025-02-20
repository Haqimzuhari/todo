class Database {
	constructor() {
		this.dbName = "Todo";
		this.version = 2;
		this.dbPromise = this.initDB();
	}

	async initDB() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, this.version);

			request.onupgradeneeded = (event) => {
				let db = event.target.result;

				if (!db.objectStoreNames.contains("groups")) {
					db.createObjectStore("groups", { keyPath: "id", autoIncrement: true });
				}
				if (!db.objectStoreNames.contains("items")) {
					let itemStore = db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
					itemStore.createIndex("groupId", "groupId", { unique: false });
				}
				if (!db.objectStoreNames.contains("tasks")) {
					let taskStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
					taskStore.createIndex("itemId", "itemId", { unique: false });
				}
				if (!db.objectStoreNames.contains("comments")) {
					let commentStore = db.createObjectStore("comments", { keyPath: "id", autoIncrement: true });
					commentStore.createIndex("taskId", "taskId", { unique: false });
				}
			};

			request.onsuccess = (event) => resolve(event.target.result);
			request.onerror = (event) => reject("Database error: " + event.target.error);
		});
	}

	async transaction(storeName, mode) {
		let db = await this.dbPromise;
		return db.transaction(storeName, mode).objectStore(storeName);
	}

	async add(storeName, data) {
		return new Promise(async (resolve, reject) => {
			let store = await this.transaction(storeName, "readwrite");
			let request = store.add(data);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject("Add error");
		});
	}

	async getAll(storeName) {
		return new Promise(async (resolve, reject) => {
			let store = await this.transaction(storeName, "readonly");
			let request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject("Fetch error");
		});
	}

	async getByIndex(storeName, indexName, value) {
		return new Promise(async (resolve, reject) => {
			let store = await this.transaction(storeName, "readonly");
			let index = store.index(indexName);
			let request = index.getAll(value);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject("Fetch by index error");
		});
	}

	async delete(storeName, id) {
		return new Promise(async (resolve, reject) => {
			let store = await this.transaction(storeName, "readwrite");
			let request = store.delete(id);
			request.onsuccess = () => resolve();
			request.onerror = () => reject("Delete error");
		});
	}
}

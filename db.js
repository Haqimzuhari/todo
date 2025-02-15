const DB_NAME = "todoDatabase";
const STORE_NAME = "items";

const dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
        let db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
});

// Fetch all data
async function fetchData() {
    const db = await dbPromise;
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Add new data
async function addData(item) {
    const db = await dbPromise;
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add({ name: item });

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Update existing data
async function updateData(id, newName) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      let item = request.result;
      if (item) {
        item.name = newName;
        store.put(item);
        resolve();
      } else {
        reject("Item not found");
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// Delete data
async function deleteData(id) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

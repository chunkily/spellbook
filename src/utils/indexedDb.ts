export function openDb(
	dbName?: string,
	version?: number,
): Promise<IDBDatabase> {
	dbName = dbName || "app";

	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, version);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			db.createObjectStore("spellbooks", {
				keyPath: "id",
				autoIncrement: true,
			});
			db.createObjectStore("spells", {
				keyPath: "id",
				autoIncrement: true,
			});
		};
	});
}

export function writeToStore(
	db: IDBDatabase,
	storeName: string,
	data: unknown,
): Promise<number> {
	const transaction = db.transaction(storeName, "readwrite");
	const store = transaction.objectStore(storeName);

	const request = store.add(data);

	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => resolve(request.result as number);
		transaction.onerror = () => reject();
	});
}

export function updateInStore(
	db: IDBDatabase,
	storeName: string,
	data: unknown,
	key: string | number,
): Promise<void> {
	if (typeof key === "string") {
		key = parseInt(key, 10);
	}

	const transaction = db.transaction(storeName, "readwrite");
	const store = transaction.objectStore(storeName);

	const request = store.put(data, key);

	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve();
		request.onerror = () => reject();
	});
}

export function deleteFromStore(
	db: IDBDatabase,
	storeName: string,
	key: string | number,
): Promise<void> {
	if (typeof key === "string") {
		key = parseInt(key, 10);
	}

	const transaction = db.transaction(storeName, "readwrite");
	const store = transaction.objectStore(storeName);

	const request = store.delete(key);

	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve();
		request.onerror = () => reject();
	});
}

export function readAllFromStore<T>(
	db: IDBDatabase,
	storeName: string,
): Promise<T[]> {
	const transaction = db.transaction(storeName, "readonly");
	const store = transaction.objectStore(storeName);
	const request = store.getAll();

	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject();
	});
}

export function readFromStore<T>(
	db: IDBDatabase,
	storeName: string,
	key: string | number | undefined,
): Promise<T | undefined> {
	if (!key) {
		return Promise.resolve(undefined);
	}

	if (typeof key === "string") {
		key = parseInt(key, 10);
	}

	const transaction = db.transaction(storeName, "readonly");
	const store = transaction.objectStore(storeName);
	const request = store.get(key);

	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject();
	});
}

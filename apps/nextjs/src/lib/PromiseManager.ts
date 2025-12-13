export default class PromiseManager {
    // A Map to store the promises along with their resolve/reject functions.
    // The key will be a unique identifier for the promise.
    private promises = new Map<
        string,
        {
            resolve: (value: unknown) => void;
            reject: (reason?: any) => void;
            promise: Promise<unknown>; // Storing the promise itself can be useful too
        }
    >();

    /**
     * Creates a new promise and stores its resolve/reject functions
     * in the manager.
     *
     * @param id A unique identifier for this promise.
     * @returns The newly created Promise.
     */
    public createManagedPromise<T>(id: string): Promise<T> {
        if (this.promises.has(id)) {
            console.warn(
                `A promise with ID "${id}" already exists. Overwriting it.`
            );
        }

        let resolveFn: (value: T) => void;
        let rejectFn: (reason?: any) => void;

        // Create a new promise and capture its resolve and reject functions
        const promise = new Promise<T>((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
        });

        // Store the resolve, reject, and the promise itself in the map
        this.promises.set(id, {
            // @ts-ignore
            resolve: resolveFn, // Type assertion: we know these will be assigned
            // @ts-ignore
            reject: rejectFn,
            promise: promise as Promise<unknown>, // Store as unknown for flexibility
        });

        console.log(`Promise with ID "${id}" created and stored.`);
        return promise;
    }

    /**
     * Resolves a promise previously stored with the given ID.
     *
     * @param id The unique identifier of the promise to resolve.
     * @param value The value to resolve the promise with.
     * @returns True if the promise was found and resolved, false otherwise.
     */
    public resolvePromise<T>(id: string, value: T): boolean {
        const promiseEntry = this.promises.get(id);
        if (promiseEntry) {
            console.log(`Resolving promise with ID "${id}"...`);
            promiseEntry.resolve(value);
            this.promises.delete(id); // Clean up the map after resolution
            console.log(`Promise with ID "${id}" resolved and removed.`);
            return true;
        }
        console.warn(`Promise with ID "${id}" not found.`);
        return false;
    }

    /**
     * Rejects a promise previously stored with the given ID.
     *
     * @param id The unique identifier of the promise to reject.
     * @param reason The reason to reject the promise with.
     * @returns True if the promise was found and rejected, false otherwise.
     */
    public rejectPromise(id: string, reason?: any): boolean {
        const promiseEntry = this.promises.get(id);
        if (promiseEntry) {
            console.log(`Rejecting promise with ID "${id}"...`);
            promiseEntry.reject(reason);
            this.promises.delete(id); // Clean up the map after rejection
            console.log(`Promise with ID "${id}" rejected and removed.`);
            return true;
        }
        console.warn(`Promise with ID "${id}" not found.`);
        return false;
    }

    /**
     * Retrieves a promise by its ID without resolving or rejecting it.
     * This can be useful for chaining or checking its status.
     * @param id The unique identifier of the promise.
     * @returns The promise if found, otherwise undefined.
     */
    public getPromise<T>(id: string): Promise<T> | undefined {
        const entry = this.promises.get(id);
        return entry ? (entry.promise as Promise<T>) : undefined;
    }
}

import PromiseManager from "@/lib/PromiseManager";
import {AppMock} from "@/lib/AppMock";

const promiseManager = new PromiseManager();

const AppLib = {
    promptBiometricAuthentication: async () => {
        const id = crypto.randomUUID();
        AppMock.promptBiometricAuthentication(id);
        return promiseManager
            .createManagedPromise<"granted"|"denied"|"error">(id)
            .catch((error) => {
                console.error(error);
                return "error" as const;
            });
    },
    promptBiometricAuthenticationWithCredentials: async () => {
        const id = crypto.randomUUID();
        AppMock.promptBiometricAuthenticationForCredentials(id);
        return promiseManager
            .createManagedPromise<{ email: string, password: string }>(id)
            .catch((err) => {
                console.error(err);
                return null;
            });
    },
}

// @ts-ignore
window.ApplicationLibraryResolver = {
    resolve: (id: string, ...results: unknown[]) => {
        promiseManager.resolvePromise(id, results);
    },
    reject: (id: string, reason: unknown) => {
        promiseManager.rejectPromise(id, reason);
    },
}

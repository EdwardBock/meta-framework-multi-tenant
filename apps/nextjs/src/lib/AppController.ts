import {AppMock} from "@/lib/AppMock";

const promises = new Map<string, Promise<unknown>>();
export default function AppController(){


    return {
        promptBiometricAuthentication: ()=>{

            AppMock.promptBiometricAuthentication("1");
            return Promise.resolve("ok");
        }
    }
}

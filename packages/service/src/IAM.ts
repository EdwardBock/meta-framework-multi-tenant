import delay from "./delay";

const userDB = [
    {
        email: "hi@edwardbock.de",
        password: "test1234",
    }
];

export default function IAMService(){
    return {
        async signIn(credentials: {email: string, password: string}) {
            const {email, password} = credentials;
            const user = userDB.find(user => user.email === email);
            if(!user || user.password !== password){
                return {
                    token: null,
                    message: "Wrong credentials.",
                }
            }
            await delay(1000);
            return {
                token: crypto.randomUUID(),
            };
        }
    }
}

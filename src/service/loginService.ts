import { UserInfo } from "../model/userInfo";

export class LoginService {
    public async login(data: {username: string}): Promise<any> {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...data})
        })
        return await response.json();
    }

    public async register(data: UserInfo): Promise<any> {
        const response = await fetch("/api/register", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...data})
        })
        return await response.json();
    }
}
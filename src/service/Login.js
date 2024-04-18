import { setMe } from "./user";

export async function login(username, password) {
    if (username === "ch" && password === "123") {
        setMe();
        return true;
    }
    return false;
}
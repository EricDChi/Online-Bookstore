import { setMe } from "./user";

export function login() {
    setMe();
    window.location.href = "/";
}
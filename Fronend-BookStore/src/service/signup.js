import { PREFIX, put } from "./common";

export async function signup(username, password) {
    const url = `${PREFIX}/signup`;
    let result;

    try {
        result = await put(url, { username, password });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
}
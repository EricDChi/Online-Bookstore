import { PREFIX, put } from "./common";

export async function signup(username, password, email) {
    const url = `${PREFIX}/signup`;
    let result;

    try {
        result = await put(url, { username, password, email });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
}
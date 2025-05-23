export async function getJson(url) {
    let res = await fetch(url, {method: 'GET', credentials: "include"});
    return res.json();
}

export async function get(url) {
    let res = await fetch(url, {method: 'GET', credentials: "include"});
    let data = await res.text();
    return data;
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();
}

export async function del(url, data) {
    let res = await fetch(url, { method: "DELETE", credentials: "include", body: JSON.stringify(data) });
    return res.json();
}

export async function post(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();
}



export const BASEURL = 'http://localhost:8080';
export const PREFIX = `${BASEURL}/api`; 
export const MICROSERVICE_PREFIX = `${BASEURL}/microservice/api`;
export const FUNC_PREFIX = `${BASEURL}/function`;
export const IMAGE_PREFIX = `${BASEURL}/images`;
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
}
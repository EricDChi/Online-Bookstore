import { DUMMY_RESPONSE, PREFIX, getJson, post } from './common';

export async function getMe() {
    const url = `${PREFIX}/me`;
    let me = null;
    try {
        me = await getJson(url);
    } catch(e) {
        console.log(e);
    }
    if (me.id === null) {
        return null;
    }
    return me;
}

export async function getAllUsers() {
    const url = `${PREFIX}/users`;
    let users = null;
    try {
        users = await getJson(url);
    } catch(e) {
        console.log(e);
    }
    return users;
}

export async function setInfo(values) {
    const url = `${PREFIX}/user`;
    let response;
    try {
        response = await post(url, values);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}

export async function forbidUser(id, forbidden) {
    let url = `${PREFIX}/user/${id}`;
    if (forbidden) {
        url = `${PREFIX}/user/ban/${id}`;
    }
    else {
        url = `${PREFIX}/user/unban/${id}`;
    }
    let response;
    try {
        response = await post(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}
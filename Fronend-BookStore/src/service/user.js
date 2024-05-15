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

export function setInfo(name, signature, sex, birthday, addressee, phone, address) {
    const me = JSON.parse(localStorage.getItem("me"));
    const new_me = {
        nickname: name,
        signature: signature,
        sex: sex,
        birthday: birthday,
        balance: me.balance,
        avatar: me.avatar,
        addressee: addressee,
        phone: phone,
        address: address
    };
    localStorage.setItem("me", JSON.stringify(new_me));
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
import { PREFIX, getJson } from './common';

export async function getMe() {
    const url = `${PREFIX}/me`;
    let me = null;
    try {
        me = await getJson(url);
        console.log(me);
    } catch(e) {
        console.log(e);
    }
    if (me.id === null) {
        return null;
    }
    return me;
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

import dayjs from 'dayjs';

export function getMe() {
    if (localStorage.hasOwnProperty("me") === false) {
        return null;
    }
    const me = JSON.parse(localStorage.getItem("me"));
    return me;
}

export function setMe() {
    const me = {
        nickname: "admin",
        signature: "这人是个懒狗，什么都没有写",
        sex: "male",
        birthday: dayjs('2015-01-01'),
        balance: 200,
        avatar: "../../143873758.jpg",
        addressee: "name",
        phone: "11122223333",
        address: "上海市闵行区 东川路800号 上海交通大学"
    };
    localStorage.setItem("me", JSON.stringify(me));
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

export function logout() {
    localStorage.removeItem("me");
    window.location.href = "/login";
}
import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function placeOrder(orderInfo) {
    const url = `${PREFIX}/order`;
    let res;
    try {
        res = post(url, orderInfo);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function getOrders() {
    return [
        {
            id: 1,
            address: "北京市海淀区",
            addressee: "张三",
            phone: "123456789",
            create_time: 1627862400000,
            items: [
                {
                    book: {
                        id: 1,
                        title: "计算机网络",
                        cover: "https://img3.doubanio.com/view/subject/s/public/s27283852.jpg"
                    },
                    number: 1
                }
            ]
        }];
    const url = `${PREFIX}/order`;
    let orders;
    try {
        orders = await getJson(url);
    } catch (e) {
        console.log(e);
        orders = []
    }
    return orders;
}
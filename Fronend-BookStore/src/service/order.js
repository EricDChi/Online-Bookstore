import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function placeOrder(orderInfo) {
    const url = `${PREFIX}/order`;
    console.log(orderInfo);
    let res;
    try {
        res = post(url, orderInfo);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function searchOrders(keyword, pageIndex, pageSize) {
    let url;
    let orders;
    url = `${PREFIX}/order?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;

    try {
        orders = await getJson(url);
    } catch (e) {
        console.log(e);
        orders = {
            total: 0,
            items: []
        };
    }
    return orders;
}
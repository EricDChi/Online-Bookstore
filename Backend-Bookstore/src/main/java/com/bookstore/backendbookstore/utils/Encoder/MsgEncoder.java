package com.bookstore.backendbookstore.utils.Encoder;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;

public class MsgEncoder implements Encoder.Text<Msg> {
    @Override
    public String encode(Msg msg) throws EncodeException {
        return JSONObject.toJSONString(msg);
    }
}

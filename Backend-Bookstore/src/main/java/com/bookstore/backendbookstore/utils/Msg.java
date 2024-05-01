package com.bookstore.backendbookstore.utils;

import com.alibaba.fastjson.JSONObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Msg {
    private boolean ok;
    private String message;
    private JSONObject data;

    public Msg(boolean ok, String message, JSONObject data) {
        this.ok = ok;
        this.message = message;
        this.data = data;
    }
}

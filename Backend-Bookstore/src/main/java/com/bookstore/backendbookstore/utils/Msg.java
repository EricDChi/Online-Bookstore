package com.bookstore.backendbookstore.utils;

import com.alibaba.fastjson2.JSONObject;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class Msg implements Serializable {
    private boolean ok;
    private String message;
    private JSONObject data;

    public Msg(boolean ok, String message, JSONObject data) {
        this.ok = ok;
        this.message = message;
        this.data = data;
    }

    @Override
    public String toString() {
        return "Msg{" +
                "ok=" + ok +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}

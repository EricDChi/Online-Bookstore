package com.bookstore.backendbookstore.controller;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class UploadController {

    @PostMapping("/api/upload")
    public Msg update(@RequestParam(value = "picture") MultipartFile file) {
        JSONObject jsonObject = new JSONObject();
        String fileName = file.getOriginalFilename();
        DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar calendar = Calendar.getInstance();
        fileName = df.format(calendar.getTime()) + fileName;
        try {
            file.transferTo( new File(new File("src/main/resources/static/images").getAbsolutePath()+ "/" + fileName));
        } catch (java.io.IOException e) {
            e.printStackTrace();
            return new Msg(false, "上传失败", null);
        }
        jsonObject.put("name", fileName);
        return new Msg(true, "上传成功", jsonObject);
    }
}

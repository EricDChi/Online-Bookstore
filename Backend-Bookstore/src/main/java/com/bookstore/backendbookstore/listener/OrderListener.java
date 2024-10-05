package com.bookstore.backendbookstore.listener;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.service.OrderService;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class OrderListener {

    @Autowired
    private OrderService orderService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @KafkaListener(topics = "order", groupId = "group_topic_order")
    public void addOrder(ConsumerRecord<String, String> record) {
        System.out.println("Order received");
        JSONObject jsonObject = JSONObject.parseObject(record.value());
        orderService.addOrder(jsonObject.getLong("userId"), jsonObject);
        System.out.println("Order added successfully");
    }
}

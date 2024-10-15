package com.bookstore.backendbookstore.utils.listener;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.service.OrderService;
import com.bookstore.backendbookstore.utils.Msg;
import com.bookstore.backendbookstore.utils.websocket.WebSocketServer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrderListener {

    @Autowired
    private OrderService orderService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private WebSocketServer webSocketServer;

    @KafkaListener(topics = "order", groupId = "group_topic_order")
    public void addOrder(ConsumerRecord<String, String> record) {
        System.out.println("Order received");
        JSONObject jsonObject = JSONObject.parseObject(record.value());
        Long userId = jsonObject.getLong("userId");
        orderService.addOrder(userId, jsonObject);
        System.out.println("下单成功");
        kafkaTemplate.send("orderFinished", String.valueOf(userId), "下单成功");
    }

    @KafkaListener(topics = "orderFinished", groupId = "group_topic_orderFinished")
    public void orderFinished(ConsumerRecord<String, String> record) {
        System.out.println("Order finished");
        Msg msg = new Msg(true, record.value(), null);
        webSocketServer.sendMsgToUser(record.key(), msg);
        System.out.println("Order finished, send message to user " + record.key());
    }
}

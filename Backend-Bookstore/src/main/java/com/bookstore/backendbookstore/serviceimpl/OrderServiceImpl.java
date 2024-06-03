package com.bookstore.backendbookstore.serviceimpl;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.dao.*;
import com.bookstore.backendbookstore.service.OrderService;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.entity.OrderItem;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.Comparator;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderItemDao orderItemDao;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private BookDao bookDao;

    @Autowired
    private CartItemDao cartItemDao;

    public List<Order> getOrders(Long userId) {
        List<Order> orders;
        orders = orderDao.findByUserId(userId);
        orders.sort(Comparator.comparing(Order::getCreateTime).reversed());
        return orders;
    }

    public Msg addOrder(Long userId, JSONObject orderRequest) {
        LocalDateTime createTime = LocalDateTime.now();
        Order order = new Order(userId, orderRequest, createTime);
        orderDao.insertOrder(order);

        Long orderId = order.getId();
        JSONArray items = orderRequest.getJSONArray("items");
        for (int i = 0; i < items.size(); i++) {
            JSONObject item = items.getJSONObject(i);
            Long bookId = item.getLong("bookId");
            Long number = item.getLong("number");
            String title = item.getString("title");
            String cover = item.getString("cover");
            addOrderItems(userId, orderId, bookId, number, title, cover);
        }
        return new Msg(true, "下单成功", null);
    }

    public void addOrderItems(Long userId, Long orderId, Long bookId, Long number, String title, String cover) {
        OrderItem orderItem = new OrderItem(userId, orderId, number, title, cover);
        cartItemDao.deleteByBookIdAndUserId(bookId, userId);
        orderItemDao.insertOrderItem(orderItem);
        bookDao.updateSalesAndStockById(bookId, number);
    }
}

package com.bookstore.backendbookstore.serviceimpl;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.dao.*;
import com.bookstore.backendbookstore.service.OrderService;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.entity.OrderItem;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderItemDao orderItemDao;

    private final OrderDao orderDao;

    private final BookDao bookDao;

    private final CartItemDao cartItemDao;

    @Autowired
    public OrderServiceImpl(OrderItemDao orderItemDao, OrderDao orderDao, BookDao bookDao, CartItemDao cartItemDao) {
        this.orderItemDao = orderItemDao;
        this.orderDao = orderDao;
        this.bookDao = bookDao;
        this.cartItemDao = cartItemDao;
    }

    @Override
    public List<Order> getOrders(Long userId) {
        List<Order> orders;
        orders = orderDao.findByUserId(userId);
        orders.sort(Comparator.comparing(Order::getCreateTime).reversed());
        return orders;
    }

    @Override
    public JSONObject getPagedOrders(String keyword,  Integer pageIndex, Integer pageSize, LocalDateTime startDate, LocalDateTime endDate) {
        List<OrderItem> orderItems = orderItemDao.findByTitle(keyword);
        List<Order> orders = new ArrayList<>();
        List<Order> items = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            Order order = orderDao.findById(orderItem.getOrderId());
            if (!orders.contains(order)) {
                orders.add(order);
            }
        }
        for (Order order : orders) {
            if (order.getCreateTime().isAfter(startDate) && order.getCreateTime().isBefore(endDate)) {
                items.add(order);
            }
        }
        items.sort(Comparator.comparing(Order::getCreateTime).reversed());
        long max = Math.min((1 + pageIndex) * pageSize, items.size());
        int total = items.size() / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items.subList(pageIndex * pageSize, (int) max));
        return jsonObject;
    }

    @Override
    public JSONObject getPagedOrdersByUserId(Long userId, String keyword, Integer pageIndex, Integer pageSize, LocalDateTime startDate, LocalDateTime endDate) {
        List<Order> items = orderDao.getPagedOrdersByUserId(userId, pageIndex, pageSize);
        int total = (orderDao.countByUserId(userId) - 1) / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items);
        return jsonObject;
    }

    @Override
    @Transactional
    public Msg addOrder(Long userId, JSONObject orderRequest) {
        LocalDateTime createTime = LocalDateTime.now();
        Order order = new Order(userId, orderRequest, createTime);
        orderDao.save(order);  // 先保存Order，确保生成ID

        JSONArray items = orderRequest.getJSONArray("items");
        for (int i = 0; i < items.size(); i++) {
            JSONObject item = items.getJSONObject(i);
            Long bookId = item.getLong("bookId");
            Integer number = item.getInteger("number");
            String title = item.getJSONObject("book").getString("title");
            String cover = item.getJSONObject("book").getString("cover");

            OrderItem orderItem = new OrderItem(order.getId(), number, title, cover);
            cartItemDao.deleteByBookIdAndUserId(bookId, userId);
            bookDao.updateSalesAndStockById(bookId, number);
            orderItemDao.save(orderItem);  // 显式保存OrderItem
        }

        return new Msg(true, "下单成功", null);
    }

}

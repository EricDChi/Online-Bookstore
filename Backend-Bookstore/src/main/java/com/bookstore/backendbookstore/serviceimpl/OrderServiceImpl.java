package com.bookstore.backendbookstore.serviceimpl;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.dao.*;
import com.bookstore.backendbookstore.service.OrderService;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.entity.OrderItem;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Iterator;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderItemDao orderItemDao;

    private final OrderDao orderDao;

    private final BookDao bookDao;

    private final CartItemDao cartItemDao;

    private final UserDao userDao;

    @Autowired
    public OrderServiceImpl(OrderItemDao orderItemDao, OrderDao orderDao, BookDao bookDao, CartItemDao cartItemDao, UserDao userDao) {
        this.orderItemDao = orderItemDao;
        this.orderDao = orderDao;
        this.bookDao = bookDao;
        this.cartItemDao = cartItemDao;
        this.userDao = userDao;
    }

    @Override
    public List<Order> getOrders(Long userId) {
        List<Order> orders;
        orders = orderDao.findByUserId(userId);
        orders.sort(Comparator.comparing(Order::getCreateTime).reversed());
        return orders;
    }

    @Override
    public JSONObject getPagedOrdersByUserId(Long userId, String keyword, Integer pageIndex, Integer pageSize, LocalDateTime startDate, LocalDateTime endDate) {
        List<Order> orders;
        if (userId != 0) {
            orders = orderDao.findByUserIdAndCreateTimeBetween(userId, startDate, endDate);
        }
        else {
            orders = orderDao.findByCreateTimeBetween(startDate, endDate);
        }
        Iterator<Order> iterator = orders.iterator();
        while (iterator.hasNext()) {
            Order order = iterator.next();
            boolean flag = false;
            for (OrderItem orderItem : order.getItems()) {
                if (orderItem.getTitle().contains(keyword)) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                iterator.remove();
            }
        }
        orders.sort(Comparator.comparing(Order::getCreateTime).reversed());
        long max = Math.min((1 + pageIndex) * pageSize, orders.size());
        int total = (orders.size() - 1) / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", orders.subList(pageIndex * pageSize, (int) max));
        return jsonObject;
    }

    @Override
    public JSONObject rankUsers(LocalDateTime start, LocalDateTime end) {
        List<Order> orders = orderDao.findByCreateTimeBetween(start, end);
        System.out.println(start);
        System.out.println(end);
        List<JSONObject> users = new ArrayList<>();
        for (Order order : orders) {
            JSONObject user = new JSONObject();
            boolean flag = false;
            Long price = 0L;
            user.put("userId", order.getUserId());
            for (OrderItem orderItem : order.getItems()) {
                price += orderItem.getPrice();
            }
            for (JSONObject u : users) {
                if (Objects.equals(u.getLong("userId"), order.getUserId())) {
                    flag = true;
                    u.put("price", u.getLong("price") + price);
                    break;
                }
            }
            if (!flag) {
                user.put("price", price);
                users.add(user);
            }
        }
        for (int i = 0; i < users.size(); i++) {
            for (int j = i + 1; j < users.size(); j++) {
                if (users.get(i).getLong("price") < users.get(j).getLong("price")) {
                    JSONObject temp = users.get(i);
                    users.set(i, users.get(j));
                    users.set(j, temp);
                }
            }
        }
        users = users.subList(0, Math.min(10, users.size()));
        for (JSONObject user : users) {
            user.put("nickname", userDao.findById(user.getLong("userId")).getNickname());
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("number", Math.min(users.size(), 10));
        jsonObject.put("items", users);
        return jsonObject;
    }

    @Override
    public JSONObject rankBooks(LocalDateTime start, LocalDateTime end) {
        List<Order> orders = orderDao.findByCreateTimeBetween(start, end);
        List<JSONObject> items = new ArrayList<>();
        for (Order order : orders) {
            for (OrderItem orderItem : order.getItems()) {
                JSONObject item = new JSONObject();
                boolean flag = false;
                item.put("title", orderItem.getTitle());
                item.put("number", orderItem.getNumber());
                item.put("price", orderItem.getPrice());
                for (JSONObject i : items) {
                    if (i.getString("title").equals(orderItem.getTitle())) {
                        flag = true;
                        i.put("number", i.getInteger("number") + orderItem.getNumber());
                        i.put("price", i.getLong("price") + orderItem.getPrice());
                        break;
                    }
                }
                if (!flag) {
                    items.add(item);
                }
            }
        }
        for (int i = 0; i < items.size(); i++) {
            for (int j = i + 1; j < items.size(); j++) {
                if (items.get(i).getInteger("number") < items.get(j).getInteger("number")) {
                    JSONObject temp = items.get(i);
                    items.set(i, items.get(j));
                    items.set(j, temp);
                }
            }
        }
        items = items.subList(0, Math.min(10, items.size()));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("number", Math.min(items.size(), 10));
        jsonObject.put("items", items);
        return jsonObject;
    }

    @Override
    public JSONObject analyzeOrderByUserId(Long userId, Integer pageIndex, Integer pageSize, LocalDateTime start, LocalDateTime end) {
        List<Order> orders = orderDao.findByUserIdAndCreateTimeBetween(userId, start, end);
        List<JSONObject> items = new ArrayList<>();
        for (Order order : orders) {
            for (OrderItem orderItem : order.getItems()) {
                JSONObject item = new JSONObject();
                boolean flag = false;
                item.put("title", orderItem.getTitle());
                item.put("number", orderItem.getNumber());
                item.put("price", orderItem.getPrice());
                for (JSONObject i : items) {
                    if (i.getString("title").equals(orderItem.getTitle())) {
                        flag = true;
                        i.put("number", i.getInteger("number") + orderItem.getNumber());
                        i.put("price", i.getLong("price") + orderItem.getPrice());
                        break;
                    }
                }
                if (!flag) {
                    items.add(item);
                }
            }
        }
        long max = Math.min((1 + pageIndex) * pageSize, items.size());
        int total = (items.size() - 1) / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items.subList(pageIndex * pageSize, (int) max));
        return jsonObject;
    }

    @Override
    @Transactional
    public Msg addOrder(Long userId, JSONObject orderRequest) {
        LocalDateTime createTime = LocalDateTime.now();
        Order order = new Order(userId, orderRequest, createTime);
        orderDao.save(order);

        JSONArray items = orderRequest.getJSONArray("items");
        for (int i = 0; i < items.size(); i++) {
            JSONObject item = items.getJSONObject(i);
            Long bookId = item.getLong("bookId");
            Integer number = item.getInteger("number");
            String title = item.getJSONObject("book").getString("title");
            String cover = item.getJSONObject("book").getString("cover");
            Long price = item.getJSONObject("book").getLong("price") * number;

            OrderItem orderItem = new OrderItem(order.getId(), number, title, cover, price);
            cartItemDao.deleteByBookIdAndUserId(bookId, userId);
            bookDao.updateSalesAndStockById(bookId, number);
            orderItemDao.save(orderItem);
            System.out.println("OrderItem saved");
        }

        return new Msg(true, "订单处理中", null);
    }

    @Override
    public Boolean judgeOrder(JSONObject orderRequest) {
        JSONArray items = orderRequest.getJSONArray("items");
        for (int i = 0; i < items.size(); i++) {
            JSONObject item = items.getJSONObject(i);
            Long bookId = item.getLong("bookId");
            Integer number = item.getInteger("number");
            if (bookDao.findById(bookId).getStock() < number) {
                return false;
            }
        }
        return true;
    }

}

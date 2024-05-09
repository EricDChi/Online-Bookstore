package com.bookstore.backendbookstore.service;

import com.bookstore.backendbookstore.dao.*;
import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.entity.OrderItem;
import com.bookstore.backendbookstore.utils.BookItem;
import com.bookstore.backendbookstore.utils.Msg;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderItemDAO orderItemDAO;

    @Autowired
    OrderDAO orderDAO;

    @Autowired
    BookDAO bookDAO;

    @Autowired
    CartItemDAO cartItemDAO;

    @Autowired
    UserDAO userDAO;

    @Getter
    @Setter
    public static class OrderRequest {
        private String address;
        private String addressee;
        private String phone;
        private Long price;
        private List<BookItem> items;
    }

    @Getter
    @Setter
    public static class OrderResponse {
        private Long id;
        private LocalDateTime createTime;
        private String address;
        private String addressee;
        private String phone;
        private List<BookItem> items;

        public OrderResponse(Order order, List<BookItem> bookItems) {
            this.id = order.getId();
            this.createTime = order.getCreateTime();
            this.address = order.getAddress();
            this.addressee = order.getAddressee();
            this.phone = order.getPhone();
            this.items = bookItems;
        }
    }

    public List<OrderResponse> getOrders(Long userId) {
        List<OrderResponse> orderResponses = new ArrayList<>();
        List<Order> orders;
        orders = orderDAO.findByUserId(userId);
        for (Order order : orders) {
            Long orderId = order.getId();
            List<BookItem> bookItems = getOrderItems(orderId);
            OrderResponse orderResponse = new OrderResponse(order, bookItems);
            orderResponses.add(orderResponse);
        }
        Comparator<OrderResponse> createTimeComparator = Comparator.comparing(OrderResponse::getCreateTime);
        orderResponses.sort(createTimeComparator.reversed());
        return orderResponses;
    }

    public List<BookItem> getOrderItems(Long orderId) {
        List<OrderItem> orderItems;
        List<BookItem> bookItems = new ArrayList<>();
        orderItems = orderItemDAO.findByOrderId(orderId);
        for (OrderItem orderItem : orderItems) {
            Book book = bookDAO.findById(orderItem.getBookId()).orElse(null);
            BookItem bookItem = new BookItem(orderItem.getBookId(), orderItem.getNumber(), book);
            bookItems.add(bookItem);
        }
        return bookItems;
    }

    public Msg addOrder(Long userId, OrderRequest orderRequest) {
        LocalDateTime createTime = LocalDateTime.now();
        Order order = new Order(userId, orderRequest, createTime);
        Long orderId = orderDAO.insertOrder(order);
        List<BookItem> bookItems = orderRequest.getItems();
        for (BookItem bookItem : bookItems) {
            addOrderItems(userId, orderId, bookItem);
        }
        userDAO.updateBalanceById(userId, orderRequest.getPrice());
        return new Msg(true, "下单成功", null);
    }

    public void addOrderItems(Long userId, Long orderId, BookItem bookItem) {
        OrderItem orderItem = new OrderItem(userId, orderId, bookItem);
        cartItemDAO.deleteByBookIdAndUserId(bookItem.getId(), userId);
        orderItemDAO.insertOrderItem(orderItem);
        bookDAO.updateSalesById(bookItem.getId(), bookItem.getNumber());
    }
}

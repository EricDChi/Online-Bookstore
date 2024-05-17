package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.OrderDao;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> findByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public void insertOrder(Order order) {
        orderRepository.save(order);
    }
}

package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.OrderItemDao;
import com.bookstore.backendbookstore.entity.OrderItem;
import com.bookstore.backendbookstore.repository.OrderItemRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderItemDaoImpl implements OrderItemDao {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public List<OrderItem> findByTitle(String keyword) {
        return orderItemRepository.findByTitle(keyword);
    }

    @Override
    @Transactional
    public void save(OrderItem orderItem) {
        System.out.println(orderItem.getTitle());
        orderItemRepository.save(orderItem);
    }

}

package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.OrderDao;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.repository.OrderRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EntityManager entityManager;

    @Override
    public Order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public List<Order> findByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> getPagedOrders(Integer pageIndex, Integer pageSize) {
        List<Order> items;
        items = entityManager.createQuery("SELECT e FROM Order e ORDER BY e.createTime DESC", Order.class)
                .setFirstResult(pageSize * pageIndex)
                .setMaxResults(pageSize)
                .getResultList();
        return items;
    }

    @Override
    public List<Order> getPagedOrdersByUserId(Long userId, Integer pageIndex, Integer pageSize) {
        List<Order> items;
        items = entityManager.createQuery("SELECT e FROM Order e WHERE e.userId = :userId ORDER BY e.createTime DESC", Order.class)
                .setParameter("userId", userId)
                .setFirstResult(pageSize * pageIndex)
                .setMaxResults(pageSize)
                .getResultList();
        return items;
    }

    @Override
    public void save(Order order) {
        orderRepository.save(order);
    }

    @Override
    public int count() {
        return (int) orderRepository.count();
    }

    @Override
    public int countByUserId(Long userId) {
        return orderRepository.countByUserId(userId);
    }
}

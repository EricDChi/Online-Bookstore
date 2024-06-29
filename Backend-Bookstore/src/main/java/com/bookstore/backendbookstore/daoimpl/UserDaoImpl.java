package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.UserDao;
import com.bookstore.backendbookstore.entity.User;
import com.bookstore.backendbookstore.repository.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private EntityManager entityManager;

    private final UserRepository userRepository;

    public UserDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void updateBalanceById(Long id, Integer price) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setBalance(user.getBalance() - price);
            userRepository.save(user);
        }
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getPagedUsers(Integer pageIndex, Integer pageSize) {
        List<User> items;
        items = entityManager.createQuery("SELECT e FROM User e ORDER BY e.id ASC", User.class)
                .setFirstResult(pageSize * pageIndex)
                .setMaxResults(pageSize)
                .getResultList();
        return items;
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public int count() {
        return (int) userRepository.count();
    }
}

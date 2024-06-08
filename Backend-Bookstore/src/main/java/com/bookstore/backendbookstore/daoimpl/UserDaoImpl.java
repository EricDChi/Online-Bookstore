package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.UserDao;
import com.bookstore.backendbookstore.entity.User;
import com.bookstore.backendbookstore.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

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
    public void save(User user) {
        userRepository.save(user);
    }
}

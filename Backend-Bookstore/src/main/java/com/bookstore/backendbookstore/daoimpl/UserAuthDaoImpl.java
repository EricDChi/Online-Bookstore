package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.UserAuthDao;
import com.bookstore.backendbookstore.entity.UserAuth;
import com.bookstore.backendbookstore.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserAuthDaoImpl implements UserAuthDao {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Override
    public boolean existsByUsername(String username) {
        return userAuthRepository.existsByUsername(username);
    }

    @Override
    public void save(UserAuth userAuth) {
        userAuthRepository.save(userAuth);
    }

    @Override
    public Long GetUserIdByUsernameAndPassword(String username, String password) {
        return userAuthRepository.getUserIdByUsernameAndPassword(username, password);
    }
}

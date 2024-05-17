package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {

    UserAuth findByUsernameAndPassword(String username, String password);

    boolean existsByUsername(String username);
}

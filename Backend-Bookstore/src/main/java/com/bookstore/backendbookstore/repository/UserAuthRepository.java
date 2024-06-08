package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {

    UserAuth findByUsernameAndPassword(String username, String password);

    UserAuth findByUsername(String username);

    boolean existsByUsername(String username);
}

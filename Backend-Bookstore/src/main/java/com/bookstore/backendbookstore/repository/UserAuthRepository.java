package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {

    boolean existsByUsername(String username);

    @Query("SELECT u.userId FROM UserAuth u WHERE u.username = ?1 AND u.password = ?2")
    Long getUserIdByUsernameAndPassword(String username, String password);
}

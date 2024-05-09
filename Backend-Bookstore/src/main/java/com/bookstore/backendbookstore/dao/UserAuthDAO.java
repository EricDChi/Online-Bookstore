package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserAuthDAO extends JpaRepository<UserAuth, Long>{

    @Query(value = "from UserAuth where username = :username and password = :password")
    UserAuth checkUser(@Param("username") String username, @Param("password") String password);

    boolean existsByUsername(String username);
}
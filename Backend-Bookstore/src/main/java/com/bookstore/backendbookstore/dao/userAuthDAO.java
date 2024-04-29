package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.userAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface userAuthDAO extends JpaRepository<userAuth, Long>{

    @Query(value = "from userAuth where username = :username and password = :password")
    userAuth checkUser(@Param("username") String username, @Param("password") String password);
}
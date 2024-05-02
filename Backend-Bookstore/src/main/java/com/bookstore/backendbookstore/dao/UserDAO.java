package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
@Transactional
public interface UserDAO extends JpaRepository<User, Long>{
    @Modifying
    @Query("UPDATE User c SET c.balance = c.balance - :price WHERE c.id = :id")
    void updateBalanceById(@Param("id") Long id, @Param("price") Long price);

}
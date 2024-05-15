package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface CartItemDAO extends JpaRepository<CartItem, Long>{

    List<CartItem> findByUserId(Long userId);

    CartItem findByBookIdAndUserId(Long bookId, Long userId);

    @Modifying
    void deleteByBookIdAndUserId(Long bookId, Long userId);

    @Modifying
    @Query("UPDATE CartItem c SET c.number = :number WHERE c.bookId = :bookId and c.userId = :userId")
    void updateNumberByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId, @Param("number") Integer number);

    boolean existsByBookIdAndUserId(Long bookId, Long userId);

}
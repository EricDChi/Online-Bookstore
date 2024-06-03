package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserId(Long userId);

    CartItem findByBookIdAndUserId(Long bookId, Long userId);

    @Modifying
    void deleteByBookIdAndUserId(Long bookId, Long userId);

    @Modifying
    void deleteByBookId(Long bookId);

    @Modifying
    @Query("UPDATE CartItem c SET c.number = :number WHERE c.bookId = :bookId and c.userId = :userId")
    void updateNumberByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId, @Param("number") Integer number);

    boolean existsByBookIdAndUserId(Long bookId, Long userId);
}
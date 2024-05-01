package com.bookstore.backendbookstore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "book_id")
    private Long bookId;

    @Column(name = "number")
    private Integer number;

    // 构造函数
    public CartItem(Long id, Long userId) {
        this.id = bookId;
        this.userId = userId;
        this.number = 1;
    }
}

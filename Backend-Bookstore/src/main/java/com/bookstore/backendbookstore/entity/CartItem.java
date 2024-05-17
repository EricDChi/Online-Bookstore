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
    private Long number;

    @OneToOne
    @JoinColumn(name = "book_id", insertable = false, updatable = false)
    private Book book;

    // 构造函数
    public CartItem() {
        
    }

    public CartItem(Long bookId, Long userId) {
        this.bookId = bookId;
        this.userId = userId;
        this.number = 1L;
    }
}

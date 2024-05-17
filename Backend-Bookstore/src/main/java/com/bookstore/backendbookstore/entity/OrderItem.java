package com.bookstore.backendbookstore.entity;

import com.bookstore.backendbookstore.utils.BookItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "book_id")
    private Long bookId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "number")
    private Long number;

    @OneToOne
    @JoinColumn(name = "book_id", insertable = false, updatable = false)
    private Book book;

    // 构造函数
    public OrderItem() {
    }

    public OrderItem(Long userId, Long orderId, Long bookId, Long number) {
        this.userId = userId;
        this.orderId = orderId;
        this.bookId = bookId;
        this.number = number;
    }
}

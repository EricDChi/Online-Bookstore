package com.bookstore.backendbookstore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "number")
    private Long number;

    @Column(name = "title")
    private String title;

    @Column(name = "cover")
    private String cover;

    // 构造函数
    public OrderItem() {
    }

    public OrderItem(Long userId, Long orderId, Long number, String title, String cover) {
        this.userId = userId;
        this.orderId = orderId;
        this.number = number;
        this.title = title;
        this.cover = cover;
    }
}

package com.bookstore.backendbookstore.entity;

import com.bookstore.backendbookstore.service.OrderService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.joda.time.DateTime;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "address")
    private String address;

    @Column(name = "addressee")
    private String addressee;

    @Column(name = "phone")
    private String phone;

    // 构造函数
    public Order(Long userId, OrderService.OrderRequest orderRequest, LocalDateTime createTime) {
        this.userId = userId;
        this.createTime = createTime;
        this.address = orderRequest.getAddress();
        this.addressee = orderRequest.getAddressee();
        this.phone = orderRequest.getPhone();
    }

    public Order() {};
}

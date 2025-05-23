package com.bookstore.backendbookstore.entity;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.serviceimpl.OrderServiceImpl;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    // 构造函数
    public Order(Long userId, JSONObject orderRequest, LocalDateTime createTime) {
        this.userId = userId;
        this.createTime = createTime;
        this.address = orderRequest.getString("address");
        this.addressee = orderRequest.getString("addressee");
        this.phone = orderRequest.getString("phone");
    }

    public Order() {};
}

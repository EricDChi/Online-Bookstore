package com.bookstore.backendbookstore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "user_auth")
public class UserAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "user_id")
    private Long userId;

    public UserAuth() {
    }

    public UserAuth(String username, String password, Long user_id) {
        this.username = username;
        this.password = password;
        this.userId = user_id;
    }
}
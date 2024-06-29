package com.bookstore.backendbookstore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "balance")
    private Long balance;

    @Column(name = "address")
    private String address;

    @Column(name = "addressee")
    private String addressee;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "phone")
    private Long phone;

    @Column(name = "sex")
    private String sex;

    @Column(name = "signature")
    private String signature;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "role")
    private Integer role;

    public User() {
    }

    public User(String uesrname) {
        this.balance = 0L;
        this.address = "";
        this.addressee = "";
        this.avatar = "";
        this.birthday = "";
        this.nickname = uesrname;
        this.phone = 0L;
        this.sex = "secrecy";
        this.signature = "";
        this.status = false;
        this.role = 0;
    }
}

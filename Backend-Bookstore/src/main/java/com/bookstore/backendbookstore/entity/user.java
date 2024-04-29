package com.bookstore.backendbookstore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "balance")
    private Double balance;

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

    // Getter 和 Setter 方法
    public Long getId() {
        return this.id;
    }

    public void setUsername(Long id) {
        this.id = id;
    }

    public Double getBalance() {
        return this.balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressee() {
        return this.addressee;
    }

    public void setAddressee(String addressee) {
        this.addressee = addressee;
    }

    public String getAvatar() {
        return this.avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getBirthday() {
        return this.birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Long getPhone() {
        return this.phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getSex() {
        return this.sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSignature() {
        return this.signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}

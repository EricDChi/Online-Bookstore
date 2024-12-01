package com.bookstore.backendbookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "book")
public class Book implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "price")
    private Integer price;

    private String cover;
    @Transient
    public String getCover() {
        return cover;
    }

    @Column(name = "sales")
    private Integer sales;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "author_description")
    private String authorDescription;

    @Column(name = "book_description")
    private String bookDescription;

    @Column(name = "ISBN")
    private String isbn;

    @Column(name = "stock")
    private Integer stock;

    public Book() {
    }
}

package com.bookstore.microservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "book")
public class Book {
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

    @Column(name = "cover")
    private String cover;

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